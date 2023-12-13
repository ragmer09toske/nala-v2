import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUserManagement.css';
import cs from '../../../components/commonStyle.css';

// Components
import AdminUserModal from '../AdminUserModal';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';
// Redux Actions
import { openAdminUserModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

import adminUserQuery from './adminUserQuery.graphql';
import adminRolesQuery from './adminRolesQuery.graphql';
import messages from '../../../locale/messages';
import debounce from '../../../helpers/debounce';

class AdminUserManagement extends React.Component {

  static propTypes = {
    adminUsers: PropTypes.array,
    title: PropTypes.string.isRequired,
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
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModalopen = this.handleModalopen.bind(this);
  }

  paginationData(currentPage) {
    const { adminUsers: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleKeywordSearch(e) { // Keyword search
    const { adminUsers: { refetch }, setStateVariable } = this.props;
    let variables = {
      currentPage: 1,
      searchList: e?.target?.value
    };
    setStateVariable(variables);
    refetch(variables);
  }

  async handleDelete(id) {
    const { adminUsers: { refetch }, setStateVariable, deleteAdminUser } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminUser(id);
    await setStateVariable(variables);
    await refetch(variables);
  }

  handleModalopen(value) {
    const { openAdminUserModal } = this.props;
    if (value) openAdminUserModal('edit', value)
    else openAdminUserModal('add')
  }


  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.emailLabel) },
      { data: formatMessage(messages.adminRoleLabel) }
    ]
  };


  tbody = () => {
    const { adminUsers: { getAllAdminUsers }, openAdminUserModal } = this.props;
    return getAllAdminUsers?.results.map((value, key) => {
      return {
        id: key,
        data: [
          { data: key + 1, },
          {
            data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
              {value?.email}
              <TableAction
                onClickDelete={() => this.handleDelete(value.id)}
                showDelete={true}
                showEdit={true}
                editAction={() => this.handleModalopen(value)}
              /> </div>
          },
          { data: value.adminRole.name },
        ]
      }
    })
  }

  render() {
    const { adminUsers: { getAllAdminUsers } } = this.props;
    const { adminRoles: { getAdminRoles }, currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <AdminUserModal paginationData={this.paginationData} roles={getAdminRoles} />
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.manageAdminUsers)}
          isLink
          addAction={this.handleModalopen}
          redirectionLabel={formatMessage(messages.addNewLabel)}
          isSearch
          onSearch={this.handleKeywordSearch}
        />
        {
          getAllAdminUsers?.count > 0
          && <div>
            <CustomPagination
              total={getAllAdminUsers.count}
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

const mapState = (state) => ({});

const mapDispatch = {
  openAdminUserModal,
  deleteAdminUser
};
export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(adminUserQuery, {
    name: 'adminUsers',
    options: (props) => ({
      variables: {
        searchList: props.searchList,
        currentPage: props.currentPage,
      },
      fetchPolicy: 'network-only',
      ssr: true
    })
  }),
  graphql(adminRolesQuery, {
    name: 'adminRoles',
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  })
)(AdminUserManagement);