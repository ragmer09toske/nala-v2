// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AddPhoneNumberForm.css';
import cs from '../../../components/commonStyle.css';
import {
  FormGroup,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import { compose } from 'react-apollo';

// Internal Components
import CountryList from '../../CountryList';
import Loader from '../../Loader';

// Redux Actions
import { sendVerificationSms } from '../../../actions/SmsVerification/sendVerificationSms';
import { openSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

class AddPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: 'IN',
      country: '+91',
      phoneNumber: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { sendVerificationSms } = this.props;
    const { formatMessage } = this.props.intl;
    const { country, phoneNumber } = this.state;
    let error = null, submitting = false;
    if (!phoneNumber) {
      error = {
        phoneNumber: formatMessage(messages.mobileNumberRequired)
      };
    } else if (isNaN(phoneNumber)) {
      error = {
        phoneNumber: formatMessage(messages.mobileNumberRequired)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { status, errorMessage } = await sendVerificationSms(country, phoneNumber);

      if (status != '200') {
        if (errorMessage != 'Authenticate') {
          error = {
            phoneNumber: errorMessage
          };
        } else if (errorMessage == 'Authenticate') {
          error = {
            phoneNumber: formatMessage(messages.authenticateMessage)
          }
        } else {
          error = {
            phoneNumber: 'Sorry, something went wrong. Please try again'
          };
        }
      }
    }
    if (this.refs.addPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }
  }

  handleCountryChange(e, selectedData) {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { smsLoading } = this.props;
    const { country, phoneNumber, submitting, error, countryCode } = this.state;
    return (
      <div ref='addPhoneNumberForm' className={cx(cs.commonBorderSection, cs.spaceBottom2, 'whiteBgColor', 'addPhoneNumber', 'addPhoneNumberRTL')}>
        <FormGroup className={cs.spaceBottom4}>
          <label className={cs.spaceBottom8}><FormattedMessage {...messages.chooseACountry} /></label>
          <CountryList
            input={
              {
                name: 'countryCode',
                onChange: this.handleChange,
                value: countryCode
              }
            }
            className={cs.formControlSelect}
            dialCode={false}
            getSelected={this.handleCountryChange}
          />
        </FormGroup>
        <div className={cs.spaceBottom4}>
          <FormGroup>
            <label className={cs.spaceBottom8}><FormattedMessage {...messages.addAPhoneNumber} /></label>
            <InputGroup>
              <InputGroup.Addon>{country}</InputGroup.Addon>
              <FormControl
                name={'phoneNumber'}
                value={phoneNumber}
                placeholder={formatMessage(messages.enterPhoneNumber)}
                type={'text'}
                className={cx(cs.formControlInput, s.phoneNumberField)}
                onChange={this.handleChange}
                maxLength={255}
              />
            </InputGroup>
          </FormGroup>
          {error && error.phoneNumber && <span className={cs.errorMessage}>{error.phoneNumber}</span>}
        </div>
        <div className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
          <Loader
            type={"button"}
            buttonType={"button"}
            className={cx(cs.btnPrimary, cs.btnMedium, 'arButtonLoader')}
            disabled={smsLoading}
            show={smsLoading}
            label={formatMessage(messages.verifyViaSms)}
            handleClick={this.submitForm}
          />
        </div>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId,
  smsLoading: state.loader.smsLoading,
});

const mapDispatch = {
  sendVerificationSms,
  openSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch)
)(AddPhoneNumberForm);