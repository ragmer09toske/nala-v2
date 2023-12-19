import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
    Button,
    FormGroup,
    FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import cs from '../../../components/commonStyle.css';

//Images
import logourl from '/public/siteImages/paypal.svg';

// Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../../locale/messages';
import Loader from '../../Loader/Loader';

class Paypal extends Component {
    static propTypes = {
        handleSubmit: PropTypes.any.isRequired,
        previousPage: PropTypes.any.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
    };

    renderField = ({ input, label, type, meta: { touched, error, dirty }, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom4}>
                <label>{label}</label>
                <FormControl {...input} componentClass="input" className={cx(cs.formControlInput, 'commonInputPaddingRTL')} placeholder={placeholder} maxLength={255} />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom4}>
                <label>{label}</label>
                <FormControl componentClass="select" {...input} className={cs.formControlSelect} >
                    {children}
                </FormControl>
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        )
    }

    render() {
        const { handleSubmit, pristine, previousPage, submitting, payoutLoading } = this.props;
        const { base, availableCurrencies, siteName } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor')}>
                <form onSubmit={handleSubmit(submit)}>
                    <h2 className={cx(cs.commonTotalText, cs.paddingBottom4)}>{formatMessage(messages.addPayout)}</h2>
                    <img src={logourl} className={cs.spaceBottom2} />
                    <p className={cx(cs.commonMediumText, cs.paddingBottom3)}>
                        <FormattedMessage {...messages.paypalIntro1} /> {siteName}.
                        <FormattedMessage {...messages.paypalIntro2} /> {siteName}, <FormattedMessage {...messages.paypalIntro3} />
                        {' '}<a href={"https://www.paypal.com/"} target="_blank" ><FormattedMessage {...messages.paypalIntro4} /></a>
                    </p>
                    <Field name="payEmail" component={this.renderField} label={formatMessage(messages.paypalEmail)} placeholder={formatMessage(messages.yourPaypalEmail)} />
                    <Field name="currency" component={this.renderFormControlSelect} label={formatMessage(messages.paypalCurrency)} >
                        <option value="">{formatMessage(messages.chooseCurrency)}</option>
                        {
                            availableCurrencies.map((currency, key) => {
                                if (currency.isEnable === true) {
                                    return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                                }
                            })
                        }
                    </Field>
                    <div className={cx(s.btnFlex, cs.spaceTop4)}>
                        <Button className={cx(cs.btnPrimaryBorder, s.btnRight, 'payoutBackRTL')} onClick={previousPage}>
                            <FormattedMessage {...messages.back} />
                        </Button>
                        <span className={'arButtonLoader'}><Loader type={"button"} buttonType={"submit"} label={formatMessage(messages.finish)} className={cs.btnPrimary} show={pristine || submitting || payoutLoading} disabled={pristine || submitting || payoutLoading}/></span>
                    </div>
                </form>
            </div>
        );
    }
}

Paypal = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(Paypal);

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state.currency.availableCurrencies,
    payoutLoading: state.reservation.payoutLoading,
    base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(Paypal)));