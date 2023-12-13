import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux form
import { Field, reduxForm } from 'redux-form';

import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row, FormGroup,
  Col,
  FormControl,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordForm.css';
import cs from '../../commonStyle.css';

//Images
import ShowPassword from '../../../../public/SiteIcons/pswVisible.svg';
import HidePassword from '../../../../public/SiteIcons/pwdHidden.svg';

// Locale
import messages from '../../../locale/messages';

//
import arrow from '../../../../public/SiteIcons/rentNowArrow.svg';

class ChangePasswordForm extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.shape({
      registeredType: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    initialValues: {
      registeredType: 'email'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      newPassword: false,
      confirmPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    this.setState({ [fieldName]: !this.state[fieldName] });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, showPassword, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <div>
          <label>{label}</label>
          <div className={cs.positionRelative}>
            <FormControl {...input} type={showPassword ? input : type} className={cx(cs.formControlInput, 'passwordInputIcon')}
              placeholder={label}
              maxLength={25}
            />
            {type == 'password' && <span onClick={() => this.handleChange(input.name)} className={'passwordIcon'}>
              {showPassword ? <img src={ShowPassword} /> : <img src={HidePassword} />}
            </span>}
          </div>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.panelHeader}>
        <form onSubmit={handleSubmit(submit)}>
          <h1 className={s.headingCss}>{formatMessage(messages.changePassword)}</h1>
          {error && <strong>{error}</strong>}
          <div className={s.paddingAll}>
            <div className={cs.spaceBottom3}>
              <Field name="newPassword"
                type="password"
                showPassword={this.state.newPassword}
                component={this.renderFormControl}
                label={formatMessage(messages.forgotPasswordNewPassword)}
              />
            </div>
            <Field
              name="confirmPassword"
              type="password"
              showPassword={this.state.confirmPassword}
              component={this.renderFormControl}
              label={formatMessage(messages.confirmPassword)}
            />
            <FormGroup className={cs.noMargin}>
              <div className={cx(cs.spaceTop5)}>
                <Button className={cx(cs.btnPrimary, cs.dFlex, s.fullWidth)} type="submit" disabled={submitting}>
                  <FormattedMessage {...messages.saveAndContinue} />
                  <img src={arrow} className={'forgetArrow'} />
                </Button>
              </div>
            </FormGroup>
          </div>
        </form>
      </div>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangeForgotPasswordForm', // a unique name for this form
  validate
})(ChangePasswordForm);

export default injectIntl(withStyles(s, cs)(ChangePasswordForm));
