import React from 'react';
import PropTypes from 'prop-types';

// Redux form
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Style
import {
  Button,
  FormGroup,
  FormControl,

} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordForm.css';
import cs from '../../components/commonStyle.css';

//Images
import ShowPassword from '/public/SiteIcons/pswVisible.svg';
import HidePassword from '/public/SiteIcons/pwdHidden.svg';

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
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    this.setState({ [fieldName]: !this.state[fieldName] });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, showPassword, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom4, cs.positionRelative)}>
        <label>{label}</label>
        <FormControl {...input} type={showPassword ? input : type} className={cx(cs.formControlInput, 'passwordInputRTL', s.formControlpassWord)} placeholder={placeholder} maxLength={25} autoComplete={"off"} />
        {type == 'password' && <span onClick={() => this.handleChange(input.name)} className={cx(cs.passwordIcon, 'passwordIconRTL')}>
          {showPassword ? <img src={ShowPassword} /> : <img src={HidePassword} />}
        </span>}
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor')}>
        <h3 className={cx(cs.commonTotalText, cs.spaceBottom4)}><FormattedMessage {...messages.changePassword} /></h3>
        <form onSubmit={handleSubmit(submit)} autoComplete={"off"}>
          {error && <strong>{error}</strong>}
          {
            initialValues && initialValues.registeredType === 'email' && <Field
              name="oldPassword"
              type="password"
              component={this.renderFormControl}
              label={formatMessage(messages.oldPassword)}
              showPassword={this.state.oldPassword}
              placeholder={formatMessage(messages.enterOldPassword)}
            />
          }
          <Field name="newPassword" type="password" component={this.renderFormControl} showPassword={this.state.newPassword} label={formatMessage(messages.newPassword)} placeholder={formatMessage(messages.newPassword)} />
          <Field name="confirmPassword" type="password" component={this.renderFormControl} showPassword={this.state.confirmPassword} label={formatMessage(messages.confirmNewPassword)} placeholder={formatMessage(messages.confirmNewPassword)} />
          <div className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
            <Button className={cs.btnPrimary} type="submit" disabled={submitting}>
              <FormattedMessage {...messages.updatePassword} />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangePasswordForm', // a unique name for this form
  validate
})(ChangePasswordForm);

export default injectIntl(withStyles(s, cs)(ChangePasswordForm));