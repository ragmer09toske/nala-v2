import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import {
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class CancelDetails extends Component {
	static propTypes = {
		userType: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		})
	};

	render() {
		const { userType, reservationData, openModal, checkOutDifference } = this.props;
		const { cancelData: { cancellationPolicy, guestServiceFee, refundToGuest, payoutToHost, currency } } = this.props;
		const { reservationData: { total, hostServiceFee } } = this.props;
		let earnedAmount = 0, missedEarnings = 0, refund = 0, estimatedEarning = 0;
		earnedAmount = payoutToHost;
		refund = refundToGuest;
		missedEarnings = (total - hostServiceFee) - earnedAmount;
		estimatedEarning = total - hostServiceFee;
		let claimAmount = 0, claimStatus = 0, securityDeposit = 0, claimPayout = 0;
		if (reservationData) {
			claimStatus = reservationData.claimStatus;
			securityDeposit = reservationData.securityDeposit
			claimAmount = reservationData.claimAmount;
			claimPayout = reservationData.claimPayout;
		}

		return (
			<div className={cx(s.cancelDetailsContainer)}>
				{((userType === 'owner' && (estimatedEarning > 0 || earnedAmount > 0 || missedEarnings > 0 || securityDeposit > 0 || claimPayout > 0)) || (userType === 'renter' && refund > 0)) && <>
					<div>
						<hr className={s.billingLine} />
						<h4 className={cx(s.space3, s.marginTop0, s.tripDetails)}>
							<span><FormattedMessage {...messages.billing} /></span>
						</h4>
					</div>	

					{
						userType === 'owner' && estimatedEarning > 0 && <div className={cx(s.cancelDetailsItems)}>
							<hr className={s.billingLine} />
							<div className={cx(s.checkInText, s.billingTextContainer)}>
								<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
									<span><FormattedMessage {...messages.estimatedEarnings} /></span>
								</div>
								<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
									<span>
										<CurrencyConverter
											amount={estimatedEarning}
											from={currency}
										/>
									</span>
								</div>
							</div>
						</div>	
					}

					{
						userType === 'owner' && earnedAmount > 0 && <div className={cx(s.cancelDetailsItems)}>
							<hr className={s.billingLine} />
							<div className={cx(s.checkInText, s.billingTextContainer)}>
								<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
									<span><FormattedMessage {...messages.earnedAmount} /></span>
								</div>
								<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
									<span>
										<CurrencyConverter
											amount={earnedAmount}
											from={currency}
										/>
									</span>
								</div>
							</div>
						</div>
					}

					{
						userType === 'owner' && missedEarnings > 0 && <div className={cx(s.cancelDetailsItems)}>
							<hr className={s.billingLine} />
							<div className={cx(s.checkInText, s.billingTextContainer)}>
								<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
									<span><FormattedMessage {...messages.missedEarnings} /></span>
								</div>
								<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
									<span>
										<CurrencyConverter
											amount={missedEarnings}
											from={currency}
										/>
									</span>
								</div>
							</div>
						</div>
					}

					{
						userType === 'renter' && refund > 0 && <div className={cx(s.cancelDetailsItems)}>
							<hr className={s.billingLine} />
							<div className={cx(s.checkInText, s.billingTextContainer)}>
								<div className={cx(s.textLeft, s.lsBillingText, 'textAlignRightRTL')}>
									<span><FormattedMessage {...messages.refundAmount} /></span>
								</div>
								<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
									<span>
										<CurrencyConverter
											amount={refund}
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
									{securityDeposit > 0 && claimStatus == 'pending' && checkOutDifference > 0 && checkOutDifference < 24 && <a className={s.link} onClick={() => openModal()}>{' ('}<FormattedMessage {...messages.claimDamage} />{')'}</a>}
									{securityDeposit > 0 && claimAmount > 0 && <div className={s.spaceTop1}><a className={s.link} onClick={() => openModal()}>{' ('}<FormattedMessage {...messages.claimDetails} />{')'}</a></div>}
								</div>
								<div className={cx(s.textRight, s.rsBillingText, 'textAlignLeftRTL')}>
									<span>
										<CurrencyConverter
											amount={securityDeposit}
											from={reservationData && reservationData.currency}
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
				</>}

			</div>
		);
	}
}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CancelDetails)));

