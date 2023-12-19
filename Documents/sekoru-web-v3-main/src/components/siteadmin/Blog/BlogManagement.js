import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlogManagement.css';
import cp from '../../../components/commonStyle.css';

import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';

import { deleteBlogDetails, updateBlogStatus } from '../../../actions/siteadmin/deleteBlogDetails';
// Translation
import messages from '../../../locale/messages';

class BlogManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.bool,
      images: PropTypes.string,
    })),
    deleteBlogDetails: PropTypes.any,
    updateBlogStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.metaTitleLabel) },
      { data: formatMessage(messages.metaDescriptionLabel) },
      { data: formatMessage(messages.pageTitleLabel) },
      { data: formatMessage(messages.pageUrl) },
      { data: formatMessage(messages.footerCategoryLabel) },
      { data: formatMessage(messages.status) },
    ]
  };


  tbody = () => {
    const { data, updateBlogStatus, deleteBlogDetails } = this.props;

    return data.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value?.id, },
          {
            data: <div className={cx(cp.displayFlex, cp.alignCenter, cp.spaceBetween)}>
              {value?.metaTitle}
              <TableAction
                onClickDelete={() => deleteBlogDetails(value.id)}
                showDelete={true}
                showView={true}
                newLink={"/page/" + value.pageUrl}
                showEdit={true}
                editLink={"/siteadmin/edit/page/" + value.id}
              />
            </div>
          },
          { data: value?.metaDescription },
          {
            data: value?.pageTitle
          },
          { data: value?.pageUrl },
          { data: value?.footerCategory },
          {
            data: <a href="javascript:void(0)" onClick={() => updateBlogStatus(value?.id, value?.isEnable)} >
              {value?.isEnable == 1 ? <FormattedMessage {...messages.disableLabel} /> : <FormattedMessage {...messages.enableLabel} />}
            </a>
          },
        ]
      }
    })
  }


  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          title={formatMessage(messages.contentManagementSystem)}
          isLink
          href={`/siteadmin/page/add`}
          redirectionLabel={formatMessage(messages.addPageLabel)}
        />
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  deleteBlogDetails,
  updateBlogStatus
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(BlogManagement)));