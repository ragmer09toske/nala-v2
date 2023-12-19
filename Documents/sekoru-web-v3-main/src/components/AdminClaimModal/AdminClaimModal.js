import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { Modal, Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import s from './AdminClaimModal.css';
import cs from '../../components/commonStyle.css';
import validate from './validate';
import updateClaimRefundMutation from './updateClaimRefund.graphql';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { convert, showCurrencySymbol } from '../../helpers/currencyConvertion';
import { toastr } from 'react-redux-toastr';
import messages from '../../locale/messages';
import cx from 'classnames';
import Loader from '../Loader/Loader';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';

class AdminClaimModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = { loader: false };
    async handleSubmit(values) {
        this.setState({ loader: true });
        const { currencyRates, currency, updateClaimRefund, reservationId, closeModal, refetch } = this.props;
        let claimRefund = convert(currencyRates.base, currencyRates.rates, values.claimRefund, currencyRates.to || currencyRates.base, currency);
        const { data } = await updateClaimRefund({ variables: { reservationId, claimRefund: claimRefund.toFixed(2) } });
        if (data && data.updateClaimRefund && data.updateClaimRefund.status == 200) {
            refetch();
            closeModal();
            toastr.success("Success!", "Claim refunded successfully")
        }
        else {
            closeModal();
            toastr.error("Oops!", "Something went wrong")
            this.setState({ loader: false });
        }
    }
    renderFormControl = ({ input, placeholder, type, meta: { touched, error }, className, disabled, isReadOnly }) => {
        const { formatMessage } = this.props.intl;
        const { currencyRates, toCurrency } = this.props;

        if (isReadOnly) {
            return (
                <div className={cx(s.hostClaimFieldStyle)}>

                    <CurrencyConverter amount={Number(input.value)} from={currencyRates.to} />

                </div>
            )
        }
        return (
            <div className={cx('claimAddon')}>
                <InputGroup>
                    <InputGroup.Addon className={s.addonStyle}>
                        <span className={cx(s.symbolCss, 'symbolCssRTL')}>{showCurrencySymbol(toCurrency) == '' ? toCurrency : showCurrencySymbol(toCurrency)}</span>
                    </InputGroup.Addon>
                    <FormControl
                        {...input}
                        placeholder={placeholder}
                        type={type}
                        className={className}
                        disabled={disabled}
                    />
                </InputGroup>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }
    render() {
        const { show, closeModal, claimedByHost, handleSubmit, reservationId, openHostModal } = this.props;
        const { formatMessage } = this.props.intl;
        const { loader } = this.state;
        return (<Modal show={show} onHide={closeModal} className={'claimModalCss'}>
            <Modal.Header closeButton>
                <Modal.Title className={s.headerTitle}>{formatMessage(messages.adminClaimModalHeading)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <FormGroup className={cx(s.formGroup, s.space3, s.paddingLeftRight)}>
                        <ControlLabel className={s.landingStep3}>
                            <FormattedMessage {...messages.depositAmount} />
                        </ControlLabel>
                        <Field
                            name="securityDeposit"
                            type="text"
                            component={this.renderFormControl}
                            placeholder={formatMessage(messages.depositAmount)}
                            isReadOnly
                            disabled
                        />
                    </FormGroup>
                    {claimedByHost && <FormGroup className={cx(s.formGroup, s.space3, s.paddingLeftRight)}>
                        <ControlLabel className={s.landingStep3}>
                            <FormattedMessage {...(messages.claimAmountRequestedFromTheOwner)} />
                        </ControlLabel>
                        <Field
                            name="claimAmount"
                            type="text"
                            component={this.renderFormControl}
                            placeholder={formatMessage(messages.claimAmount)}
                            isReadOnly
                        />
                    </FormGroup>}
                    <div className={s.refundPadding}>
                        <FormGroup className={cs.spaceBottom3}>
                            <ControlLabel className={s.landingStep3}>
                                <FormattedMessage {...(messages.claimRefund)} />
                            </ControlLabel>
                            <Field
                                name="claimRefund"
                                type="text"
                                component={this.renderFormControl}
                                placeholder={formatMessage(messages.enterClaimRefund)}
                                className={s.modalInputCommon}
                            />
                        </FormGroup>
                        {claimedByHost && <div className={s.checkText}>{formatMessage(messages.pleaseCheck)} {' '} <a href={"javascript:void(0)"} onClick={() => { closeModal(); openHostModal(true, reservationId) }}>{formatMessage(messages.claimDetails)}</a></div>}
                        <div className={cx(s.alignRight, 'textAlignLeftRTL')}>
                            <Button onClick={closeModal} className={cs.btnPrimaryBorder}> {formatMessage(messages.cancel)} </Button>
                            <div className={s.disPlayInline}> <Loader type={"button"} buttonType={"submit"} label={formatMessage(messages.submitRefund)} show={loader} disabled={loader} className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL')} /> </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal >)
    }
}
AdminClaimModal = reduxForm({ form: 'AdminClaimModalForm', validate })(AdminClaimModal);
const mapState = state => ({
    currencyRates: state.currency,
    toCurrency: state.currency.to,
});
const mapProps = {};
export default injectIntl(graphql(updateClaimRefundMutation, { name: 'updateClaimRefund' })(withStyles(s, cs)(connect(mapState, mapProps)(AdminClaimModal))));