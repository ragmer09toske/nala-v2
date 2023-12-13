import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationManagement.css';
import cs from '../../../components/commonStyle.css';

import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';

import { deletePopularLocation, updateLocationStatus } from '../../../actions/siteadmin/deletePopularLocation';
// Translation
import messages from '../../../locale/messages';
class PopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.string,
      images: PropTypes.string,
    })),
    deletePopularLocation: PropTypes.any,
    updateLocationStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.location) },
      { data: formatMessage(messages.locationAddress) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.setEnableDisable) },
    ]
  }

  tbody = () => {
    const { data, updateLocationStatus, deletePopularLocation } = this.props;
    const { formatMessage } = this.props.intl;
    return data.map(value => {
      return {
        id: value?.id,
        data: [
          { data: value?.id, },
          {
            data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
              {value?.location}
              <TableAction
                onClickDelete={() => deletePopularLocation(value.id)}
                showDelete={true}
                showEdit={true}
                editLink={"/siteadmin/edit/popularlocation/" + value.id}
              />
            </div>
          },
          { data: value?.locationAddress },
          { data: value.isEnable == 'true' ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel) },
          {
            data: <a href="javascript:void(0)" onClick={() => updateLocationStatus(value.id, value.isEnable)} >
              {value.isEnable == 'true' ? formatMessage(messages.disableLabel) : formatMessage(messages.enableLabel)}
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
          title={formatMessage(messages.popularLocation)}
          isLink
          href={`/siteadmin/popularlocation/add`}
          redirectionLabel={formatMessage(messages.addPopularLocation)}
        />
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  deletePopularLocation,
  updateLocationStatus
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(PopularLocationManagement)));