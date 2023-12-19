import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ForgotPassword.css';
import cs from '../../components/commonStyle.css';
import c from '../../components/LoginModal/LoginModal.css';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeForgotPasswordModal, openLoginModal } from '../../actions/modalActions';

// Components
import ForgotPasswordForm from './ForgotPasswordForm';

// Locale
import messages from '../../locale/messages';
//Image
import bgImage from '/public/siteImages/forgotCarBg.png';

class ForgotPassword extends Component {
  static propTypes = {
    closeForgotPasswordModal: PropTypes.any,
    forgotModal: PropTypes.bool,
    openLoginModal: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { closeForgotPasswordModal, openLoginModal, forgotModal } = this.props;

    return (
      <Modal show={forgotModal} animation={false} onHide={closeForgotPasswordModal} className={'loginModal'}>
        <div className={c.carImage} style={{ backgroundImage: `url(${bgImage})` }} />
        <div className={cx(c.sectionBlock, 'loginModelSectionBlock')}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <h4 className={cx(cs.commonSubTitleText, cs.paddingBottom2, cs.fontWeightBold)}>
              <FormattedMessage {...messages.resetPassword} />
            </h4>
            <ForgotPasswordForm openLoginModal={openLoginModal} />
          </Modal.Body>
        </div>
      </Modal>
    )
  }
}


const mapState = (state) => ({
  forgotModal: state.modalStatus.isForgotPasswordOpen,
});

const mapDispatch = {
  closeForgotPasswordModal,
  openLoginModal
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(ForgotPassword)));