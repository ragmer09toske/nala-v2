import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingManagement.css';
import cs from '../../../components/commonStyle.css';

import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';

// Redux Action
import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import { addListToRecommended, removeListFromRecommended } from '../../../actions/siteadmin/ListingManagement/manageRecommend';
import listingsQuery from './listingsQuery.graphql';
import messages from '../../../locale/messages';

class ListingManagement extends React.Component {

  static propTypes = {
    getAllListings: PropTypes.array,
    title: PropTypes.string.isRequired,
    addListToRecommended: PropTypes.func.isRequired,
    removeListFromRecommended: PropTypes.func.isRequired,
  };
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
  }
  paginationData(currentPage) {
    const { getAllListings: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }
  handleClick(searchList) {
    const { getAllListings: { refetch }, setStateVariable } = this.props;
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

  async deleteListing(id, type) {
    const { removeListing } = this.props;
    const { getAllListings: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage: 1 };
    await removeListing(id, type);
    await setStateVariable(variables);
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.adminTitleLabel) },
      { data: formatMessage(messages.carOwnerName) },
      { data: formatMessage(messages.carOwnerEmail) },
      { data: formatMessage(messages.address) },
      { data: formatMessage(messages.city) },
      { data: formatMessage(messages.stateLabel) },
      { data: formatMessage(messages.country) },
      { data: formatMessage(messages.createdDate) },
      { data: formatMessage(messages.recommendLabel) },
      { data: formatMessage(messages.publishedLabel) },
      { data: formatMessage(messages.ready) },
    ]
  };

  tbody = () => {
    const { getAllListings: { getAllListings } } = this.props;
    const { currentPage, searchList, addListToRecommended, removeListFromRecommended } = this.props;
    const { formatMessage } = this.props.intl;

    return getAllListings?.usersData.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value.id },
          {
            data:
              <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
                {value?.title ? value.title : value.settingsData[0]?.listsettings?.itemName + " in " + value?.city}
                <TableAction
                  onClickDelete={() => this.deleteListing(value.id, "admin")}
                  showDelete={true}
                  showView={true}
                  newLink={"/cars/" + value.id}
                  showEdit
                  editNewLink={'/become-a-owner/' + value.id + '/home'}
                />
              </div>
          },
          { data: value?.user?.profile?.firstName },
          { data: value?.user?.email },
          { data: value.street + ', ' + value.city + ', ' + value.state + ', ' + value.country + ', ' + value.zipcode },
          { data: value?.city },
          { data: value?.state },
          { data: value?.country },
          { data: moment(value?.createdAt).format('MM/DD/YYYY') },
          {
            data: <>
              {
                value.recommend != null &&
                <a href="javascript:void(0)" onClick={() => removeListFromRecommended(value.id, currentPage, searchList)} >
                  <FormattedMessage {...messages.remove} />
                </a>
              }
              {
                value.recommend == null &&
                <a href="javascript:void(0)" onClick={() => addListToRecommended(value.id, currentPage, searchList)} >
                  <FormattedMessage {...messages.setLabel} />
                </a>
              }
            </>
          },
          { data: value.isPublished ? formatMessage(messages.yesLabel) : formatMessage(messages.noLabel) },
          { data: value.isReady ? formatMessage(messages.yesLabel) : formatMessage(messages.noLabel) },
        ]
      }
    })
  }

  render() {
    const { getAllListings: { loading, getAllListings } } = this.props;
    const { currentPage, searchList } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.listingsManagement)}
          isExport
          exportLink={`/export-admin-data?type=listings&search=${searchList}`}
          isSearch
          onSearch={this.handleSearchChange}
        />
        {
          getAllListings?.usersData?.length > 0
          && <div>
            <CustomPagination
              total={getAllListings.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.listings)}
            />
          </div>
        }
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  removeListing,
  addListToRecommended,
  removeListFromRecommended
};
export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList
      },
      fetchPolicy: 'network-only',
    })
  })
)(ListingManagement);