import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';
// Redux Action
import { openReservationModal } from '../../../actions/Reservation/payoutModal';

// Translation
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import { convert } from '../../../helpers/currencyConvertion';

class Refund extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    reservationId: PropTypes.number,
    reservationState: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    openReservationModal: PropTypes.any.isRequired,
    transactionData: PropTypes.shape({
      payerEmail: PropTypes.string.isRequired,
      paymentType: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      paymentMethodId: PropTypes.number,
      transactionId: PropTypes.string.isRequired
    }),
    refundData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      receiverEmail: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }),
    cancelData: PropTypes.shape({
      refundToGuest: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    transactionData: null,
    refundData: null,
    cancelData: null
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, transactionData, openReservationModal, reservationState, cancelData, base, rates, changeState } = this.props;
    const formName = 'ReservationPaymentForm';
    let amount = transactionData.total;
    let currency = transactionData.currency;
    if (reservationState === 'cancelled' && cancelData) {
      // amount = cancelData.refundToGuest;
      // currency = cancelData.currency;
      amount = convert(base, rates, cancelData.refundToGuest, cancelData.currency, transactionData.currency)
      currency = transactionData.currency;
    }

    const initialData = {
      type: 'renter',
      reservationId: id,
      receiverEmail: transactionData.payerEmail,
      receiverId: transactionData.payerId,
      payerEmail: transactionData.receiverEmail,
      payerId: transactionData.receiverId,
      amount,
      currency,
      paymentMethodId: transactionData.paymentMethodId,
      transactionId: transactionData.transactionId,
      changeState
    };
    openReservationModal(formName, initialData);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { id, transactionData, refundData, reservationState, cancelData } = this.props;
    const { openReservationModal, loading, reservationId, completed, successRefund, selectedRefund } = this.props;
    let amountPaytoGuest = 0;


    if (cancelData) {
      amountPaytoGuest = cancelData.refundToGuest;
    }
    if (transactionData === null || transactionData === undefined) {
      return <span>{formatMessage(messages.transactionNotfound)}</span>;
    }

    if (reservationState === 'expired' || reservationState === 'cancelled' || reservationState === 'declined') {

      if (reservationState === 'cancelled' && amountPaytoGuest === 0) {
        return <span>{formatMessage(messages.notEligible)}</span>;
      }
      if ((refundData != null && refundData.id != undefined) || (successRefund && successRefund.includes(id))) {
        return <span>{formatMessage(messages.completedLabel)}</span>;
      }
      if (selectedRefund && selectedRefund.includes(id)) {
        return <span className={s.processingtext}>{formatMessage(messages.processingLabel)}</span>;
      }

      return (
        <div>
          <a onClick={this.handleClick}> {formatMessage(messages.proceedRefund)} </a>
        </div>
      );
    } else {
      return <span>{formatMessage(messages.notEligible)}</span>
    }

  }
}


const mapState = (state) => ({
  loading: state.reservation.refundLoading,
  reservationId: state.reservation.reservationId,
  completed: state.reservation.refundCompleted,
  base: state.currency.base,
  rates: state.currency.rates
});

const mapDispatch = {
  openReservationModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Refund)));