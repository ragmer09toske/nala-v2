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
import Payouts from '../Payouts';
import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';

class FutureTransactions extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      payoutId: PropTypes.number,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      guestData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
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
      { data: formatMessage(messages.payTo) },
      { data: formatMessage(messages.transferAmount) },
    ]
  };

  tbody = () => {
    const { data } = this.props;
    return data.map((item, index) => {
      let date = item.checkIn ? moment(item.createdAt).format('MM-DD-YYYY') : 'Pending';
      let checkInDate = item.checkIn ? moment(item.checkIn).format('MMM DD, YYYY') : '';
      let checkOutDate = item.checkOut ? moment(item.checkOut).format('MMM DD, YYYY') : '';
      let totalAmount = Number(item.total) - Number(item.hostServiceFee);
      let payoutAmount = item?.cancellationDetails;
      if (payoutAmount) {
        totalAmount = item?.cancellationDetails?.payoutToHost ? item?.cancellationDetails?.payoutToHost : totalAmount;
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
            data: <Payouts
              reservationId={item.id}
              type={"change"}
              enableAddPayout
              defaultValue={item.payoutId}
            />
          },
          {
            data: <CurrencyConverter
              amount={totalAmount}
              from={item.currency}
              className={s.currencyColor}
            />
          },
        ]
      }
    })
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.length > 0 &&
          <CommonTable
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

export default injectIntl(withStyles(s)(FutureTransactions));