// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux form
import { Field, reduxForm } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Internal Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ForgotPasswordForm.css';
import cs from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

//Images
import arrow from '/public/siteImages/whiteArrow.svg';
class ForgotPasswordForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxLength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={'inputFocusColor'}>
        <label className={s.textTransform}>{label}</label>
        <FormControl {...input} placeholder={label} type={type} className={className} maxLength={maxLength} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { openLoginModal } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
          <h5 className={cx(cs.commonMediumText, cs.paddingBottom3, cs.fontWeightNormal)}><FormattedMessage {...messages.forgotPasswordInfo} /></h5>
          <FormGroup className={cs.spaceBottom3}>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.email)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              maxLength={255}
            />
          </FormGroup>
          <Button
            className={cx(cs.btnPrimary, cs.spaceBottom2, cs.fullWidth)}
            type="submit"
            disabled={submitting}
          >
            <FormattedMessage {...messages.sendLink} />
            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
          </Button>
          <div className={cx(cs.textAlignCenter, cs.paddingBottom3)}>
            <a href="#" onClick={openLoginModal} className={cx(cs.commonMediumText, cs.siteLinkColor, cs.fontWeightMedium, cs.curserPointer, cs.displayinlineBlock)}>
              <FormattedMessage {...messages.backToLogin} />
            </a>
          </div>
        </form>
      </div>
    )
  }

}

ForgotPasswordForm = reduxForm({
  form: 'ForgotPasswordForm', // a unique name for this form
  validate,
  destroyOnUnmount: true
})(ForgotPasswordForm);

export default injectIntl(withStyles(s, cs)(ForgotPasswordForm));