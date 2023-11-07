import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Transaction.css';

// Component
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';
class GrossEarningItem extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
			guestServiceFee: PropTypes.number.isRequired,
			hostServiceFee: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}).isRequired,
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}).isRequired,
			hostTransaction: PropTypes.shape({
				createdAt: PropTypes.string.isRequired
			}).isRequired,
		})
	};

	render() {
		const { className, data } = this.props;
		const { formatMessage } = this.props.intl;
		let date = data.hostTransaction != null ? moment(data.hostTransaction.createdAt).format('DD-MM-YYYY') : '-';
		let checkInDate = data.checkIn != null ? moment(data.checkIn).format('MMM DD, YYYY') : '';
		let checkOutDate = data.checkOut != null ? moment(data.checkOut).format('MMM DD, YYYY') : '';
		let totalAmount = Number(data.total);
		let payoutAmount = data && data.cancellationDetails && data.cancellationDetails;
		if (payoutAmount) {
			totalAmount = data && data.cancellationDetails && data.cancellationDetails.payoutToHost ? (data.cancellationDetails.payoutToHost + data.cancellationDetails.hostServiceFee) : totalAmount;
		}


		return (
			<tr>
				<td className={className}>{date}</td>
				<td className={className}><FormattedMessage {...messages.reservation} /></td>
				<td className={className}>
					<p>
						{checkInDate} - {checkOutDate} &nbsp;
						{data.listData && <Link to={"/users/trips/receipt/" + data.id}>{data.confirmationCode}</Link>}
						{!data.listData && <span>{data.confirmationCode}</span>}
					</p>
				</td>
				<td className={className}>
					<CurrencyConverter
						amount={totalAmount}
						from={data.currency}
					/>
				</td>
				<td className={className} />
			</tr>
		);
	}
}

export default injectIntl(withStyles(s)(GrossEarningItem));
