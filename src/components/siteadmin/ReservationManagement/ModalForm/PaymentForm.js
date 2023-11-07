import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Redux
import { connect } from 'react-redux';

import {
	Button,
	Row,
	FormGroup,
	Col,
	FormControl
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ModalForm.css';
import cp from '../../../../components/commonStyle.css';


import validate from './validate';
import submit from './submit';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

// Components
import CurrencyConverter from '../../../CurrencyConverter';

class PaymentForm extends Component {
	static propTypes = {
		availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			symbol: PropTypes.string.isRequired,
			isEnable: PropTypes.bool.isRequired,
			isPayment: PropTypes.bool.isRequired
		})),
		type: PropTypes.string,
		reservationId: PropTypes.number,
		email: PropTypes.string,
		payoutId: PropTypes.number,
		amount: PropTypes.number,
		amountCurrency: PropTypes.string,
		paymentMethodId: PropTypes.number
	};

	renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
		const { formatMessage } = this.props.intl;
		return (
			<div>
				<FormControl {...input} type={type} className={cx(className, cp.formControlInput)} />
				{touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
			</div>
		)
	}

	renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
		const { formatMessage } = this.props.intl;
		return (
			<FormGroup className={s.space3}>
				<Row>
					<Col xs={12} sm={3} md={3} lg={3}>
						<label className={cp.labelTextNew} >{label}</label>
					</Col>
					<Col xs={12} sm={9} md={9} lg={9}>
						<div className={s.select}>
							<FormControl componentClass="select" {...input} className={cx(className, cp.formControlSelect)} >
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
		const { error, handleSubmit, submitting } = this.props;
		const { availableCurrencies } = this.props;
		const { formatMessage } = this.props.intl;
		const { type, reservationId, email, payoutId, amount, amountCurrency, paymentMethodId, last4Digits } = this.props;
		let typeLabel;
		if (type === 'owner') {
			typeLabel = 'Host Payout';
		} else {
			typeLabel = 'Refund to Renter';
		}

		return (
			<form onSubmit={handleSubmit(submit)}>
				{error && <strong>{formatMessage(error)}</strong>}
				<FormGroup className={s.space3}>
					<Row>
						<Col xs={12} sm={3} md={3} lg={3}>
							<label className={cx(cp.labelTextNew, s.labelMargin)}><FormattedMessage {...messages.transferType} /></label>
						</Col>
						<Col xs={12} sm={9} md={9} lg={9}>
							<span>{typeLabel}</span>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup className={s.space3}>
					<Row>
						<Col xs={12} sm={3} md={3} lg={3}>
							<label className={cx(cp.labelTextNew, s.labelMargin)}><FormattedMessage {...messages.transferAmount} /></label>
						</Col>
						<Col xs={12} sm={9} md={9} lg={9}>
							<CurrencyConverter
								amount={amount}
								from={amountCurrency}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup className={s.space3}>
					<Row>
						<Col xs={12} sm={3} md={3} lg={3}>
							<label className={cx(cp.labelTextNew, s.labelMargin)}><FormattedMessage {...messages.receiverLabel} /></label>
						</Col>
						<Col xs={12} sm={9} md={9} lg={9}>
							{
								(type != 'owner' || paymentMethodId == 1) && <span>
									{email}
								</span>
							}
							{
								type == 'owner' && paymentMethodId == 2 && <span>
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
						label={"Currency"}>
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
				<FormGroup className={s.noMargin}>
					<Button className={cx(cp.btnPrimary, cp.btnlarge)} block type="submit" disabled={submitting || error}>
						<FormattedMessage {...messages.confirmLabel} />
					</Button>
				</FormGroup>
			</form>
		);
	}
}

PaymentForm = reduxForm({
	form: 'ReservationPaymentForm', // a unique name for this form
	validate
})(PaymentForm);

const selector = formValueSelector('ReservationPaymentForm');

const mapState = (state) => ({
	availableCurrencies: state.currency.availableCurrencies,
	type: selector(state, 'type'),
	reservationId: selector(state, 'reservationId'),
	email: selector(state, 'receiverEmail'),
	payoutId: selector(state, 'payoutId'),
	amount: selector(state, 'amount'),
	amountCurrency: selector(state, 'currency'),
	paymentMethodId: selector(state, 'paymentMethodId'),
	last4Digits: selector(state, 'last4Digits'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(PaymentForm)));