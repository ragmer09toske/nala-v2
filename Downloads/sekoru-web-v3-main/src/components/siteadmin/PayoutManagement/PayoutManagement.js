import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayoutManagement.css';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

//graphQL
import getAllPayoutsQuery from './getAllPayoutsQuery.graphql';
import { updatePayoutStatus } from '../../../actions/updatePayoutStatus';

// Translation
import messages from '../../../locale/messages';
//Helper
import formatReservationState from '../../../helpers/formatReservationState';

class PayoutManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHoldPayout = this.handleHoldPayout.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getAllPayouts: { completed, loading } } = nextProps;
    const { searchList, currentPage } = this.state;
    const { getAllPayouts: { refetch } } = this.props;
    let variables = { currentPage, searchList };
    if (completed && !loading) {
      refetch(variables);
    }
  }

  paginationData(currentPage) {
    const { getAllPayouts: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { getAllPayouts: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    setStateVariable(variables);
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

  handleHoldPayout(e, id, currentPage) {
    const { updatePayoutStatus, getAllPayouts: { refetch }, setStateVariable } = this.props;
    let isHold = e.target.value;
    isHold = isHold == "true" ? true : false;
    updatePayoutStatus(id, isHold);
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.reservationId) },
      { data: formatMessage(messages.codeLabel) },
      { data: formatMessage(messages.adminListTitle) },
      { data: formatMessage(messages.ownerNameLabel) },
      { data: formatMessage(messages.payoutLabel) },
      { data: formatMessage(messages.claimAmount) },
      { data: formatMessage(messages.reservationStatus) },
      { data: formatMessage(messages.payoutStatus) },
      { data: formatMessage(messages.claimStatus) },
      { data: formatMessage(messages.holdPayout) },
      { data: formatMessage(messages.details) },
    ]
  };

  tbody = () => {
    const { getAllPayouts: { getAllPayoutReservation }, currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return getAllPayoutReservation?.reservationData.map(item => {
      let payoutAmount = 0;
      let status, claimStatus;
      if (item.hostTransaction && item.hostTransaction.id) {
        status = (messages.completedLabel);
      } else if (item.hostFailedTransaction && item.hostFailedTransaction.id) {
        status = (messages.failed);
      } else if (item.hostPayout == null && item.hostTransaction == null && item.hostFailedTransaction == null) {
        status = (messages.noPayoutMethod);
      } else if (item.hostTransaction == null && item.hostFailedTransaction == null && item.reservationState == 'completed') {
        status = (messages.messageStatus5);
      } else if (item.reservationState == 'cancelled' && item.cancellationDetails && (item.cancellationDetails.payoutToHost == 0 || item.cancellationDetails.payoutToHost < 0)) {
        status = (messages.closedLabel)
      } else if (item.reservationState == 'cancelled' && item.cancellationDetails && item.cancellationDetails.payoutToHost > 0 && item.hostTransaction == null && item.hostFailedTransaction == null) {
        status = (messages.messageStatus5);
      } else {
        status = (messages.messageStatus5);
      }
      if (item.reservationState == 'cancelled') {
        payoutAmount = item.cancellationDetails && item.cancellationDetails.payoutToHost;
      } else {
        payoutAmount = item.total - item.hostServiceFee;
      }

      if (item.claimPayout > 0 && item.claimTransaction && item.claimTransaction.id) {
        claimStatus = (messages.completedLabel);
      }
      else if (item.claimPayout > 0 && item.claimFailedTransaction && item.claimFailedTransaction.id) {
        claimStatus = (messages.failed);
      }
      else if (item.claimPayout > 0 && !item.hostPayout && !item.hostTransaction && !item.hostFailedTransaction) {
        claimStatus = (messages.noPayoutMethod);
      }
      else if (item.securityDeposit > 0) {
        claimStatus = (messages.messageStatus5);
      } else if (item.securityDeposit == 0 || item.claimStatus == 'fullyRefunded') {
        claimStatus = (messages.closedLabel)
      }



      return {
        id: item.id,
        data: [
          { data: item.id },
          {
            data: item.confirmationCode
          },
          {
            data: (item.listData || item.listTitle) ? <a href={"/cars/" + item.listId} target='_blank'>
              {item.listTitle ? item.listTitle : item.listData.title}
            </a> : formatMessage(messages.dataMissing)
          },
          {
            data: item?.hostData?.firstName

          },
          {
            data: <CurrencyConverter
              amount={payoutAmount}
              from={item.currency}
            />
          },
          {
            data: <CurrencyConverter
              amount={item.claimPayout}
              from={item.currency}
            />
          },
          {
            data: formatReservationState(item.reservationState)
          },
          {
            data: status && status.defaultMessage === 'Failed' ? <Link to={'/siteadmin/failed-payout/' + item.id}>{formatMessage(status)}</Link> : (status && status.id ? formatMessage(status) : status)
          },
          {
            data: claimStatus && claimStatus.defaultMessage === 'Failed' ? <Link to={'/siteadmin/failed-payout/' + item.id}>{formatMessage(claimStatus)}</Link> : (claimStatus && claimStatus.id ? formatMessage(claimStatus) : claimStatus)
          },
          {
            data:
              ((item && item.hostTransaction) || item.reservationState === 'expired'
                || item.reservationState === 'declined') ? ' - ' : <select value={item.isHold} onChange={(e) => this.handleHoldPayout(e, item.id, currentPage)}>
                <option value={true}>{formatMessage(messages.yesLabel)}</option>
                <option value={false}>{formatMessage(messages.noLabel)}</option>
              </select>
          },
          {
            data: <Link to={"/siteadmin/viewpayout/" + item.id + '/payout'} >
              <FormattedMessage {...messages.viewLabel} />
            </Link>
          }
        ]
      }
    })
  }


  render() {
    const { getAllPayouts: { getAllPayoutReservation } } = this.props;
    const { currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <CommonTable
            thead={this.thead}
            tbody={this.tbody}
            title={formatMessage(messages.payOutManagement)}
            isSearch
            onSearch={this.handleSearchChange}
          />
          {
            getAllPayoutReservation?.reservationData?.length > 0 &&
            <CustomPagination
              total={getAllPayoutReservation.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.payoutsLabel)}
            />
          }
        </div>
      </div >
    )
  }
}

const mapState = (state) => ({
  completed: state.payout.completed,
  loading: state.payout.loading,
});

const mapDispatch = {
  updatePayoutStatus,
};
export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getAllPayoutsQuery, {
    name: 'getAllPayouts',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList
      },
      fetchPolicy: 'network-only',
    })
  })
)(PayoutManagement);