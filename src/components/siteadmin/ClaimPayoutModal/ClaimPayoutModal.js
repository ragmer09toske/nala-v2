import React, { Component } from "react";

import { Modal, Button, FormGroup, Row, Col, FormControl } from "react-bootstrap";

import { reduxForm, formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";

import { FormattedMessage, injectIntl } from "react-intl";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './ClaimPayoutModal.css';
import cx from 'classnames';
import cs from '../../../components/commonStyle.css';

import updateClaimPayoutMutation from './updateClaimMutation.graphql';
import { graphql, compose } from 'react-apollo';
import { toastr } from "react-redux-toastr";

import { convert } from "../../../helpers/currencyConvertion";
import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";

import messages from "../../../locale/messages";
import validate from './validate';
import Loader from "../../Loader/Loader";

class ClaimPayoutModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }

    submitForm = async (values) => {
        this.setState({ loader: true });
        const { closeModal, updateClaimPayout, refetch, base, rates } = this.props;
        let paymentCurrency = values.paymentMethodId == 1 ? values.paymentCurrency : values.payoutCurrency, convertedAmount;
        convertedAmount = convert(base, rates, values.claimPayout, values.currency, paymentCurrency);
        let variables = {
            reservationId: values.reservationId,
            claimPayout: convertedAmount.toFixed(2),
            receiverEmail: values.receiverEmail,
            payoutId: values.payoutId,
            hostId: values.hostId,
            paymentCurrency,
            paymentMethodId: values.paymentMethodId,
            hostEmail: values.hostEmail
        }
        const { data, data: { UpdateClaimPayout } } = await updateClaimPayout({ variables })
        closeModal();
        if (UpdateClaimPayout && UpdateClaimPayout.status == 200) {
            toastr.success("Payment to Host", "Claim amount transferred to host successfully!");
            refetch();
        } else if (UpdateClaimPayout && UpdateClaimPayout.errorMessage) {
            toastr.error("Payment to Host", UpdateClaimPayout.errorMessage)
        } else {
            toastr.error("Payment to Host", "Payment to Host is failed, please try again");
        }
        this.setState({ loader: false });
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup >
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <label >{label}</label>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <div >
                            <FormControl componentClass="select" {...input} className={cx(className)} >
                                {children}
                            </FormControl>
                        </div>
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    </Col>
                </Row>
            </FormGroup>
        )
    }

    render() {
        const { show, closeModal, email, claimPayout, amountCurrency, last4Digits, paymentMethodId, handleSubmit, error, availableCurrencies, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        const { loader } = this.state;

        return (
            <Modal show={show} onHide={closeModal} dialogClassName={s.Button} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage {...messages.claimPayout} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.submitForm)} className={s.widthCss}>
                        {error && <strong>{formatMessage(error)}</strong>}
                        <FormGroup>
                            <Row>
                                <Col xs={12} sm={4} md={4} lg={4}>
                                    <label ><FormattedMessage {...messages.transferType} /></label>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8}>
                                    <FormattedMessage {...messages.claimPayout} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup >
                            <Row>
                                <Col xs={12} sm={4} md={4} lg={4}>
                                    <label ><FormattedMessage {...messages.transferAmount} /></label>
                                </Col>
                                <Col xs={12} sm={4} md={4} lg={4}>
                                    <CurrencyConverter
                                        amount={claimPayout}
                                        from={amountCurrency}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup >
                            <Row>
                                <Col xs={12} sm={4} md={4} lg={4}>
                                    <label ><FormattedMessage {...messages.receiverLabel} /></label>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={8}>
                                    {(paymentMethodId == 1) ? <span>
                                        {email}
                                    </span> : <span>
                                        ****{last4Digits}
                                    </span>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                        {
                            paymentMethodId == 1 && <Field
                                name="paymentCurrency"
                                component={this.renderFormControlSelect}
                                label={formatMessage(messages.currencyText)}
                                className={cx(s.formControlSelect, s.fullWithSelect, cs.formControlSelect)}
                            >
                                <option value="">{formatMessage(messages.chooseCurrency)}</option>
                                {
                                    availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, index) => {
                                        if (currency.isEnable === true && currency.isPayment) {
                                            return <option key={index} value={currency.symbol}>{currency.symbol}</option>
                                        }
                                    })
                                }
                            </Field>
                        }
                        <FormGroup className={cs.noMargin}>
                            <div className={cx(s.disPlayInline, 'arButtonLoader')}> <Loader type={"button"} buttonType={"submit"} label={formatMessage(messages.confirmLabel)} show={loader} disabled={loader} className={cx(cs.btnPrimary, s.fullWidth)} /> </div>
                        </FormGroup>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}



ClaimPayoutModal = reduxForm({
    form: 'ClaimPayoutForm',
    validate
})(ClaimPayoutModal);

const selector = formValueSelector('ClaimPayoutForm')

const mapState = (state) => ({
    availableCurrencies: state.currency.availableCurrencies,
    rates: state.currency.rates,
    base: state.currency.base,
    reservationId: selector(state, 'reservationId'),
    email: selector(state, 'receiverEmail'),
    payoutId: selector(state, 'payoutId'),
    claimPayout: selector(state, 'claimPayout'),
    amountCurrency: selector(state, 'currency'),
    paymentMethodId: selector(state, 'paymentMethodId'),
    last4Digits: selector(state, 'last4Digits'),
});

const mapDispatch = {

}

export default compose(
    injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(updateClaimPayoutMutation, { name: 'updateClaimPayout' }),
)(ClaimPayoutModal);
