import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
// Redux
import { connect } from 'react-redux';
import {
	Button,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cs from '../../commonStyle.css'
// Redux action
import { sendMessageAction } from '../../../actions/message/sendMessageAction';
// Component
import CountDown from '../../CountDown';
import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';
import { sendEmail } from '../../../core/email/sendEmail';

class HostActions extends Component {
	static propTypes = {
		actionType: PropTypes.string.isRequired,
		sendMessageAction: PropTypes.any.isRequired,
		threadId: PropTypes.number.isRequired,
		reservationId: PropTypes.number,
		threadType: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		guestDisplayName: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		hostDisplayName: PropTypes.string.isRequired,
	};

	async sendMessage(type) {
		const { sendMessageAction, threadId, threadType, startDate, endDate, personCapacity, reservationId } = this.props;
		const { guestEmail, guestDisplayName, hostDisplayName, title, confirmationCode, startTime, endTime } = this.props;

		if (type === 'preApproved') {

			// sendMessageAction(
			// 	threadId,
			// 	threadType,
			// 	null,
			// 	type,
			// 	startDate,
			// 	endDate,
			// 	personCapacity,
			// 	reservationId,
			// 	null,
			// 	null,
			// 	null,
			// 	null
			// );
			sendMessageAction(threadId, threadType, null, type, startDate, endDate, personCapacity, reservationId, null, null, null, null, startTime, endTime);
			let content = {
				guestName: guestDisplayName,
				hostName: hostDisplayName,
				listTitle: title,
				threadId: threadId,
			}
			const { status, response } = await sendEmail(guestEmail, 'bookingPreApproval', content);
		} else {
			// sendMessageAction(
			// 	threadId,
			// 	threadType,
			// 	null,
			// 	type,
			// 	startDate,
			// 	endDate,
			// 	personCapacity,
			// 	reservationId,
			// 	null,
			// 	null,
			// 	null,
			// 	null
			// );
			sendMessageAction(threadId, threadType, null, type, startDate, endDate, personCapacity, reservationId, null, null, null, null, startTime, endTime);
		}
	}

	// Inquiry
	inquiry(guestDisplayName) {
		const { createdAt, loading } = this.props;
		let startDate = moment();
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}>
					<FormattedMessage {...messages.hostAction1} /> {guestDisplayName} <FormattedMessage {...messages.hostAction2} />
				</h4>
				<p className={cx(s.actionPara, s.noMarginTop, cs.spaceBottom3)}><FormattedMessage {...messages.hostAction3} /> {guestDisplayName} <FormattedMessage {...messages.hostAction4} /></p>
				{
					distance > 0 && <p className={cx(s.actionPara, s.noMarginTop, cs.spaceBottom3)}>
						<FontAwesome.FaClockO className={cx(s.timeIconColor, s.timerIcon, s.rsFromMessageMarginRight, 'rsFromMessageMarginRightRLT')} />
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				<div className={cx()}>
					<Button className={s.btnPrimary} disabled={loading} onClick={() => this.sendMessage('preApproved')}>
						<FormattedMessage {...messages.preApprove} />
					</Button>
					{/* <Button className={cx(s.btnPrimaryBorder, s.btnRight)} onClick={() => this.sendMessage('declined')}>
						<FormattedMessage {...messages.decline} />
					</Button> */}
				</div>
			</div>
		);
	}

	// Request to book
	requestToBook(guestDisplayName) {
		const { createdAt, listPublishStatus, loading } = this.props;
		let startDate = moment();
		//let next24Hours = moment(createdAt).add(24, 'hours');
		let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
		let distance = next24Hours - startDate;
		let options = { endDate: next24Hours };

		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}>{guestDisplayName} <FormattedMessage {...messages.guestRequest} /></h4>
				{
					distance > 0 && <p className={cx(s.actionPara, s.noMarginTop, cs.spaceBottom3)}>
						<FormattedMessage {...messages.hostResponseTime1} /> <CountDown options={options} /> <FormattedMessage {...messages.hostResponseTime2} />
					</p>
				}
				{
					listPublishStatus && <div className={cx()}>
						<Button className={s.btnPrimary} disabled={loading} onClick={() => this.sendMessage('approved')}>
							<FormattedMessage {...messages.approve} />
						</Button>
						<Button className={cx(s.btnPrimaryBorder, s.btnRight, 'declineRTL')} disabled={loading} onClick={() => this.sendMessage('declined')}>
							<FormattedMessage {...messages.decline} />
						</Button>
					</div>
				}
			</div>
		);
	}

	// Inquiry pre-approved
	approved() {
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.requestApproved} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, s.marginBottom0)}>
					<FormattedMessage {...messages.timeToExpire} />
				</p>
			</div>
		);
	}

	// Request to book/ Inquiry declined
	declined() {
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.requestDeclined} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, s.marginBottom0)}>
					<FormattedMessage {...messages.declinedInfo} />
				</p>
			</div>
		);
	}

	// Booking confirmed by host/ instant booking
	bookingConfirmed() {
		const { reservationId } = this.props;
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.bookingIsConfirmed} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, cs.spaceBottom3)}>
					<FormattedMessage {...messages.contactGuest} />
				</p>
				<div className={cx()}>
					<Link to={"/cancel/" + reservationId + "/owner"} className={cx(s.linkBtn, s.btnPrimary, s.linkInline)}>
						<FormattedMessage {...messages.cancelReservation} />
					</Link>
				</div>
			</div>
		);
	}

	// Pre-approved or approved by host is expired
	expired(guestDisplayName) {
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.bookingIsExpired} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, s.marginBottom0)}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingIsExpired1} />
				</p>
			</div>
		);
	}

	// Booking is cancelled by host
	cancelled(guestDisplayName) {
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.bookingRequestCancel1} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, s.marginBottom0)}>
					{guestDisplayName}'s <FormattedMessage {...messages.bookingRequestCancel3} />
				</p>
			</div>
		);
	}

	completed() {
		return (
			<div className={cx(s.actionInnerBox, s.actionContainer, cs.spaceBottom6)}>
				<h4 className={cx(s.noMarginTop, cs.spaceBottom2, s.actionHeading)}><FormattedMessage {...messages.reservationCompleted1} /></h4>
				<p className={cx(s.actionPara, s.noMarginTop, s.marginBottom0)}>
					<FormattedMessage {...messages.reservationCompleted2} />
				</p>
			</div>
		);
	}

	render() {
		const { actionType, guestDisplayName } = this.props;
		if (actionType === 'inquiry') {
			return this.inquiry(guestDisplayName);
		} else if (actionType === 'preApproved') {
			return this.approved();
		} else if (actionType === 'declined') {
			return this.declined();
		} else if (actionType === 'intantBooking' || actionType === 'approved') {
			return this.bookingConfirmed();
		} else if (actionType === 'requestToBook') {
			return this.requestToBook(guestDisplayName);
		} else if (actionType === 'expired') {
			return this.expired(guestDisplayName);
		} else if (actionType === 'cancelledByHost' || actionType === 'cancelledByGuest') {
			return this.cancelled(guestDisplayName);
		} else if (actionType === 'completed') {
			return this.completed();
		} else return <div />;
	}
}

const mapState = (state) => ({
	loading: state.loader.hostAction,
});

const mapDispatch = {
	sendMessageAction,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(HostActions)));