// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Apollo
import { graphql, gql, compose } from 'react-apollo';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './PhoneVerificationModal.css';
import cs from '../../components/commonStyle.css';
import * as MdIconPack from 'react-icons/lib/md'

// Components
import Loader from '../Loader';
import AddPhoneNumberForm from './AddPhoneNumberForm';
import VerifyPhoneNumberForm from './VerifyPhoneNumberForm';
import { COMMON_COLOR } from '../../constants/index';

// Redux Action
import { openSmsVerificationModal, closeSmsVerificationModal } from '../../actions/SmsVerification/modalActions';
import { sendVerificationSms } from '../../actions/SmsVerification/sendVerificationSms';
import { decode } from '../../helpers/queryEncryption'
import getUserDataQuery from './getUserData.graphql';

// Image
import plusIcon from '/public/SiteIcons/plus.svg'
import closeIcon from '/public/SiteIcons/modalCloseIcon.svg'
import confirmedIcon from '/public/SiteIcons/check.svg'

class PhoneVerificationModal extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  static defaultProps = {
    modalStatus: false,
    data: {
      getPhoneData: null,
      loading: false
    },
    modalFormType: 'addPhoneNumber'
  }

  constructor(props) {
    super(props);

    this.state = {
      form1: true,
      form2: false,
      buttonLoader: false
    };

    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAddPhoneNumber = this.renderAddPhoneNumber.bind(this);
    this.renderVerifyPhoneNumber = this.renderVerifyPhoneNumber.bind(this);
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    this.renderConfirmedPhoneNumber = this.renderConfirmedPhoneNumber.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { modalStatus, modalFormType } = nextProps;
    if (modalFormType == 'verifyPhoneNumber') {
      this.setState({
        form1: false,
        form2: true
      });
    } else {
      this.setState({
        form1: true,
        form2: false
      });
    }
  }


  async verifyPhoneNumber() {
    const { sendVerificationSms, data, data: { loading, getPhoneData } } = this.props;
    let error;
    if (!loading && getPhoneData) {
      this.setState({ buttonLoader: true });
      const { status, errorMessage } = await sendVerificationSms(getPhoneData.countryCode, decode(getPhoneData.phoneNumber));
      if (status != '200') {
        if (errorMessage) {
          error = errorMessage;
        } else {
          error = 'Sorry, something went wrong. Please try again';
        }
        toastr.error("Error!", error);
      }
      this.setState({ buttonLoader: false });
    }

  }

  async handleClick(formType) {
    const { openSmsVerificationModal, modalStatus } = this.props;
    openSmsVerificationModal(formType);
  }

  async handleRemove() {
    const { mutate, closeSmsVerificationModal } = this.props;

    const { data } = await mutate({
      refetchQueries: [{
        query: getUserDataQuery
      }]
    });

    await closeSmsVerificationModal();
  }

  formatPhoneNumber(phoneNumber) {
    let formattedNumber = '';
    if (phoneNumber && phoneNumber != '') {
      if (phoneNumber.length > 6) {
        formattedNumber = phoneNumber.substr(0, phoneNumber.length - 3);
        formattedNumber = formattedNumber.replace(new RegExp("\\d", "g"), '*');
        formattedNumber = formattedNumber + phoneNumber.substr(phoneNumber.length - 3, phoneNumber.length);
      } else {
        formattedNumber = '***' + formattedNumber + phoneNumber.substr(phoneNumber.length - 1, phoneNumber.length);
      }
    }

    return formattedNumber;
  }

  renderAddPhoneNumber() {
    return (
      <div>
        <p className={cx(s.commonMediumText, s.greyText)}><FormattedMessage {...messages.noPhoneNumbeRentered} /></p>
        <a onClick={() => this.handleClick('addPhoneNumber')} className={cx(s.siteLinkColor, s.spaceTop2, s.spaceBottom2, s.dFlex, cs.curserPointer)}>
          <img src={plusIcon} className={cx(s.plusIcon, 'plusIconRTL')} /><FormattedMessage {...messages.addPhoneNumber} />
        </a>
      </div>
    )
  }

  renderVerifyPhoneNumber() {
    const { data, data: { loading, getPhoneData } } = this.props;
    const { formatMessage } = this.props.intl;
    const { buttonLoader } = this.state;

    return (
      <div className={cx(s.commonBorderSection, s.phoneVerifyModal, s.spaceBottom4)}>
        <div className={cx(s.phoneNumberVerifySec, s.spaceBottom4)}>
          {!loading &&
            <>
              <div className={cx(s.countryCodeSec, s.commonMediumText, 'countryCodeSecRTL')}>
                {getPhoneData.countryCode}
              </div>
              <div className={cx(s.phoneNumberSec, 'phoneNumberSecRTL')}>{this.formatPhoneNumber(decode(getPhoneData.phoneNumber))}</div>
            </>
          }
          <div className={cx(s.clearOption, s.textAlignRight, 'textAlignLeftRTL', 'clearOptionRTL')}>
            <a
              title="Remove"
              onClick={this.handleRemove}
              className={cs.curserPointer}>
              <img src={closeIcon} className={s.iconSize} />
            </a>
          </div>
        </div>
        <div className={cx(s.textAlignRight, 'textAlignLeftRTL', s.mobTextCenter)}>
          <Loader
            type={"button"}
            buttonType={"button"}
            className={cx(cs.btnPrimary, s.sendBtn, cs.btnMedium, 'arButtonLoader')}
            disabled={buttonLoader}
            show={buttonLoader}
            label={formatMessage(messages.verifyViaSms)}
            handleClick={this.verifyPhoneNumber}
          />
        </div>
      </div>
    )
  }

  renderConfirmedPhoneNumber() {
    const { data, data: { loading, getPhoneData } } = this.props;

    return (
      <div className={cx(s.commonBorderSection, s.phoneVerifyModal, s.spaceBottom4)}>
        <div className={cx(s.phoneNumberVerifySec, s.spaceBottom3)}>
          {!loading &&
            <>
              <div className={cx(s.countryCodeSec, s.commonMediumText, 'countryCodeSecRTL')}>
                {getPhoneData.countryCode}
              </div>
              <div className={cx(s.phoneNumberSec, 'phoneNumberSecRTL')}>{this.formatPhoneNumber(decode(getPhoneData.phoneNumber))}</div>
            </>
          }
          <div className={cx(s.clearOption, s.textAlignRight, 'textAlignLeftRTL', 'clearOptionRTL')}>
            <a
              title="Remove"
              onClick={this.handleRemove}
              className={cs.curserPointer}>
              <img src={closeIcon} className={s.iconSize} />
            </a>
          </div>
        </div>
        <div>
          <p className={cx(s.commonMediumText, s.confirmedText)}><span><img src={confirmedIcon} className={cx(s.confirmedIcon, 'confirmedIconRTL')} /></span><FormattedMessage {...messages.confirmed} /></p>
        </div>
      </div>
    )
  }


  render() {
    const { formatMessage } = this.props.intl;
    const { openSmsVerificationModal, closeSmsVerificationModal, modalStatus, sendVerificationSms } = this.props;
    const { data, data: { loading, getPhoneData } } = this.props;
    const { form1, form2, buttonLoader } = this.state;

    let verificationStatus = (getPhoneData && getPhoneData.verification && getPhoneData.verification.isPhoneVerified == true) ? true : false;

    return (
      <>
        {
          loading && <Loader show={true} />
        }
        {
          !loading && getPhoneData && !modalStatus && !getPhoneData.phoneNumber && !verificationStatus && <>
            {
              this.renderAddPhoneNumber()
            }
          </>
        }
        {
          !loading && getPhoneData && !modalStatus && getPhoneData.phoneNumber && !verificationStatus && <>
            {
              this.renderVerifyPhoneNumber()
            }
          </>
        }
        {
          !loading && getPhoneData && modalStatus && !verificationStatus && form1 && <>
            <AddPhoneNumberForm />
          </>
        }
        {
          !loading && getPhoneData && modalStatus && !verificationStatus && form2 && <>
            <VerifyPhoneNumberForm
              countryCode={getPhoneData.countryCode}
              phoneNumber={decode(getPhoneData && getPhoneData.phoneNumber)} />
          </>
        }
        {
          !loading && verificationStatus && <>
            {
              this.renderConfirmedPhoneNumber()
            }
          </>
        }
      </>
    );
  }

}

const mapState = state => ({
  modalStatus: state.modalStatus.smsVerificationModalOpen,
  modalFormType: state.modalStatus.formType
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal,
  sendVerificationSms
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(getUserDataQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(gql`
    mutation {
        RemovePhoneNumber {
            status
        }
    }`
  )
)(PhoneVerificationModal);