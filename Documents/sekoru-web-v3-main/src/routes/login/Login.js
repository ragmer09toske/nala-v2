// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import bt from '../../../src/components/commonStyle.css';
// Components
import LoginForm from '../../components/LoginForm';
// Locale
import messages from '../../locale/messages';
class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    warning: PropTypes.bool,
    formatMessage: PropTypes.func,
    refer: PropTypes.string
  };

  static defaultProps = {
    warning: false
  }

  render() {
    const { warning, refer } = this.props;
    let initialValues = {};
    let socialLoginRefer;
    let registerURL = '/register';
    if (refer) {
      initialValues = {
        refer
      };
      socialLoginRefer = refer;
      if (socialLoginRefer && socialLoginRefer != null) {
        socialLoginRefer = socialLoginRefer.indexOf('?') >= 0 ? socialLoginRefer.replaceAll('?', '------') : socialLoginRefer;
        socialLoginRefer = socialLoginRefer.indexOf('&') >= 0 ? socialLoginRefer.replaceAll('&', '--') : socialLoginRefer;
      }
      registerURL = '/register?refer=' + refer;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            warning && <div>
              <FormattedMessage {...messages.loginConfirmation} />
            </div>
          }
          <LoginForm initialValues={initialValues} registerURL={registerURL} />
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(Login));
