import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../commonStyle.css';
import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

import Faq from '../Receipt/question.svg';

class PaymentDetails extends Component {
	static propTypes = {
		checkIn: PropTypes.string.isRequired,
		checkOut: PropTypes.string.isRequired,
		total: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		delivery: PropTypes.number.isRequired,
		discount: PropTypes.number,
		discountType: PropTypes.string,
		serviceFee: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
	};

	render() {
		const { formatMessage } = this.props.intl;
		const { checkIn, checkOut, basePrice, delivery, total, securityDeposit, bookingSpecialPricing } = this.props;
		const { discount, discountType, serviceFee, currency } = this.props;
		let momentStartDate, momentEndDate, dayDifference, priceForDays = 0, isAverage = 0, isDayTotal, isSpecialPricingAssinged;

		isSpecialPricingAssinged = (bookingSpecialPricing && bookingSpecialPricing.length > 0) ? true : false;

		if (checkIn != null && checkOut != null) {
			momentStartDate = moment(checkIn);
			momentEndDate = moment(checkOut);
			dayDifference = momentEndDate.diff(momentStartDate, 'days');
			dayDifference = dayDifference + 1

			if (isSpecialPricingAssinged) {
				bookingSpecialPricing && bookingSpecialPricing.map((item, index) => {
					priceForDays = priceForDays + Number(item.isSpecialPrice);
				});
			} else {
				priceForDays = Number(basePrice) * Number(dayDifference);
			}
		}
		let subTotal = total + serviceFee + securityDeposit;

		isAverage = Number(priceForDays) / Number(dayDifference);
		isDayTotal = isAverage.toFixed(2) * Number(dayDifference);
		priceForDays = isDayTotal;

		return (
			<div>
				<div>
					<div className={cx(s.tableFlex, cs.commonMediumText)}>
						<div className={cx(s.specialPriceText, 'directionLtr')}>
							{
								isSpecialPricingAssinged &&
								<span className={cx(s.paymentToolTipContainer)}>
									<img src={Faq} className={cx(s.paymentToolIcon)} />
									<span className={cx(s.specialPriceIcon, "hidden-print")}>
										<FormattedMessage {...messages.averageRate} />
									</span>
								</span>
							}<CurrencyConverter
								amount={isAverage}
								from={currency}
							/>
							{' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
						</div>
						<div>
							<CurrencyConverter
								amount={priceForDays}
								from={currency}
							/>
						</div>
					</div>
					<hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
					{
						delivery > 0 && <><div className={cx(s.tableFlex, cs.commonMediumText)}>
							<div><FormattedMessage {...messages.cleaningFee} /></div>
							<div>
								<CurrencyConverter
									amount={delivery}
									from={currency}
								/>
							</div>
						</div>
							<hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
						</>
					}
					<div className={cx(s.tableFlex, cs.commonMediumText)}>
						<div><FormattedMessage {...messages.serviceFee} /></div>
						<div>
							<CurrencyConverter
								amount={serviceFee}
								from={currency}
							/>
						</div>
					</div>

					{
						securityDeposit > 0 && <><hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
							<div className={cx(s.tableFlex, cs.commonMediumText)}>
								<div><FormattedMessage {...messages.securityDeposit} /></div>
								<div>
									<CurrencyConverter
										amount={securityDeposit}
										from={currency}
									/>
								</div>
							</div>
						</>
					}
					<hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
					{
						discount > 0 && <><div className={cx(s.tableFlex, cs.commonMediumText)}>
							<span>{discountType}</span>

							<span className={s.discountText}> -
								<CurrencyConverter
									amount={discount}
									from={currency}
								/>
							</span>

						</div>
							<hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
						</>
					}
					<h4 className={cx(s.tableFlex, cs.commonContentText, cs.fontWeightMedium)}>
						<FormattedMessage {...messages.total} />
						<CurrencyConverter
							amount={subTotal}
							from={currency}
						// superSymbol
						/>
					</h4>
				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s, cs)(PaymentDetails));
