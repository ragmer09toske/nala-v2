// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './VerifyPhoneNumberForm.css';
import cs from '../../../components/commonStyle.css';
import {
  FormGroup,
  FormControl
} from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Redux Action
import { openSmsVerificationModal, closeSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

import getPhoneDataQuery from '../getUserData.graphql';

// Internal Components
import Loader from '../../Loader';

class VerifyPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }



  async submitForm() {
    const { mutate } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode } = this.state;
    let error = null, submitting = false;
    if (!verificationCode) {
      error = {
        verificationCode: formatMessage(messages.verificationCodeRequired)
      };
    } else if (isNaN(verificationCode)) {
      error = {
        verificationCode: formatMessage(messages.verificationCodeRequired)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { data } = await mutate({
        variables: {
          verificationCode
        },
        refetchQueries: [{
          query: getPhoneDataQuery
        }]
      });

      if (data && data.VerifyPhoneNumber) {
        if (data.VerifyPhoneNumber.status === '200') {
          toastr.success("Success!", "Phone number has been verified successfully.");
        } else {
          error = {
            verificationCode: 'We were unable to validate your phone number. Please try again.'
          };
        }
      }
    }

    if (this.refs.verifyPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }

  }

  render() {
    const { countryCode, phoneNumber, closeSmsVerificationModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode, submitting, error } = this.state;

    return (
      <div ref="verifyPhoneNumberForm" className={cx(cs.commonBorderSection, cs.spaceBottom2, 'whiteBgColor')}>
        <FormGroup className={s.spaceBottom3}>
          <label className={cx(cs.commonMediumText, cs.fontWeightNormal)}>
            <span className={cs.greyText}><FormattedMessage {...messages.weHaveSentVerificationCode} />{' '}</span>
            <span>{countryCode}<span>{' '}</span>{phoneNumber}.</span>
          </label>
        </FormGroup>
        <FormGroup className={cs.noMarginBottom}>
          <label className={cs.spaceBottom2}><FormattedMessage {...messages.verificationCodeLabel} />:</label>
          <div className={cx(cs.dFlexContainer, s.flexWrap, s.enterOtpSec)}>
            <div className={cx(cs.spaceBottom2, s.otpFieldSpace, 'otpFieldSpaceRTL')}>
              <FormControl
                name={'verificationCode'}
                value={verificationCode}
                placeholder={formatMessage(messages.enterOtpDigit)}
                type={'text'}
                maxLength={4}
                className={cx(cs.formControlInput, s.otpField)}
                onChange={this.handleChange} />
              {error && error.verificationCode && <span className={cs.errorMessage}>{error.verificationCode}</span>}
            </div>
            <div className={s.displayFlex}>
              <div className={cx(s.spaceRightBtn, cs.spaceBottom2, 'spaceLeftBtnRTL')}>
                <a className={cx(cs.btnPrimaryBorder, cs.btnMedium, s.cancelBtn)}  onClick={closeSmsVerificationModal}>
                  <FormattedMessage {...messages.Cancel} />
                </a>
              </div>
              <div className={cs.spaceBottom2}>
                <Loader
                  containerClass={s.btnContainer}
                  type={"button"}
                  buttonType={"button"}
                  className={cx(cs.btnPrimary, cs.btnMedium, 'arButtonLoader')}
                  disabled={submitting}
                  show={submitting}
                  label={formatMessage(messages.verify)}
                  handleClick={this.submitForm}
                />
              </div>
            </div>
          </div>
        </FormGroup>
        <p className={cx(cs.fontWeightNormal, cs.greyText, cs.commonMediumText)}><FormattedMessage {...messages.tryAgain} /></p>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation VerifyPhoneNumber($verificationCode: Int!) {
      VerifyPhoneNumber(verificationCode: $verificationCode) {
          status
      }
    }
  `)
)(VerifyPhoneNumberForm);