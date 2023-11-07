// General
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal
} from 'react-bootstrap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminUserModal.css';

// Redux
import { closeAdminUserModal } from '../../../actions/siteadmin/modalActions';

// Component
import AdminUserForm from '../AdminUserForm';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';


class AdminUserModal extends Component {
  static defaultProps = {
    adminUserModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminUserModal, adminUserModal, adminUserModalType, roles, paginationData } = this.props;

    return (
      <div>
        <Modal show={adminUserModal} onHide={closeAdminUserModal} className={'adminModal'}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.adminUserLabel} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <AdminUserForm roles={roles} paginationData={paginationData} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  adminUserModal: state.adminModalStatus.adminUserModal,
  adminUserModalType: state.adminModalStatus.adminUserModalType
});

const mapDispatch = {
  closeAdminUserModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminUserModal)));