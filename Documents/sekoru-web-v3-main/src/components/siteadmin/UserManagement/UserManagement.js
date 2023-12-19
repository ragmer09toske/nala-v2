import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserManagement.css';
import cs from '../../../components/commonStyle.css';

import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';
import CustomPagination from '../../CustomPagination';
import usersQuery from './usersQuery.graphql';
// Translation
import messages from '../../../locale/messages';
import { updateBanServiceHistoryStatus } from '../../../actions/siteadmin/updateBanServiceHistoryStatus';
import { deleteUser } from '../../../actions/siteadmin/users';

class UserManagement extends React.Component {
  static propTypes = {
    userManagement: PropTypes.array,
    editUser: PropTypes.any,
    deleteUser: PropTypes.any,
    title: PropTypes.string.isRequired,
    updateBanServiceHistoryStatus: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange(e, userId, userMail, userName) {
    const { updateBanServiceHistoryStatus, adminMail } = this.props;
    const { currentPage, searchList } = this.props;
    let id = userId;
    let banStatus = e.target.value;
    await updateBanServiceHistoryStatus(id, banStatus, userMail, userName, currentPage, searchList, adminMail);
  }

  paginationData(currentPage) {
    const { userManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick(searchList) {
    const { userManagement: { refetch }, setStateVariable } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
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

  async deleteChange(id, profileId, userType) {
    const { deleteUser } = this.props;
    const { userManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage: 1 };
    await deleteUser(id, profileId, userType);
    this.setState({ currentPage: 1 });
    await setStateVariable(variables);
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.name) },
      { data: formatMessage(messages.emailLabel) },
      { data: formatMessage(messages.phoneLabel) },
      { data: formatMessage(messages.createdDate) },
      { data: formatMessage(messages.actionLabel) },
    ]
  };

  tbody = () => {
    const { userManagement: { userManagement } } = this.props;
    const { formatMessage } = this.props.intl;

    return userManagement?.usersData.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value?.profile?.profileId },
          {
            data:
              <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
                <a href={"/siteadmin/profileView/" + ((value.profile) ? value.profile.profileId : '')}>
                  {value?.profile?.firstName}
                </a>
                <TableAction
                  onClickDelete={() => this.deleteChange(value.id)}
                  showDelete={true}
                  showView={true}
                  link={"/siteadmin/profileView/" + ((value.profile) ? value.profile.profileId : '')}
                /> </div>
          },
          { data: value?.email },
          { data: value?.profile?.phoneNumber ? value?.profile?.phoneNumber : '-' },
          { data: moment(value?.profile?.createdAt).format('MM/DD/YYYY') },
          {
            data: <select name="userBanStatus" className={cx(s.formControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
              onChange={(e) => this.handleChange(e, value.id, value.email, value?.profile?.firstName)} value={value.userBanStatus ? '1' : '0'}>
              <option value="">{formatMessage(messages.selectLabel)}</option>
              <option value="1">{formatMessage(messages.banLabel)}</option>
              <option value="0">{formatMessage(messages.unBanLabel)}</option>
            </select>
          },
        ]
      }
    })
  }

  render() {
    const { userManagement: { loading, userManagement } } = this.props;
    const { currentPage, searchList } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'nobackground')}>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.manageUser)}
          isExport
          exportLink={`/export-admin-data?type=users&search=${searchList}`}
          isSearch
          onSearch={this.handleSearchChange}
        />
        {
          userManagement?.usersData?.length > 0
          && <div>
            <CustomPagination
              total={userManagement.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.usersLabel)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({
  adminMail: state.siteSettings.data.email
});
const mapDispatch = {
  updateBanServiceHistoryStatus,
  deleteUser
};
export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(usersQuery, {
    name: 'userManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(UserManagement);