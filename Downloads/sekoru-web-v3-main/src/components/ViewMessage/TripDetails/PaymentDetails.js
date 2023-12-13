import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
// Redux
import { connect } from 'react-redux';
import {
	Tooltip,
	OverlayTrigger
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import cs from '../../commonStyle.css'


// Component
import CurrencyConverter from '../../CurrencyConverter';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';

//Image
import Faq from '../../../../public/SiteIcons/question.svg'

class PaymentDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		userType: PropTypes.string.isRequired,
		basePrice: PropTypes.number.isRequired,
		delivery: PropTypes.number.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		currency: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		serviceFees: PropTypes.shape({
			guest: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired,
			host: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		base: PropTypes.string.isRequired,
		rates: PropTypes.object.isRequired
	};

	static defaultProps = {
		startDate: null,
		endDate: null,
		basePrice: 0,
		delivery: 0,
		monthlyDiscount: 0,
		weeklyDiscount: 0
	};

	render() {
		const { startDate, endDate, basePrice, delivery, currency, monthlyDiscount, weeklyDiscount, userType, endTime, startTime } = this.props;
		const { serviceFees, base, rates, checkOutDifference, openModal } = this.props;
		const { reservationData } = this.props;
		const { formatMessage } = this.props.intl;

		function LinkWithTooltip({ id, children, href, tooltip }) {
			return (
				<OverlayTrigger
					overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
					placement="top"
					delayShow={300}
					delayHide={150}
				>
					{/* <a href={href}>{children}</a> */}
					{children}
				</OverlayTrigger>
			);
		}

		let guestServiceFee = reservationData?.guestServiceFee || 0, hostServiceFee = reservationData?.hostServiceFee || 0,
			currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false,
			isSpecialPricingAssinged = (reservationData && reservationData.bookingSpecialPricing && reservationData.bookingSpecialPricing.length > 0) ? true : false,
			isSpecialPrice, isDayTotal = 0, isDelivery = 0,
			isDiscount, isDiscountType, totalWithoutServiceFee = 0,
			claimAmount = 0, claimStatus = 0, securityDeposit = 0, claimPayout = 0,
			momentStartDate, momentEndDate, dayDifference, priceForDays = 0,
			discount = 0, discountType, total = 0, hostEarnings = 0, isAverage = 0;

		if (reservationData) {
			claimStatus = reservationData.claimStatus;
			securityDeposit = reservationData.securityDeposit
			claimAmount = reservationData.claimAmount;
			claimPayout = reservationData.claimPayout;
		}

		if (startDate && endDate) {
			momentStartDate = moment(startDate).utc().startOf('day');
			momentEndDate = moment(endDate).utc().startOf('day');
			dayDifference = momentEndDate.diff(momentStartDate, 'days');
			dayDifference = dayDifference + 1;

			if (dayDifference > 0) {
				if (isSpecialPricingAssinged) {
					reservationData && reservationData.bookingSpecialPricing && reservationData.bookingSpecialPricing.length > 0 && reservationData.bookingSpecialPricing.map((item, index) => {
						priceForDays = priceForDays + Number(item.isSpecialPrice);
					});
				} else {
					priceForDays = Number(basePrice) * Number(dayDifference);
				}
			}
		}

		isAverage = Number(priceForDays) / Number(dayDifference);
		isDayTotal = isAverage.toFixed(2) * dayDifference;
		priceForDays = isDayTotal;
		isDiscount = reservationData && reservationData.discount;
		isDiscountType = reservationData && reservationData.discountType;
		isDelivery = reservationData && reservationData.delivery;

		if (dayDifference >= 7) {
			if (monthlyDiscount > 0 && dayDifference >= 28) {
				discount = isDiscount;
				discountType = isDiscountType;
			} else {
				if (weeklyDiscount > 0) {
					discount = isDiscount;
					discountType = isDiscountType;
				}
			}
		}
		totalWithoutServiceFee = (priceForDays + isDelivery) - discount;

		if (userType === 'owner') {
			total = (priceForDays + isDelivery) - discount;
		} else {
			total = (priceForDays + guestServiceFee + isDelivery + securityDeposit) - discount;
		}

		hostEarnings = total - hostServiceFee;

		return (
			<div className={cx(s.cancelDetailsContainer)}>
				<div>
					<hr className={s.billingLine} />
					<h4 className={cx(s.space3, s.marginTop0, s.tripDetails)}>
						<span><FormattedMessage {...messages.billing} /></span>
					</h4>
				</div>
				{
					<div className={cx(s.cancelDetailsItems)}>
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL', cs.displayFlex)}>
								{
									isSpecialPricingAssinged && <LinkWithTooltip
										tooltip={formatMessage(messages.averageRate)}
										// href="#"
										id="tooltip-1"
									>
										<span className={s.iconSection}>
											<img src={Faq} className={cx(s.faqImage, 'faqImageRTL')} />
										</span>
									</LinkWithTooltip>
								}
								<div className={cx('directionLtr')}>
									<CurrencyConverter
										//amount={basePrice}
										amount={isAverage}
										from={currency}
									/>
									{' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
								</div>
								{/* {
									isSpecialPricingAssinged && <LinkWithTooltip
										tooltip="Average rate per day for your trip."
										// href="#"
										id="tooltip-1"
									>
										<span className={cx(s.iconSection, s.toolTipColor)}>
											<FontAwesome.FaQuestion className={s.instantIcon} />
										</span>
									</LinkWithTooltip>
								} */}
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<CurrencyConverter
									amount={priceForDays}
									from={currency}
								/>
							</div>
						</div>
					</div>
				}
				{
					delivery > 0 && isDelivery > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.cleaningFee} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={isDelivery}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}

				{
					discount > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span>{discountType}</span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, s.discountText, 'textAlignLeftRTL')}>
								<span>
									{'-'}<CurrencyConverter
										amount={discount}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}

				{
					userType === 'renter' && guestServiceFee > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.serviceFee} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={guestServiceFee}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}

				{
					userType === 'renter' && securityDeposit > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.securityDeposit} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={securityDeposit}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}
				<div className={cx(s.cancelDetailsItems)}>
					<hr className={s.billingLine} />
					<div className={cx(s.checkInText, s.billingTextContainer)}>
						<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
							<span><FormattedMessage {...messages.subTotal} /></span>
						</div>
						<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
							<span>
								<CurrencyConverter
									amount={total}
									from={currency}
								/>
							</span>
						</div>
					</div>
				</div>
				{
					userType === 'owner' && hostServiceFee > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.serviceFee} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									{'-'}<CurrencyConverter
										amount={hostServiceFee}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}
				{
					userType === 'owner' && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInText, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.youEarn} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={hostEarnings}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}
				{
					userType === 'owner' && securityDeposit > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.securityDepositByRenter} /></span>
								{claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 && <a className={cx(s.link, s.linkBgColor)} onClick={openModal}>{' ('}<FormattedMessage {...messages.claimDamage} />{')'}</a>}
								{claimAmount > 0 && <div className={cx()}><a className={cx(s.link, s.linkBgColor)} onClick={openModal}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a></div>}
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={securityDeposit}
										from={currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}
				{
					userType === 'owner' && claimStatus === 'approved' && claimPayout > 0 && <div className={cx(s.cancelDetailsItems)}>
						<hr className={s.billingLine} />
						<div className={cx(s.checkInDt, s.billingTextContainer)}>
							<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
								<span><FormattedMessage {...messages.securityDepositAmountToHost} /></span>
							</div>
							<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
								<span>
									<CurrencyConverter
										amount={claimPayout}
										from={reservationData && reservationData.currency}
									/>
								</span>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapState = (state) => ({
	serviceFees: state.book.serviceFees,
	base: state.currency.base,
	rates: state.currency.rates
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(PaymentDetails)));

