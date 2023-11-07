import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import moment from 'moment';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  FormGroup,
  FormControl
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../commonStyle.css';

import Avatar from '../Avatar';
import DriverInfo from '../Booking/Payment/DriverInfo';
import HouseRules from '../Booking/Payment/HouseRules';
import Loader from '../Loader';
import Link from '../Link';

// Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../locale/messages';

class PaymentForm extends Component {
  static propTypes = {
    hostName: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired,
      }),
    })),
    allowedGuests: PropTypes.number.isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    houseRules: [],
    paymentCurrencyList: [],
    paymentLoading: false,
  };

  constructor(props) {
    super(props);
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
  }

  renderFormControlSelect({ input, label, meta: { touched, error }, children, className, isDisabled }) {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} disabled={isDisabled} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
      </div>
    );
  }

  renderFormControlTextArea({ input, label, meta: { touched, error }, children, className, isDisabled }) {
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
          disabled={isDisabled}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? 'guests' : 'guest'}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    const rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      });
    }
    return rows;
  }

  render() {
    const { houseRules, hostName, allowedGuests, paymentLoading, hostPicture, hostProfileId, hostJoined } = this.props;
    const { handleSubmit, submitting, error, pristine, listId } = this.props;
    const { formatMessage } = this.props.intl;
    let joinedDate = hostJoined != null ? moment(hostJoined).format("MMM, YYYY") : '';

    return (
      <div className={cx(s.bookItPanel, 'paypalCancelInput')}>
        <form onSubmit={handleSubmit(submit)}>

          <h1 className={cx(cs.commonTitleText, cs.paddingBottom4, cs.fontWeightBold)}><FormattedMessage {...messages.reviewandPay} /></h1>
          <h3 className={cx(cs.paddingBottom2, cs.fontWeightBold, cs.commonTotalText, cs.noMargin)}>
            1.{' '}<FormattedMessage {...messages.liscenseInfo} />
          </h3>
          <h4 className={cx(cs.commonContentText, cs.paddingBottom4, cs.fontWeightNormal)}>
            <FormattedMessage {...messages.aboutLiscenseContent} />
          </h4>
          <DriverInfo disabled={true} />
          <hr className={s.horizondalLine} />
          <h5 className={cx(cs.paddingBottom2, cs.fontWeightBold, cs.commonTotalText, cs.noMargin)}>
            2.{' '}<FormattedMessage {...messages.aboutYourTrip} />
          </h5>
          <h5 c className={cx(cs.commonContentText, cs.paddingBottom4, cs.fontWeightNormal)}>
            <FormattedMessage {...messages.sayHello} />
          </h5>
          <div className={cx(s.avatarImageGrid, cs.spaceBottom4)}>
            <Avatar
              source={hostPicture}
              type={"small"}
              height={80}
              width={80}
              title={hostName}
              className={cx(cs.profileAvatarLink, cs.profileAvatarLinkPayment)}
              withLink
              linkClassName={cs.displayinlineBlock}
              profileId={hostProfileId}
            />
            <div className={cx(s.textSection, 'viewListingTextSectionRTL')}>
              <a href={"/users/show/" + hostProfileId} target={'_blank'} className={cx(cs.commonSubTitleText, cs.siteTextColor, cs.fontWeightBold)}>
                {formatMessage(messages.hostedBy)} {' '}  <span className={cs.siteLinkColor}>{hostName}</span>
              </a>
              <h4 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.paddingTop1)}>
                {formatMessage(messages.joinedIn)}{' '}{joinedDate}
              </h4>
            </div>
          </div>
          <Field
            name="message"
            component={this.renderFormControlTextArea}
            label={formatMessage(messages.descriptionInfo)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
            isDisabled
          />
          <hr className={s.horizondalLine} />
          {
            houseRules.length > 0 && <>
              <HouseRules
                hostDisplayName={hostName}
                houseRules={houseRules}
              />
              <hr className={s.horizondalLine} />
            </>
          }
          <div>
            <h3 className={cx(cs.paddingBottom2, cs.fontWeightBold, cs.commonTotalText, cs.noMargin)}>4.{' '}<FormattedMessage {...messages.payment} /></h3>
            <div className={cx(cs.commonContentText, cs.paddingBottom4)}>
              <FormattedMessage {...messages.paymentInfo} />
            </div>
            <div>
              <label><FormattedMessage {...messages.paymentCurrency} /></label>
            </div>
            <div className={s.errorMessage}>
              <Field name="paymentCurrency" component={this.renderFormControlSelect} className={s.formControlSelect} >
                <option value="">{formatMessage(messages.chooseCurrency)}</option>
                {
                  this.renderpaymentCurrencies()
                }
              </Field>
            </div>
            <div>
              <label><FormattedMessage {...messages.PaymentTypeText} /></label>
            </div>
            <div className={cs.paddingBottom2}>
              <FormControl componentClass="select" className={s.formControlSelect} >
                <option>{formatMessage(messages.paypal)}</option>
              </FormControl>
            </div>

          </div>
          <div className={s.commonContentText}><FormattedMessage {...messages.loginInfo} /></div>
          <div className={cx(cs.dFlexWrapAlignEnd, cs.paddingTop5, 'arButtonLoader')}>
            {/* <Link
              to={"/cars/" + listId}
              className={cs.btnPrimaryBorder}
            >
              <FormattedMessage {...messages.cancel} />
            </Link> */}
            <Loader
              type={'button'}
              buttonType={'submit'}
              className={cx(cs.btnPrimary, s.marginLeft, 'createBtnRTL')}
              disabled={submitting || error}
              show={paymentLoading}
              label={formatMessage(messages.payNow)}
            />
          </div>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate,
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = state => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
});

const mapDispatch = {};

export default injectIntl(withStyles(cs, s)(connect(mapState, mapDispatch)(PaymentForm)));

