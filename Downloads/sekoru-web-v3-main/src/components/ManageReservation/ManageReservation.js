import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import {
  Grid,
  Row,
  Col,
  Tab,
  Tabs,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageReservation.css';
import cs from '../../components/commonStyle.css'

// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';

// Component
import SideMenu from '../ManageListing/SideMenu/SideMenu';
import Reservation from '../Reservation/Reservation';
import NoItem from '../Reservation/NoItem/NoItem';
import Loader from '../Loader/Loader';
import CustomPagination from '../CustomPagination/CustomPagination';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';
import cx from 'classnames';
import addIcon from '/public/siteImages/reservationFilter.svg';
import { openFiletrModal, closeFilterModal } from '../../actions/modalActions';
import { onChangeListingFilter } from '../../actions/Listing/onChangeListing';
import { connect } from 'react-redux';
import FilterModal from './filterModal/FilterModal';
import debounce from '../../helpers/debounce';

class ReservationContainer extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    userType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    searchKey: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    setStateVariable: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getAllReservation: PropTypes.shape({
        count: PropTypes.number,
        reservationData: PropTypes.array
      }),
      refetch: PropTypes.any.isRequired,
    })
  };

  handleSearchChange = (searchKey) => {
    const { data: { refetch }, setStateVariable } = this.props;
    let variables = {
      searchKey,
      currentPage: 1
    };
    setStateVariable(variables)
    refetch(variables);
  }

  paginationData = (currentPage) => {
    const { data: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables)
    refetch(variables);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  refetchData = () => {
    const { data: { refetch }, currentPage } = this.props;
    refetch({ currentPage })
  }

  handleSelect = (key) => {
    const { setStateVariable } = this.props;
    let variable = { dateFilter: key === 1 ? 'current' : 'previous', currentPage: 1 };
    key === 1 ? history.push('/reservation/current') : history.push('/reservation/previous')
    setStateVariable(variable);
  }

  async componentWillUnmount() {
    const { closeFilterModal, onChangeListingFilter, setStateVariable } = this.props;
    let variable = { orderBy: null, startDate: null, endDate: null, listId: null };
    setStateVariable(variable);
    await onChangeListingFilter(variable);
    await closeFilterModal();
  }

  render() {
    const { data: { loading, getAllReservation, refetch }, openFiletrModal, setStateVariable } = this.props;
    const { listId, orderBy, startDate, endDate, userType, type, currentPage, searchKey } = this.props;
    const { formatMessage } = this.props.intl;
    let activeFilter = (listId || orderBy || startDate || endDate) ? true : false;

    return (
      <div fluid className={'listingContainer'}>
        <FilterModal refetch={refetch} type={type} setStateVariable={setStateVariable} />
        <div>
          {/* <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
            <SideMenu yourListingMenu={'listContainer'} />
          </Col> */}
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <div className={cx(cs.tripsReservationPanel, 'youcarsBg', 'bgBlack')}>
              <div className={cx('tabBarView', 'tabBarViewRTL')}>
                <Tabs activeKey={type == 'current' ? 1 : 2} id="uncontrolled-tab-example" onSelect={(e) => this.handleSelect(e)}>
                  <Tab eventKey={1} title={<FormattedMessage {...messages.upcomingTab} />} />
                  <Tab eventKey={2} title={<FormattedMessage {...messages.previousTab} />} />
                </Tabs>
              </div>
              {getAllReservation && getAllReservation.totalCount > 0 &&
                <div className={cx(s.searchFilterGrid, cs.spaceTop5, cs.spaceBottom4)}>
                  <FormGroup className={s.noMargin}>
                    <FormControl
                      type="text"
                      placeholder={formatMessage(messages.searchReservations)}
                      onChange={(e) => debounce(this.handleSearchChange(e.target && e.target.value))}
                      className={cx(s.formControlInput, s.locationBgIcon, 'reservationSearchIconRTL')}
                      maxLength={255}
                    />
                  </FormGroup>
                  <div className={cx(s.filterBtnAlign, 'filterBtnAlignRTL')}>
                    <Button className={cx({ [s.linkCssActive]: activeFilter === true }, cs.commonContentText, cs.fontWeightMedium, s.mobileSearchWidth, s.filterBtn, 'textWhite', 'svgImg')} onClick={() => openFiletrModal()}>
                      <img src={addIcon} className={cx(s.plusIcon, 'plusIconRTL')} />
                      <FormattedMessage {...messages.filters} />
                    </Button>
                  </div>
                </div>
              }
              {
                loading && <Loader type={"text"} />
              }
              {
                !loading && getAllReservation !== undefined && getAllReservation !== null
                && getAllReservation.reservationData.length > 0 && <Reservation
                  data={getAllReservation.reservationData}
                  userType={userType}
                  refetchData={this.refetchData}
                  currentPage={currentPage}
                  searchKey={searchKey}
                  listId={listId}
                  startDate={startDate}
                  endDate={endDate}
                  orderBy={orderBy}
                  dateFilter={type}
                />
              }
              {
                getAllReservation !== undefined && getAllReservation !== null
                && getAllReservation.reservationData.length > 0 &&
                <div>
                  <CustomPagination
                    total={getAllReservation.count}
                    currentPage={getAllReservation.currentPage}
                    defaultCurrent={1}
                    defaultPageSize={5}
                    change={this.paginationData}
                    paginationLabel={formatMessage(messages.panelReservation)}
                  />
                </div>
              }
              {
                !loading && getAllReservation !== undefined && getAllReservation !== null
                && getAllReservation.reservationData.length === 0 && <NoItem
                  resetvationCount = {getAllReservation?.totalCount}
                  userType={userType}
                  type={type}
                />
              }
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  openFiletrModal,
  closeFilterModal,
  onChangeListingFilter
}

export default compose(
  injectIntl,
  withStyles(s, cs),
  (connect(mapState, mapDispatch)),
  graphql(getAllReservationQuery,
    {
      options: (props) => (
        {
          variables: {
            userType: props.userType,
            dateFilter: props.type,
            currentPage: props.currentPage,
            listId: props.listId,
            orderBy: props.orderBy,
            startDate: props.startDate,
            endDate: props.endDate,
            searchKey: props.searchKey,
          },
          fetchPolicy: 'network-only',
        })
    }
  ),
)(ReservationContainer);