// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux form
import { Field, reduxForm } from 'redux-form';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import s from './Login.css';
import cs from '../../components/commonStyle.css';
import c from '../../components/LoginModal/LoginModal.css'

// Components
import SocialLogin from '../SocialLogin';
import Link from '../../components/Link';

import { openForgotPasswordModal, openSignupModal } from '../../actions/modalActions';

// Internal Helpers
import validate from './validate';
import submit from './submit';
// Locale
import messages from '../../locale/messages';
//Images
import arrow from '/public/siteImages/whiteArrow.svg';
import ShowPassword from '/public/SiteIcons/pswVisible.svg';
import HidePassword from '/public/SiteIcons/pwdHidden.svg';
class LoginForm extends Component {

  static propTypes = {
    openForgotPasswordModal: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: '',
      isDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    this.setState({ showPassword: fieldName === this.state.showPassword ? "" : fieldName });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, showPassword, maxLength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('inputFocusColor', cs.positionRelative)}>
        <label>{label}</label>
        <FormControl {...input} placeholder={label} type={showPassword === input.name ? input : type} className={className} maxLength={maxLength} />
        {type == 'password' && <span onClick={() => this.handleChange(input.name)} className={cx(cs.passwordIcon, 'passwordIconRTL')}>
          {showPassword === input.name ? <img src={ShowPassword} /> : <img src={HidePassword} />}
        </span>}
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    isBrowser && this.setState({
      isDisabled: false
    });
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, siteName, openSignupModal, registerURL } = this.props;
    const { formatMessage } = this.props.intl;
    const { openForgotPasswordModal } = this.props;

    return (
      <>
        <form onSubmit={handleSubmit(submit)}>
          <h3 className={cx(cs.commonTitleText, cs.fontWeightBold, cs.textAlignCenter)}>
            <FormattedMessage {...messages.dashBoardHeader} />
            <span className={cx(cs.displayBlock, cs.paddingTop1, cs.paddingBottom3)}>{siteName}</span>
          </h3>
          <label className={cx(cs.textAlignCenter, cs.displayBlock)}><FormattedMessage {...messages.loginWith} /></label>
          <SocialLogin />
          <strong className={c.lineThrough}><FormattedMessage {...messages.or} /></strong>
          {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
          <FormGroup className={cs.spaceBottom3}>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.emailLabel)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              maxLength={255}
            />
          </FormGroup>
          <FormGroup className={cs.spaceBottom3}>
            <Field
              name="password"
              type="password"
              component={this.renderFormControl}
              label={formatMessage(messages.password)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL', 'passwordInputPadding')}
              showPassword={this.state.showPassword}
              maxLength={25}
            />
            <a onClick={openForgotPasswordModal} className={cx(cs.commonMediumText, cs.siteLinkColor, cs.fontWeightMedium, cs.curserPointer, cs.paddingTop1, cs.displayinlineBlock)}>
              <FormattedMessage {...messages.forgotPassword} />
            </a>
          </FormGroup>
          <Button className={cx(cs.btnPrimary, cs.spaceBottom2)} block type="submit" disabled={submitting || this.state.isDisabled}>
            {formatMessage(messages.login)}
            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
          </Button>
        </form>
        <h6 className={cx(cs.siteTextColor, cs.commonMediumText, cs.fontWeightNormal, cs.textAlignCenter, cs.paddingBottom1)}>
          <FormattedMessage {...messages.noAccount} />{' '}
          {registerURL && <Link className={cx(cs.siteLinkColor, cs.commonMediumText, cs.fontWeightMedium)} to={registerURL} >
            <FormattedMessage {...messages.signUp} />
          </Link>}
          {!registerURL && <a href="#" className={cx(cs.siteLinkColor, cs.commonMediumText, cs.fontWeightMedium)} onClick={openSignupModal}>
            <FormattedMessage {...messages.signUp} />
          </a>}
        </h6>
      </>
    );
  }

}

LoginForm = reduxForm({
  form: 'LoginForm', // a unique name for this form
  validate,
  destroyOnUnmount: true
})(LoginForm);


const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen,
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  openForgotPasswordModal,
  openSignupModal,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(LoginForm)));