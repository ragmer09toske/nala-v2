// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginModal.css';
import cs from '../../components/commonStyle.css';
import { Modal } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
// Components
import LoginForm from '../LoginForm';
// Translation
import { closeLoginModal } from '../../actions/modalActions';
//Image
import bgImage from '/public/siteImages/carLoginBg.png';
class LoginModal extends Component {
  static propTypes = {
    closeLoginModal: PropTypes.func,
    loginModal: PropTypes.bool,
    formatMessage: PropTypes.func,
    siteName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModalStatus: false,
    };
  }

  componentDidMount() {
    const { loginModal } = this.props;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { loginModal } = nextProps;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    } else {
      this.setState({ loginModalStatus: false });
    }
  }

  render() {
    const { closeLoginModal } = this.props;
    const { loginModalStatus } = this.state;

    return (
      <div>
        <Modal show={loginModalStatus} animation={false} onHide={closeLoginModal} className={'loginModal'} >
          <div className={s.carImage} style={{ backgroundImage: `url(${bgImage})` }} />
          <div className={cx(s.sectionBlock, 'loginModelSectionBlock')}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <LoginForm />
            </Modal.Body>
          </div>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen,
});

const mapDispatch = {
  closeLoginModal,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(LoginModal)));