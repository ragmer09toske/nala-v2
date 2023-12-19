import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Transaction.css';
import cs from '../../commonStyle.css';

// Components
import NoTransaction from '../NoTransaction';
import CommonTable from '../../CommonTable/CommonTable';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';

class CompletedTransactions extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		data: PropTypes.arrayOf(PropTypes.shape({
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}),
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}),
			hostTransaction: PropTypes.shape({
				payoutId: PropTypes.number,
				payEmail: PropTypes.string,
				amount: PropTypes.number,
				currency: PropTypes.string,
				createdAt: PropTypes.string
			})
		}))
	};

	static defaultProps = {
		data: []
	};

	thead = () => {
		const { formatMessage } = this.props.intl;
		return [
			{ data: formatMessage(messages.transferDate) },
			{ data: formatMessage(messages.transferType) },
			{ data: formatMessage(messages.details) },
			{ data: formatMessage(messages.transferAmount) },
			{ data: formatMessage(messages.paidOut) },
		]
	};

	tbody = () => {
		const { data } = this.props;
		let completeData = [];
		if (data.length > 0) {
			data.map((item) => {
				if (item.hostTransaction) {
					completeData.push(item.hostTransaction);
				}
				if (item.claimTransaction) {
					completeData.push(item.claimTransaction);
				}
				completeData.push(item);
			});
		}

		return completeData.map((item, index) => {
			if (item.checkIn != undefined) {
				let date = item.createdAt ? moment(item.createdAt).format('MM-DD-YYYY') : '';
				let checkInDate = item.checkIn ? moment(item.checkIn).format('MMM DD, YYYY') : '';
				let checkOutDate = item.checkOut ? moment(item.checkOut).format('MMM DD, YYYY') : '';
				let totalAmount = Number(item.total) - Number(item.hostServiceFee);
				if (item.cancellationDetails && item.cancellationDetails) {
					totalAmount = item.cancellationDetails && item.cancellationDetails.payoutToHost || 0;
				}
				return {
					id: index,
					data: [
						{
							data: date
						},
						{
							data: <FormattedMessage {...messages.reservation} />
						},
						{
							data: <ul className={cx(s.listLayout, 'listLayoutRTL')}>
								<li>
									<span className={cx(cs.fontWeightBold)}>{item.guestData ? item.guestData.firstName : ''}</span>
								</li>
								<li>
									<a href={'/cars/' + item.listId} target={"_blank"} className={cx(s.confirmCodeColor)}>{item.listTitle ? item.listTitle : (item.listData ? item.listData.title : "")}</a>
								</li>
								<li>{checkInDate} - {checkOutDate}</li>
								<li>
									{item.listData && <Link to={"/users/trips/receipt/" + item.id} className={cx(s.confirmCodeColor)}>{item.confirmationCode}</Link>}
								</li>
								<li>{!item.listData && <span className={cx(s.confirmCodeColor)}>{item.confirmationCode}</span>}</li>
							</ul>
						},
						{
							data: <CurrencyConverter
								amount={totalAmount}
								from={data.currency}
								className={s.currencyColor}
							/>
					},
						{
							data: <div className={cx(cs.textAlignCenter, cs.textLeftTabMb)}>-</div>
						},
					]
				}
			} else {
				let date = item.createdAt ? moment(item.createdAt).format('MM-DD-YYYY') : '';
				return {
					id: index,
					data: [
						{
							data: date
						},
						{
							data: <FormattedMessage {...messages.transactionPayout} />
						},
						{
							data: <div>
								<FormattedMessage {...messages.transferTo} />
								<span className={cx(cs.fontWeightBold)}>
									{" "}{item.payoutEmail}
								</span>
							</div>
						},
						{
							data: <div className={cx(cs.textAlignCenter, cs.textLeftTabMb)}>-</div>
						},
						{
							data: <CurrencyConverter
								amount={item.amount}
								from={item.currency}
							/>
						},
					]
				}
			}
		})
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				{data.length > 0 && <CommonTable
					thead={this.thead}
					tbody={this.tbody}
					className={'payoutListTable'}
				/>
				}
				{
					data.length === 0 && <div className={s.noTransactionSecSpace}>
						<NoTransaction className={s.noDataIconSec} />
					</div>
				}
			</div>
		);
	}
}

export default injectIntl(withStyles(cs, s)(CompletedTransactions));