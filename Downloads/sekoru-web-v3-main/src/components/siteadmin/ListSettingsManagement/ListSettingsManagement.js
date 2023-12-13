import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { openListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { compose } from 'react-apollo';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import cx from 'classnames';
import {
  Button
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettingsManagement.css';
import cp from '../../../components/commonStyle.css';

// Component
import ListSettingsModal from '../ListSettingsModal';
import CommonTable from '../../CommonTable/CommonTable';
import EditListSettingsForm from '../ListSettingsForm/EditListSettingsForm';
import Loader from '../../Loader';
import CustomPagination from '../../CustomPagination';

import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';
import messages from '../../../locale/messages';
class ListSettingsManagement extends React.Component {

  static defaultProps = {
    loading: true
  };

  constructor(props) {
    super(props);
    this.paginationData = this.paginationData.bind(this);
    this.handleModalopen = this.handleModalopen.bind(this);
  }

  async paginationData(currentPage, typeId) {
    const { getAdminListingSettings } = this.props;
    await getAdminListingSettings(typeId, currentPage);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.settingsIDLabel) },
      { data: formatMessage(messages.addNew) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.operationLabel) }
    ]
  };

  tbody = () => {
    const { openListSettingsModal, page } = this.props;
    const { formatMessage } = this.props.intl;
    const { adminListSettings } = this.props;
    let listSettingsData;
    if (adminListSettings) {
      listSettingsData = adminListSettings?.getAllAdminListSettings?.listSettingsData;
    }
    return listSettingsData && listSettingsData.length > 0 && listSettingsData.map((value, key) => {
      let status = value.isEnable == 1 ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel);
      return {
        id: key,
        data: [
          { data: value.id },
          { data: value?.itemName },
          { data: status },
          {
            data: <Button className={cx(cp.btnPrimaryBorder)} onClick={() => openListSettingsModal(value, "EditListSettingsForm")}>
              <FormattedMessage {...messages.manageLabel} />
            </Button>
          },
        ]
      }
    })
  }

  handleModalopen(typeId) {
    const { openListSettingsModal } = this.props;
    openListSettingsModal({ typeId }, "AddListSettingsForm")
  }

  renderTable(listSettingsTypeData, listSettingsData, count) {
    const { page, openListSettingsModal } = this.props;
    const { formatMessage } = this.props.intl;
    let currentTypeId = listSettingsTypeData && listSettingsTypeData.id;

    return (
      <div>
        <ListSettingsModal />

        <Button className={cx(cp.btnPrimary, cp.btnlarge)}
          onClick={() => openListSettingsModal({ typeId: listSettingsTypeData.id }, "AddListSettingsForm")}>
          <FormattedMessage {...messages.addNewLabel} />
        </Button>

        <CommonTable
          thead={this.thead}
          tbody={this.tbody}
          isLink
        />

        {
          listSettingsData?.length > 0 && <div>
            <CustomPagination
              total={count}
              currentPage={page}
              defaultCurrent={1}
              defaultPageSize={10}
              change={(e) => this.paginationData(e, currentTypeId)}
              paginationLabel={formatMessage(messages.listSettings)}
            />
          </div>
        }
      </div>
    );

  }

  renderForm(listSettingsTypeData, listSettingsData) {
    return (
      <div>
        <EditListSettingsForm
          initialValues={listSettingsData && listSettingsData.length > 0 && listSettingsData[0]}
          fieldType={listSettingsTypeData.fieldType}
          title={listSettingsTypeData.typeLabel}
        />
      </div>
    );
  }

  render() {
    const { loading, adminListSettings } = this.props;
    let listSettingsTypeData, listSettingsData, count, errorMessage, status;

    if (!loading && adminListSettings) {
      status = adminListSettings.getAllAdminListSettings && adminListSettings.getAllAdminListSettings.status;
      if (status === 200) {
        listSettingsTypeData = adminListSettings.getAllAdminListSettings.listSettingsTypeData;
        listSettingsData = adminListSettings.getAllAdminListSettings.listSettingsData;
        count = adminListSettings.getAllAdminListSettings.count;
      } else {
        errorMessage = adminListSettings.getAllAdminListSettings.errorMessage;
      }
    }

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      if (listSettingsTypeData.fieldType === "numberType") {
        return (
          <div className={cx(s.pagecontentWrapper)}>
            <div className={s.contentBox}>
              {/* <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1> */}
              {this.renderForm(listSettingsTypeData, listSettingsData)}
            </div>
          </div>
        )
      } else {
        return (
          <div className={cx(s.pagecontentWrapper)}>
            <div className={s.contentBox}>
              <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1>
              {this.renderTable(listSettingsTypeData, listSettingsData, count)}
            </div>
          </div>
        )
      }
    }
  }
}

const mapState = (state) => ({
  loading: state.adminListSettingsData.loading,
  adminListSettings: state.adminListSettingsData.data,
  page: state.adminListSettingsData.currentPage
});

const mapDispatch = {
  openListSettingsModal,
  getAdminListingSettings
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch)
)(ListSettingsManagement);