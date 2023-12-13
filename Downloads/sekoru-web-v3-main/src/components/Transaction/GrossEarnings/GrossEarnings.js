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
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import CommonTable from '../../CommonTable/CommonTable';

// Locale
import messages from '../../../locale/messages';

class GrossEarnings extends Component {
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

  tbody = () => {
    const { data } = this.props;
    return data.map((item, index) => {
      let date = item?.hostTransaction ? moment(item?.hostTransaction?.createdAt).format('MM-DD-YYYY') : 'Pending';
      let checkInDate = item?.checkIn ? moment(item.checkIn).format('MMM DD, YYYY') : '';
      let checkOutDate = item?.checkOut ? moment(item.checkOut).format('MMM DD, YYYY') : '';
      let totalAmount = Number(item.total);
      let payoutAmount = item?.cancellationDetails;
      if (payoutAmount) {
        totalAmount = item?.cancellationDetails?.payoutToHost ? (item?.cancellationDetails?.payoutToHost + item?.cancellationDetails?.hostServiceFee) : totalAmount;
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
            data: <p className={cx(cs.noMargin)}>
              {checkInDate} - {checkOutDate} &nbsp;
              {item.listData && <Link to={"/users/trips/receipt/" + item.id} className={cx(s.confirmCodeColor)}>{item.confirmationCode}</Link>}
              {!item.listData && <span className={cx(s.confirmCodeColor)}>{item.confirmationCode}</span>}
            </p>
          },
          {
            data: <CurrencyConverter
              amount={totalAmount}
              from={item.currency}
            />
          }
        ]
      }
    })
  }


  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.transferDate) },
      { data: formatMessage(messages.transferType) },
      { data: formatMessage(messages.details) },
      { data: formatMessage(messages.grossEarnings) },
    ]
  };

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

export default injectIntl(withStyles(s)(GrossEarnings));