import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';

import DocumentManagement from './DocumentManagementQuery.graphql';
import showAllDocumentQuery from './showAllDocumentQueryFile.graphql'
import CommonTable from '../../CommonTable/CommonTable';
import FileList from './FileList';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';
// Translation
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination/CustomPagination';

const query = gql`query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }
    document{      
       fileName
        fileType
        documentStatus
    }
    verification{
      isIdVerification
    }
  }
}
`;
class DocumentVerification extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0,
    }
  }

  async handleUpdate(id, status, item) {
    const { mutate } = this.props;
    const { data } = await mutate({
      variables: {
        userId: id,
        isIdVerification: status
      },
      refetchQueries: [{ query }]
    });

    if (data.DocumentManagement.status === 'success') {
      let msg = 'Documents have been ';
      msg += (status) ? 'Approved!' : 'Rejected!';
      let content = {
        name: item.profile.firstName,
        verificationStatus: (status) ? 'approved' : 'rejected'
      }
      await sendEmail(item.email, 'documentVerification', content);
      toastr.success("Success!", msg);
    } else {
      toastr.error("Error!", "Something went wrong!" + data.DocumentManagement && data.DocumentManagement.errorMessage);
    }
  }

  paginationData = (currentPage) => {
    const { showAllDocument: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleClick = (searchList) => {
    const { showAllDocument: { refetch }, setStateVariable } = this.props;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState(variables);
    setStateVariable(variables)
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
      { data: formatMessage(messages.sNoLabel) },
      { data: formatMessage(messages.userNameLabel) },
      { data: formatMessage(messages.userEmailLabel) },
      { data: formatMessage(messages.requestedFiles) },
      { data: formatMessage(messages.actionLabel) }
    ]
  };

  tbody = () => {
    const { showAllDocument: { showAllDocument }, currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    if (showAllDocument && showAllDocument.results && showAllDocument.results.length > 0) return showAllDocument.results?.map((value, key) => {
      return {
        id: value?.id,
        data: [
          { data: value?.profile?.profileId },
          {
            data: value?.profile?.firstName
          },
          {
            data: value?.email
          },
          { data: <FileList key={'f' + key} data={value.document} /> },
          {
            data: <div>
              <a
                href="javascript:void(0)"
                onClick={() => this.handleUpdate(value.id, !value.verification.isIdVerification, value)}
              >
                <span>{value.verification.isIdVerification ? formatMessage(messages.documentReject) : formatMessage(messages.approve)}</span>
              </a>
            </div>
          }
        ]
      }
    })
  }

  render() {

    const { formatMessage } = this.props.intl;
    const { showAllDocument: { showAllDocument }, searchList, currentPage } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.documentVerificationManagement)}
          isSearch
          onSearch={this.handleSearchChange}
        />
        {
          showAllDocument && showAllDocument.results && showAllDocument.results.length > 0
          && <div>
            <CustomPagination
              total={showAllDocument.count}
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

export default compose(injectIntl, withStyles(s),
  graphql(DocumentManagement,
    { options: { fetchPolicy: 'network-only' } }),
  graphql(showAllDocumentQuery, {
    name: 'showAllDocument',
    options: (props) => ({

      fetchPolicy: 'network-only',
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
    })
  }),)(DocumentVerification);