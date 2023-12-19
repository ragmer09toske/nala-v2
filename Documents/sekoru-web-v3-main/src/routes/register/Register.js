// General
import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
// Components
import RegisterForm from '../../components/RegisterForm';
// Translation
import { injectIntl } from 'react-intl';
class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    refer: PropTypes.string
  };

  render() {
    const { refer } = this.props;
    let initialValues = {};
    let loginURL = '/login';
    if (refer) {
      initialValues = {
        refer
      };
      loginURL = '/login?refer=' + refer;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <RegisterForm initialValues={initialValues} loginURL={loginURL} />
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Register));
