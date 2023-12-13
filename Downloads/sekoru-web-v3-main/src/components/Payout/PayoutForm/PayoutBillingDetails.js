import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import cs from '../../../components/commonStyle.css';

// Component
import CountryList from '../../CountryList';

// Helpers
import validate from './validate';
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

class PayoutBillingDetails extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    previousPage: PropTypes.any.isRequired,
  };

  renderField = ({ input, label, type, meta: { touched, error, dirty }, maxLength, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom4, className)}>
        <label>{label}</label>
        <FormControl {...input} componentClass="input" className={cx(cs.formControlInput, 'commonInputPaddingRTL')} placeholder={label} maxLength={maxLength} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderCountryList = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cs.spaceBottom4}>
        <label><FormattedMessage {...messages.country} /></label>
        <CountryList input={input} className={cs.formControlSelect} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  handleClick() {
    history.push('/user/payout');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor')}>
        <form onSubmit={handleSubmit}>
          <h3 className={cx(cs.commonTotalText, cs.paddingBottom4)}>{formatMessage(messages.addPayout)}</h3>
          <Field name="country" component={this.renderCountryList} />
          <Field name="address1" component={this.renderField} label={formatMessage(messages.address1)} maxLength={255} />
          <Field name="address2" component={this.renderField} label={formatMessage(messages.address2)} maxLength={255} />
          <div className={cx(s.payoutTitleFlex, s.spaceBetWeen, s.flexColumMobile, s.alignItemBaseLine)}>
            <Field name="city" component={this.renderField} label={formatMessage(messages.city)} className={s.cityWidth} maxLength={255} />
            <Field name="state" component={this.renderField} label={formatMessage(messages.state)} className={s.cityWidth} maxLength={255} />
          </div>
          <Field name="zipcode" component={this.renderField} label={formatMessage(messages.zipCode)} maxLength={30} />
          <div className={cx(s.btnFlex, cs.spaceTop4)}>
            <Button className={cx(cs.btnPrimaryBorder, s.btnRight, 'payoutBackRTL')} onClick={this.handleClick}>
              <FormattedMessage {...messages.back} />
            </Button>
            <Button className={cs.btnPrimary} type="submit">
              <FormattedMessage {...messages.next} />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

PayoutBillingDetails = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PayoutBillingDetails);

export default injectIntl(withStyles(s, cs)(PayoutBillingDetails));