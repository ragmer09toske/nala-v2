import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Modal, Row, InputGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import messages from '../../locale/messages';
import cx from 'classnames';

import s from './HostClaimModal.css';
import cs from '../commonStyle.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import validate from './validate';
import updateClaimForHostMutation from './updateClaimForHost.graphql';
import Dropzone from './Dropzone';
import { graphql } from 'react-apollo';
import Loader from '../Loader/Loader';
import { convert, showCurrencySymbol } from '../../helpers/currencyConvertion';
import { toastr } from 'react-redux-toastr';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import ClaimImagesSlider from './ClaimImagesSlider';
class HostClaimModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { loading: false, claimImages: [], imageLoader: false, isUploadComplete: false };
        this.removeImage = this.removeImage.bind(this);
    }
    renderFormControl = ({ input, placeholder, type, meta: { touched, error }, className, maxLength, disabled }) => {
        const { formatMessage } = this.props.intl;
        const { claimed, currency, currencyRates, toCurrency, baseCurrency } = this.props;
        let addonCurreny = !toCurrency ? (showCurrencySymbol(baseCurrency) == "" ? baseCurrency : showCurrencySymbol(baseCurrency)) : showCurrencySymbol(toCurrency) == "" ? toCurrency : showCurrencySymbol(toCurrency);
        if (claimed || input.name == 'securityDeposit') {
            return (
                <div className={className}>
                    <CurrencyConverter amount={Number(input.value)} from={currencyRates.to} className={s.currencyConverterInput} />
                </div>
            )
        }
        return (
            <div className={cx('claimAddon', 'claimAddonRTL')}>
                <InputGroup>
                    <InputGroup.Addon className={s.addonStyle}>
                        <span className={cx(s.symbolCss, 'symbolCssRTL')}>{addonCurreny}</span>
                    </InputGroup.Addon>
                    <FormControl
                        {...input}
                        placeholder={placeholder}
                        type={type}
                        className={className}
                        disabled={disabled}
                        maxLength={maxLength}
                    />
                </InputGroup>

                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }
    renderFormControlTextArea = ({ input, placeholder, meta: { touched, error }, disabled, className }) => {
        const { formatMessage } = this.props.intl;
        const { claimed } = this.props;
        if (claimed) {
            return (
                <div>
                    {input.value ? input.value : '-'}
                </div>
            )
        }
        return (
            <div>
                <FormControl
                    {...input}
                    className={className}
                    componentClass="textarea"
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        );
    }
    async handleSubmit(values, dispatch) {
        const { updateClaimForHost, reservationId, refetchData, currencyRates, currency } = this.props;
        let claimAmount = convert(currencyRates.base, currencyRates.rates, values.claimAmount, currencyRates.to || currencyRates.base, currency);

        this.setState({ loading: true });
        const { data } = await updateClaimForHost({ variables: { reservationId, claimAmount, claimImages: values.claimImages, claimReason: values.claimReason } });

        if (data && data.updateClaimForHost && data.updateClaimForHost.status == 200) {
            toastr.success('Success!', 'Claim requested successfully')
            this.closeModal();
        } else {
            toastr.error('Oops!', 'Something went wrong');
            this.setState({ loading: false });
        }

        refetchData && refetchData();
    }

    async removeImage(image) {
        const { change, claimImages } = this.props;
        let updatedClaimImages = [...claimImages];
        const resp = await fetch('/remove/claim/photos', {
            method: "POST", body: JSON.stringify({ filename: image }), credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await resp.json();
        if (data && data.status == 200) {
            this.setImageLoader(true);
            toastr.success('Success!', "Image removed successfully");
            if (Array.isArray(claimImages)) {
                let index = claimImages.findIndex(item => item == image);
                if (index > -1) updatedClaimImages.splice(index, 1);
            }
            change('claimImages', updatedClaimImages);
            this.setImageLoader(false);
        }


    }
    setImageLoader = status => this.setState({ imageLoader: status });
    closeModal = () => {
        const { changeModalState } = this.props;
        changeModalState(false);
    }
    setUploadComplete = status => this.setState({ isUploadComplete: status });
    render() {
        const { show, handleSubmit, claimImages, claimed, isDisableColor } = this.props;
        const { formatMessage } = this.props.intl;
        const { loading, imageLoader, isUploadComplete } = this.state;

        return (
            <Modal show={show} onHide={this.closeModal} dialogClassName={cx(s.logInModalContainer, cs.modalCommonTopSpace, 'newModalHeader')} >
                <Modal.Header closeButton>
                    <Modal.Title><span className={s.title}>{claimed ? formatMessage(messages.claimDetails) : formatMessage(messages.claimDamage)}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body bsClass={s.hostClaimModalBody}>
                    <div className={s.hostClaimModalSection}>
                        <form onSubmit={handleSubmit(this.handleSubmit)}>
                            <FormGroup className={cx(s.formGroup, cs.spaceBottom3, { [s.claimDetailsBorder]: claimed }, { [cs.paddingBottom3]: claimed })}>
                                <ControlLabel className={cx(cs.commonContentText, cs.fontWeightMedium, { [cs.spaceBottom8]: !claimed }, { [cs.spaceBottom2]: claimed })}>
                                    <FormattedMessage {...messages.depositAmount} />
                                </ControlLabel>
                                <Field
                                    name="securityDeposit"
                                    type="text"
                                    component={this.renderFormControl}
                                    placeholder={formatMessage(messages.depositAmount)}
                                    disabled
                                    className={cx({ [s.hostClaimFieldStyle]: !claimed }, { [s.grayColor]: !claimed })}
                                />
                            </FormGroup>
                            <FormGroup className={cx(s.formGroup, cs.spaceBottom3, { [s.claimDetailsBorder]: claimed }, { [cs.paddingBottom3]: claimed })}>
                                <ControlLabel className={cx(cs.commonContentText, cs.fontWeightMedium, { [cs.spaceBottom8]: !claimed }, { [cs.spaceBottom2]: claimed })}>
                                    <FormattedMessage {...(messages[claimed ? "amountClaimedByOwner" : "claimAmount"])} />
                                </ControlLabel>
                                <Field
                                    name="claimAmount"
                                    type="text"
                                    component={this.renderFormControl}
                                    placeholder={formatMessage(messages.enterClaimAmount)}
                                    disabled={claimed}
                                    className={cx({ [s.hostClaimFieldStyle]: !claimed })}
                                    maxLength={30}
                                />
                            </FormGroup>
                            <FormGroup className={cx(s.formGroup, cs.spaceBottom3, { [s.claimDetailsBorder]: claimed }, { [cs.paddingBottom3]: claimed })}>
                                <ControlLabel className={cx(cs.commonContentText, cs.fontWeightMedium, { [cs.spaceBottom8]: !claimed }, { [cs.spaceBottom2]: claimed })}>
                                    <FormattedMessage {...messages.reasonForClaim} />
                                </ControlLabel>
                                <Field
                                    name="claimReason"
                                    type="text"
                                    component={this.renderFormControlTextArea}
                                    placeholder={formatMessage(messages.enterClaimReason)}
                                    disabled={claimed}
                                    className={cx({ [s.textAreaStyle]: !claimed })}
                                />
                            </FormGroup>
                            <div>
                                {!claimed && <FormGroup className={cx(s.formGroup, { [cs.spaceBottom4]: !claimImages }, { [s.marginBottomNone]: (claimImages && claimImages.length > 0) })}>
                                    <ControlLabel className={cx(cs.commonContentText, cs.fontWeightMedium, cs.spaceBottom8)}>
                                        <FormattedMessage {...messages.uploadClaimImage} />
                                    </ControlLabel>
                                    <div className={cx(cs.commonMediumText, s.claimNoteText, cs.spaceBottom3)}>{formatMessage(messages.uploadClaimImageInfo)}</div>
                                    <Field
                                        name="claimImages"
                                        component={Dropzone}
                                        errorMessageClass={s.errorMessage}
                                        setImageLoader={this.setImageLoader}
                                        setUploadComplete={this.setUploadComplete}
                                    />
                                </FormGroup>}
                                {
                                    claimed && claimImages && claimImages.length > 0 &&
                                    <div className={cx(cs.commonContentText, cs.fontWeightMedium, cs.spaceBottom2)}>{formatMessage(messages.uploadedImages)}</div>
                                }

                                <div>
                                    {
                                        imageLoader && <Loader type={"text"} />
                                    }

                                    {
                                        !imageLoader && claimImages && claimImages.length > 0 && <ClaimImagesSlider
                                            data={claimImages}
                                            slidesPerView={4}
                                            arrow
                                            claimed={claimed}
                                            removeImage={this.removeImage}
                                            isUploadComplete={isUploadComplete}
                                        />
                                    }
                                </div>
                            </div>

                            {!claimed && <div className={cx(s.alignRight, 'textAlignLeftRTL')}>
                                <Button onClick={this.closeModal} className={cx(cs.btnPrimaryBorder, cs.commonMediumText, cs.fontWeightMedium, s.buttonStyle, s.clearBtnSpaceRight, 'modalcancelBtnRTL')}>
                                    {formatMessage(messages.cancel)}
                                </Button>
                                <div className={s.disPlayInline}>
                                    <Loader
                                        type={"button"}
                                        buttonType={"submit"}
                                        label={formatMessage(messages.submit)}
                                        show={loading}
                                        disabled={loading}
                                        className={cx(cs.btnPrimary, cs.commonMediumText, cs.fontWeightMedium, s.buttonStyle)}
                                    />
                                </div>
                            </div>}

                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

HostClaimModal = reduxForm({
    form: 'HostClaimModalForm',
    validate
})(HostClaimModal);

const selector = formValueSelector('HostClaimModalForm');

const mapState = state => ({
    claimImages: selector(state, 'claimImages'),
    currencyRates: state.currency,
    toCurrency: state.currency.to,
    baseCurrency: state.currency.base

});

const mapDispatch = {};

export default injectIntl(
    graphql(updateClaimForHostMutation, {
        name: 'updateClaimForHost'
    })(withStyles(s, cs)(connect(mapState, mapDispatch)(HostClaimModal))));