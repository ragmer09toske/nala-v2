import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import cs from '../../../components/commonStyle.css'
//Component
import PaymentDetails from './PaymentDetails';
import CancelDetails from './CancelDetails';
import UserDetail from '../UserDetail';
import HostClaimModal from '../../HostClaimModal/HostClaimModal';

import { formatTime } from '../../../helpers/formatting';
import arrowIcon from '/public/SiteIcons/paymentArrow.svg';
// Locale
import messages from '../../../locale/messages';
import { convert } from '../../../helpers/currencyConvertion';

class TripDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		listId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		delivery: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		}),
		reservationData: PropTypes.any,
	};

	static defaultProps = {
		title: '',
		startDate: null,
		endDate: null,
		personCapacity: 0,
		reservationData: null
	};

	state = { showModal: false };

	changeModalState = (status = false) => this.setState({ showModal: status });

	openModal = () => this.changeModalState(true);

	render() {
		const { title, startDate, endDate, personCapacity, listId, reservationData, startTime, endTime, refetchData } = this.props;
		const { basePrice, delivery, weeklyDiscount, monthlyDiscount, userType, currency, cancelData, currencyRates } = this.props;
		const { showModal, changeModalState, openModal } = this.props;
		const { profileId, picture, displayName, location, reviewsCount, verifications } = this.props;
		const { formatMessage } = this.props.intl;


		let formattedStartTime, formattedEndTime,
			checkIn = startDate ? moment(startDate).utc().format('ddd, MMM D, YYYY') : '',
			checkOut = endDate ? moment(endDate).utc().format('ddd, MMM D, YYYY') : '',
			isCancelled = false, modalInitialValues = {}, checkOutDifference = 0,
			startTimeValue = (reservationData && reservationData.startTime) ? reservationData.startTime : startTime,
			endTimeValue = (reservationData && reservationData.endTime) ? reservationData.endTime : endTime;
		formattedStartTime = formatTime(startTimeValue);
		formattedEndTime = formatTime(endTimeValue);

		if (cancelData) {
			isCancelled = true;
		}

		if (reservationData) {
			modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to).toFixed(2);
			if (reservationData.claimStatus && reservationData.claimStatus != 'pending') {
				modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to).toFixed(2);
				modalInitialValues.claimReason = reservationData.claimReason;
				modalInitialValues.claimImages = reservationData.claimImages;
			}
			if (reservationData.reservationState == 'completed') checkOutDifference = moment().diff(moment(reservationData.checkOut), 'hour', true);
			if (cancelData && reservationData.reservationState == 'cancelled') {
				let todayDiff = moment().diff(moment(reservationData.checkIn), 'hour', true);
				if (todayDiff > 0) checkOutDifference = moment().diff(moment(cancelData.createdAt), 'hour', true);
			}
		}

		return (
			<div className={cx()}>
				{showModal && reservationData && <HostClaimModal
					refetchData={refetchData}
					claimed={Boolean(reservationData.claimStatus && reservationData.claimStatus != 'pending')}
					reservationId={reservationData.id}
					show={showModal}
					currency={reservationData.currency}
					changeModalState={changeModalState}
					initialValues={modalInitialValues}
				/>}
				<div className={cx()}>
					<div className={cx(s.marginBottom10)}>
						<h4 className={cx(cs.noMargin, s.tripDetails)}><FormattedMessage {...messages.tripDetails} /></h4>
					</div>
					<div className={cx()}>
						<a href={"/cars/" + listId} target="_blank" className={s.linkColor}>
							<h4 className={cx(s.noMargin, s.tripTitle)}>{title}</h4>
						</a>
					</div>
				</div>
				<UserDetail
					profileId={profileId}
					picture={picture}
					displayName={displayName}
					location={location}
					reviewsCount={reviewsCount}
					verifications={verifications}
				/>
				<div className={cx()}>
					<hr className={s.horizondalLine} />
					<div className={s.displayGridDate}>
						<h5 className={cx(s.checkInText, s.marginTop0, s.space2)}>
							<span><FormattedMessage {...messages.checkIn} /></span>
						</h5>
						<span></span>
						<h5 className={cx(s.checkInText, s.marginTop0, s.space2)}>
							<span><FormattedMessage {...messages.checkOut} /></span>
						</h5>
					</div>
					<div className={s.displayGridDate}>
						<div>
							<p className={cx(s.checkInDt, s.space1)}>{checkIn}</p>
							<p className={cx(s.checkInDt, s.marginBottom0)}>{formattedStartTime}</p>
						</div>
						<span className={cx(s.tripArrowIconSec, s.justifySelf)}>
							<img src={arrowIcon} className={cx(s.dateArrowIcon, 'commonDateArrowRTLRotate')} />
						</span>
						<div>
							<p className={cx(s.checkInDt, s.space1)}>{checkOut}</p>
							<p className={cx(s.checkInDt, s.marginBottom0)}>{formattedEndTime}</p>
						</div>
					</div>
				</div>
				<div className={cx()}>
					{
						!isCancelled && reservationData && <PaymentDetails
							userType={userType}
							startDate={startDate}
							endDate={endDate}
							basePrice={basePrice}
							delivery={delivery}
							weeklyDiscount={weeklyDiscount}
							monthlyDiscount={monthlyDiscount}
							currency={currency}
							reservationData={reservationData}
							checkOutDifference={checkOutDifference}
							openModal={openModal}
						/>
					}

					{
						isCancelled && reservationData && <CancelDetails
							userType={userType}
							cancelData={cancelData}
							reservationData={reservationData}
							checkOutDifference={checkOutDifference}
							openModal={openModal}
						/>
					}
				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s, cs)(TripDetails));

