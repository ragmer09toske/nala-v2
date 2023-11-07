import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';
import cs from '../../../components/commonStyle.css';

// Components
import Payout from './Payout';
import Refund from './Refund';
import CurrencyConverter from '../../CurrencyConverter';
import ModalForm from './ModalForm';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';
// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
// Translation
import messages from '../../../locale/messages';
//Helper
import formatReservationState from '../../../helpers/formatReservationState';
class ReservationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          hostId: PropTypes.string.isRequired,
          guestId: PropTypes.string.isRequired,
          checkIn: PropTypes.string.isRequired,
          checkOut: PropTypes.string.isRequired,
          guestServiceFee: PropTypes.number.isRequired,
          hostServiceFee: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
          currency: PropTypes.string.isRequired,
          reservationState: PropTypes.string.isRequired,
          listData: PropTypes.shape({
            title: PropTypes.string.isRequired
          }),
          hostData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          hostPayout: PropTypes.shape({
            id: PropTypes.number.isRequired,
            payEmail: PropTypes.string.isRequired,
            methodId: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            last4Digits: PropTypes.number
          }),
          hostTransaction: PropTypes.shape({
            id: PropTypes.number.isRequired,
          }),
          guestData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          transaction: PropTypes.shape({
            payerEmail: PropTypes.string.isRequired,
            paymentType: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            paymentMethodId: PropTypes.number
          }),
          refundStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
            receiverEmail: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired
          }),
          cancellationDetails: PropTypes.shape({
            refundToGuest: PropTypes.number.isRequired,
            payoutToHost: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
          }),
        })),
      }),
    }).isRequired,
    viewReceiptAdmin: PropTypes.any.isRequired,
  };

  static defaultProps = {
    data: {
      loading: true,
      getAllReservationAdmin: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0,
      selectedRefund: [],
      successRefund: [],
      selectedPayout: [],
      successPayout: [],
    };
    this.paginationData = this.paginationData.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  changeState(type, value) {
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;
    const { searchList, currentPage, getAllReservationAdmin: { refetch } } = this.props;
    let variables = {};

    if (type === 'addRefund') {
      variables = { selectedRefund: [...selectedRefund, value] };
    }
    if (type === 'removeRefund') {
      let index = selectedRefund.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedRefund];
      data.splice(index, 1)
      variables = { selectedRefund: data };
    }
    if (type === 'successRefund') {
      variables = { successRefund: [...successRefund, value] };
    }

    if (type === 'addPayout') {
      variables = { selectedPayout: [...selectedPayout, value] };
    }
    if (type === 'removePayout') {
      let index = selectedPayout.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedPayout];
      data.splice(index, 1)
      variables = { selectedPayout: data };
    }
    if (type === 'successPayout') {
      variables = { successPayout: [...successPayout, value] };
      refetch({ currentPage, searchList });
    }
    this.setState(variables)
  }

  paginationData(currentPage) {
    const { getAllReservationAdmin: { refetch }, changeStateValues, searchList } = this.props;
    let variables = { currentPage, searchList };
    changeStateValues(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { getAllReservationAdmin: { refetch }, changeStateValues } = this.props;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    changeStateValues(variables);
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.reservationId) },
      { data: formatMessage(messages.codeLabel) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.carNameLabel) },
      { data: formatMessage(messages.refundToRenter) },
      { data: formatMessage(messages.subTotalLabel) },
      { data: formatMessage(messages.payoutLabelAdmin) },
    ]
  };

  tbody = () => {
    const { getAllReservationAdmin: { getAllReservationAdmin } } = this.props;
    const { formatMessage } = this.props.intl;
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;

    return getAllReservationAdmin?.reservationData.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value.id },
          {
            data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
              {value?.confirmationCode}
              <TableAction
                showView={true}
                link={`/siteadmin/viewreservation/${value.id}/reservation`}
              />
            </div>
          },
          { data: <span>{formatReservationState(value.reservationState)}</span> },
          {
            data: (value.listTitle || value.listData) ? <a href={"/cars/" + value.listId} target='_blank'>
              {value.listTitle ? value.listTitle : value.listData.title}
            </a> : <>{formatMessage(messages.carNameIsMissing)}</>

          },
          {
            data: <Refund
              id={value.id}
              reservationState={value.reservationState}
              transactionData={value.transaction}
              refundData={value.refundStatus}
              cancelData={value.cancellationDetails}
              selectedRefund={selectedRefund}
              changeState={this.changeState}
              successRefund={successRefund}
            />
          },
          {
            data: <CurrencyConverter
              amount={value.total + value.guestServiceFee}
              from={value.currency}
            />
          },
          {
            data: <Payout
              hostId={value.hostId}
              checkIn={value.checkIn}
              id={value.id}
              hostPayout={value.hostPayout}
              amount={value.total}
              currency={value.currency}
              hostTransaction={value.hostTransaction}
              reservationState={value.reservationState}
              cancelData={value.cancellationDetails}
              hostData={value.hostData}
              hostServiceFee={value.hostServiceFee}
              selectedPayout={selectedPayout}
              successPayout={successPayout}
              changeState={this.changeState}
            />
          },
        ]
      }
    })
  }

  render() {
    const { getAllReservationAdmin: { getAllReservationAdmin }, currentPage, searchList } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <ModalForm />
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.panelReservation)}
          isExport
          exportLink={`/export-admin-data?type=reservations&search=${searchList}`}
          isSearch
          onSearch={this.handleSearchChange}
        />
        {
          getAllReservationAdmin?.reservationData?.length > 0
          && <div>
            <CustomPagination
              total={getAllReservationAdmin.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.panelReservation)}
            />
          </div>
        }
      </div>
    );
  }

}

const mapState = (state) => ({
  completed: state.reservation.completed,
  loading: state.reservation.loading,
});

const mapDispatch = {
  viewReceiptAdmin,
};

export default compose(injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch)
)(ReservationManagement);