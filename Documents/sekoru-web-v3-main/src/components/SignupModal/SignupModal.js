// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Modal,
} from 'react-bootstrap';
import { injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import s from './SignupModal.css';
import cs from '../../components/commonStyle.css';
// Components
import RegisterForm from '../RegisterForm';
// Translation
import { closeSignupModal } from '../../actions/modalActions';
class SignupModal extends Component {
  static propTypes = {
    closeSignupModal: PropTypes.func,
    signupModal: PropTypes.bool,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      signupModalStatus: false,
      isFormOpen: false,
    };
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { signupModal } = this.props;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { signupModal } = nextProps;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    } else {
      this.setState({ signupModalStatus: false });
    }
  }

  render() {
    const { closeSignupModal } = this.props;
    const { signupModalStatus } = this.state;

    return (
      <div>
        <Modal show={signupModalStatus} animation={false} onHide={closeSignupModal} className={cx('loginModal', 'signUpModel')} >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  signupModal: state.modalStatus.isSignupModalOpen,
});

const mapDispatch = {
  closeSignupModal,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SignupModal)));