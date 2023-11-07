import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import {
    Field, reduxForm, formValueSelector, change,
    getFormSyncErrors, submit as submitForm, getFormValues
} from 'redux-form';

import {
    Button,
    FormGroup,
    FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';

// Stripe
import { injectStripe } from 'react-stripe-elements';

import s from '../Payout.css';
import cs from '../../../components/commonStyle.css';

// Helpers
import validateStripe from './validateStripe';
import submit from './submit';
import { isEuropeCountry } from '../../../helpers/europeCountryHelpers';
import generateStripePayoutToken from '../../../helpers/generateStripePayoutToken';

// Redux actions
import { startPayoutLoading, stopPayoutLoading } from '../../../actions/Payout/addPayoutAction';

// Locale
import messages from '../../../locale/messages';

// Components
import Loader from '../../Loader';

class Stripe extends Component {
    static propTypes = {
        handleSubmit: PropTypes.any.isRequired,
        previousPage: PropTypes.any.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.handleSubmitAction = this.handleSubmitAction.bind(this);
    };

    static defaultProps = {
        businessType: 'individual'
    };

    renderField = ({ input, label, type, meta: { touched, error, dirty }, placeHolder, className, maxLength }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(cs.spaceBottom4, className)}>
                <label>{label}</label>
                <FormControl
                    {...input}
                    componentClass="input"
                    className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                    placeholder={placeHolder}
                    maxLength={maxLength}
                />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderSelectField = ({ input, label, type, meta: { touched, error, dirty }, children, placeHolder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom4}>
                <label>{label}</label>
                <FormControl
                    {...input}
                    componentClass="select"
                    className={cs.formControlSelect}
                    placeholder={placeHolder}
                >
                    {children}
                </FormControl>
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    async handleSubmitAction(event) {
        event.preventDefault();
        const { stripe, change, handleSubmit } = this.props;
        const { formValues, errors, startPayoutLoading, stopPayoutLoading } = this.props;
        let accountToken, personToken;

        if (errors && JSON.stringify(errors) !== '{}') { // If any error trigger the submit action to show the error messages
            await handleSubmit();
        }

        if ((!errors || (errors && JSON.stringify(errors) === '{}')) && formValues && stripe) {
            await startPayoutLoading();
            const generateTokens = await generateStripePayoutToken(stripe, formValues);
            if (generateTokens && generateTokens.status === 200) {
                accountToken = generateTokens.result && generateTokens.result.accountToken;
                personToken = generateTokens.result && generateTokens.result.personToken || null;
                await change('isTokenGenerated', true);
                await change('accountToken', accountToken);
                await change('personToken', personToken);
                await handleSubmit();
            } else {
                toastr.error('Error!', generateTokens.errorMessage);
                await stopPayoutLoading();
            }
            return;
        }
    }

    render() {
        const { handleSubmit, pristine, previousPage, submitting, error } = this.props;
        const { base, availableCurrencies, siteName, payoutLoading, businessType, payoutCountry } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor')}>
                <form onSubmit={handleSubmit}>
                    <h3 className={cx(cs.commonTotalText, cs.paddingBottom4)}>{formatMessage(messages.addPayout)}</h3>
                    <Field
                        name="businessType"
                        component={this.renderSelectField}
                        label={formatMessage(messages.payoutType)}
                    >
                        <option value="individual">{formatMessage(messages.payoutIndividual)}</option>
                        <option value="company">{formatMessage(messages.payoutCompany)}</option>
                    </Field>
                    <div className={cx(s.payoutTitleFlex, s.spaceBetWeen, s.flexColumMobile, s.alignItemBaseLine)}>
                        <Field
                            name="firstname"
                            component={this.renderField}
                            className={cx([(businessType === 'individual' ? s.cityWidth : s.fullWidth)])}
                            label={(businessType === 'individual' ? formatMessage(messages.payoutFirstName) : formatMessage(messages.payoutCompanyName))}
                            placeHolder={(businessType === 'individual' ? formatMessage(messages.payoutFirstName) : formatMessage(messages.payoutCompanyName))}
                            maxLength={255}
                        />
                        {
                            businessType && businessType === 'individual' && <Field
                                name="lastname"
                                className={s.cityWidth}
                                component={this.renderField}
                                label={formatMessage(messages.payoutLastName)}
                                placeHolder={formatMessage(messages.payoutLastName)}
                                maxLength={255}
                            />
                        }
                    </div>
                    {
                        payoutCountry && ['US', 'CA', 'GB'].indexOf(payoutCountry) !== -1 &&
                        <Field
                            name="routingNumber"
                            component={this.renderField}
                            label={payoutCountry === 'GB' ? formatMessage(messages.payoutSortNumber) : formatMessage(messages.payoutRouting)}
                            placeHolder={payoutCountry === 'CA' ? "eg: 11000-000" : (payoutCountry === 'GB' ? "eg: 108800" : "eg: 110000000")}
                            maxLength={50}
                        />
                    }
                    <Field
                        name="accountNumber"
                        component={this.renderField}
                        label={isEuropeCountry(payoutCountry) ? formatMessage(messages.ibanNumber) : formatMessage(messages.accountNumber)}
                        placeHolder={isEuropeCountry(payoutCountry) ? `eg: ${payoutCountry}89370400440532013000` : (payoutCountry === 'GB' ? "eg: 00012345" : "eg: 000123456789")}
                        maxLength={50}
                    />
                    <Field
                        name="confirmAccountNumber"
                        component={this.renderField}
                        label={isEuropeCountry(payoutCountry) ? formatMessage(messages.confirmIbanNumber) : formatMessage(messages.confirmAccountNumber)}
                        placeHolder={isEuropeCountry(payoutCountry) ? `eg: ${payoutCountry}89370400440532013000` : (payoutCountry === 'GB' ? "eg: 00012345" : "eg: 000123456789")}
                        maxLength={50}
                    />
                    {
                        payoutCountry && payoutCountry === 'US' && businessType && businessType === 'individual' && <Field
                            name="ssn4Digits"
                            component={this.renderField}
                            label={formatMessage(messages.ssn4Digits)}
                            placeHolder={"1234"}
                            maxLength={4}
                        />
                    }
                    <p className={cx(cs.commonMediumText, cs.paddingBottom2)}>{formatMessage(messages.payoutStripeInfo)}</p>
                    <p className={cs.commonMediumText}>
                        {formatMessage(messages.stripeTokenInfo1)}{' '}
                        <a href={'https://stripe.com/connect-account/legal'} target={'_blank'} className={cs.siteLinkColor}>{formatMessage(messages.stripeTokenInfo2)}</a>.
                    </p>
                    <div className={cx(s.btnFlex, cs.spaceTop4)}>
                        <Button className={cx(cs.btnPrimaryBorder, s.btnRight, 'payoutBackRTL')} onClick={previousPage}>
                            <FormattedMessage {...messages.back} />
                        </Button>
                        <Loader
                            type={'button'}
                            buttonType={'button'}
                            className={cs.btnPrimary}
                            disabled={pristine || submitting || error || payoutLoading}
                            show={payoutLoading}
                            label={formatMessage(messages.finish)}
                            handleClick={this.handleSubmitAction}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

Stripe = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: validateStripe,
    onSubmit: submit
})(Stripe);

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state.currency.availableCurrencies,
    base: state.currency.base,
    payoutLoading: state.reservation.payoutLoading,
    businessType: selector(state, 'businessType'),
    payoutCountry: selector(state, 'country'),
    formValues: getFormValues('PayoutForm')(state),
    errors: getFormSyncErrors('PayoutForm')(state)
});

const mapDispatch = {
    submitForm,
    change,
    startPayoutLoading,
    stopPayoutLoading
};

export default injectStripe(injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(Stripe))));