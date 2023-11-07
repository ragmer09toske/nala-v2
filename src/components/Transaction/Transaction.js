import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transaction.css';
import cs from '../../components/commonStyle.css';
import { FormControl, Button, FormGroup } from 'react-bootstrap';
// Component

import CompletedTransactions from './Completed/CompletedTransactions';
import FutureTransactions from './Future/FutureTransactions';
import GrossEarnings from './GrossEarnings/GrossEarnings';
import TotalAmount from './TotalAmount';
import Loader from '../Loader';
import CustomPagination from '../CustomPagination';
import { onChangeListingFilter } from '../../actions/Listing/onChangeListing';
import { payoutChangeListing } from '../../actions/Payout/payoutChangeListing';

// Locale
import messages from '../../locale/messages';
import ModalFilter from './ModalFilter/ModalFilter';
import { openTransactionModal, closeTransactionModal } from '../../actions/modalActions';
import filterIcon from '/public/siteImages/reservationFilter.svg';
import exportIcon from '/public/SiteIcons/export.svg';
import searchIcon from '/public/SiteIcons/searchIcon.svg';
import debounce from '../../helpers/debounce';
import history from '../../core/history';

class Transaction extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
          hostId: PropTypes.string.isRequired,
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
      }),
    }).isRequired
  };

  static defaultProps = {
    data: {
      loading: true,
      getTransactionHistory: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      payoutId: null,
      listId: null,
      searchKey: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.paginationData = this.paginationData.bind(this);
  }
  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  handleSearchChange = async (searchKey) => {
    const { data: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      searchKey
    }
    this.setState({ searchKey, currentPage: 1 });
    await refetch(variables)
  }

  handleChange({ mode, payoutId, listId }) {
    const { data: { refetch } } = this.props;
    const { searchKey } = this.state;
    let variables = {
      mode,
      currentPage: 1,
      payoutId,
      listId,
      searchKey
    };
    this.setState({ currentPage: 1, payoutId, listId });
    refetch(variables);
  }

  handleChangeFirst(page) {
    const { data: { refetch } } = this.props;
    const { onChangeListingFilter, payoutChangeListing } = this.props;
    let variables = {
      currentPage: 1,
      payoutId: null,
      listId: null
    };
    this.setState({ currentPage: 1, payoutId: null, listId: null });
    history.push('/user/transaction/' + page)
    onChangeListingFilter({ listId: null, payoutId: null });
    payoutChangeListing(null);
    refetch(variables);
  }

  paginationData(currentPage) {
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  componentWillUnmount() {
    const { closeTransactionModal, onChangeListingFilter } = this.props;
    onChangeListingFilter({ listId: null, payoutId: null });
    closeTransactionModal();
  }

  render() {
    const { data: { loading, getTransactionHistory, refetch }, page, openTransactionModal } = this.props;
    const { currentPage, payoutId, listId, searchKey } = this.state;
    const { formatMessage } = this.props.intl;
    const { base, rates, toCurrency } = this.props;
    let page1Active, page2Active, page3Active;
    let showListings, showPayouts, showTotal, userId;
    page1Active = page === 'completed' ? s.active : '';
    page2Active = page === 'future' ? s.active : '';
    page3Active = page === 'grossEarnings' ? s.active : '';
    if (page === 'completed' || page === 'grossEarnings') {
      showPayouts = true;
    }
    if (page === 'completed' || page === 'future') {
      showTotal = true;
    }

    if (!loading && getTransactionHistory && getTransactionHistory.reservationData) {
      if (getTransactionHistory.reservationData.length > 0) {
        userId = getTransactionHistory.reservationData[0].hostId;
      }
    }


    return (
      <div className={cx('youcarsBg', 'whiteBgColor')}>
        <ModalFilter
          handleResults={this.handleChange}
          showPayouts={showPayouts}
          mode={page}
        />
        <ul className={cx(s.listContainer, cs.dFlex)}>
          <li className={cx(page1Active, s.mobileWidth)}>
            <a className={cx(s.tabItem, 'tabLinkRTL')} onClick={() => this.handleChangeFirst('completed')}>
              <FormattedMessage {...messages.completedTransactions} />
            </a>
          </li>
          <li className={cx(page2Active, s.mobileWidth)}>
            <a className={cx(s.tabItem, 'tabLinkRTL')} onClick={() => this.handleChangeFirst('future')}>
              <FormattedMessage {...messages.futureTransactions} />
            </a>
          </li>
          <li className={cx(page3Active, s.mobileWidth)}>
            <a className={cx(s.tabItem, 'tabLinkRTL')} onClick={() => this.handleChangeFirst('grossEarnings')}>
              <FormattedMessage {...messages.grossEarnings} />
            </a>
          </li>
        </ul>
        <div className={cx(cs.spaceTop5, 'transactionSelectRTL')}>
          {
            !loading && showTotal && getTransactionHistory && getTransactionHistory.totalCount > 0 && getTransactionHistory.reservationData !== null
            && <TotalAmount
              mode={page}
              data={getTransactionHistory.reservationData}
              totalData={getTransactionHistory.totalData}
            />
          }

          {getTransactionHistory && getTransactionHistory.totalCount > 0 &&
            <div className={cx(cs.dFlexContainer, s.searchFlexBox)}>
              <div className={cx(s.listFlex, s.searchMarginRight, 'searchContainerRTL')}>
                <div className={s.searchWidth}>
                  <FormGroup className={cx(cs.noMargin, cs.fullWidth, cs.fullHeight, s.searchBox)}>
                    {/* <img src={searchIcon} className={cx(s.searchIcon,'searchIconRTL')} /> */}
                    <FormControl
                      type="text"
                      placeholder={formatMessage(messages.searchTransactions)}
                      className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, s.transactionSearchInput, 'locationBgIconRTL')}
                      onChange={(e) => debounce(this.handleSearchChange(e.target && e.target.value))}
                      value={searchKey}
                      maxLength={255}
                    />
                  </FormGroup>
                </div>
              </div>
              {
                !loading && getTransactionHistory && getTransactionHistory.count > 0 && <div className={cx(s.csvExport, cs.dFlex, 'floatLeftRTL', 'searchExportBtnRTL')}>
                  <a className={cx(s.csvExportLink)} href={`/export-transaction?type=${page}&toCurrency=${toCurrency}&listId=${listId > 0 && listId || ''}&payoutId=${payoutId > 0 && payoutId || ''}`}>
                    <img src={exportIcon} className={cx(s.plusIcon, 'transIconRTL', s.iconTop)} />
                    <FormattedMessage {...messages.exportCSV} />
                  </a>
                </div>
              }
              <Button className={cx({ [s.linkCssActive]: (payoutId > 0 || listId > 0) }, s.linkCss, s.mobileSearchWidth, s.filterBtn, cs.dFlex, 'filterBtnRTL', 'textWhite', 'svgImg')} onClick={() => openTransactionModal()}>
                <img src={filterIcon} className={cx(s.plusIcon, 'addPlusIcon', 'transIconRTL')} />
                <FormattedMessage {...messages.filters} />
              </Button>
            </div>
          }
        </div>
        <div className={cx(cs.spaceTop5)}>
          {
            loading && <Loader type={"text"} />
          }
          {
            !loading && page === 'completed' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <CompletedTransactions data={getTransactionHistory.reservationData} />
          }

          {
            !loading && page === 'future' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <FutureTransactions data={getTransactionHistory.reservationData} />
          }

          {
            !loading && page === 'grossEarnings' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <GrossEarnings data={getTransactionHistory.reservationData} />
          }
          {
            getTransactionHistory && getTransactionHistory.count !== null && getTransactionHistory.count > 0 && <div onClick={this.scrollTop}>
              <CustomPagination
                total={getTransactionHistory.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={5}
                change={this.paginationData}
                componentReference={page}
                paginationLabel={formatMessage(messages.transactions)}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}


const mapState = (state) => ({
  base: state.currency.base,
  rates: state.currency.rates,
  toCurrency: state.currency.to || state.currency.base
});

const mapDispatch = {
  onChangeListingFilter,
  payoutChangeListing,
  openTransactionModal,
  closeTransactionModal
};

export default compose(
  connect(mapState, mapDispatch),
  injectIntl,
  withStyles(s, cs)
)(Transaction);