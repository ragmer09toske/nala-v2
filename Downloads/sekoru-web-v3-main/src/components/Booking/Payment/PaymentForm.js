import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector, reset, change } from 'redux-form';

import { graphql, gql, compose } from 'react-apollo';

import {
  FormGroup,
  FormControl
} from 'react-bootstrap';

import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import { toastr } from 'react-redux-toastr';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../../commonStyle.css';

// Helpers
import validate from './validate';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Link from '../../Link';
import Avatar from '../../Avatar';
import DriverInfo from './DriverInfo';

// Locale
import messages from '../../../locale/messages';
import { isRTL } from '../../../helpers/formatLocale'

import { makePayment } from '../../../actions/booking/makePayment'
import { processCardAction } from '../../../actions/PaymentIntent/processCardAction'
import { COMMON_TEXT_COLOR } from '../../../constants/index';
import imageOne from '/public/siteImages/showAllCars.svg';
import imageTwo from '/public/siteImages/stripImage.svg';


const createOptions = (isRTLLocale) => {
  return {
    style: {
      base: {
        color: COMMON_TEXT_COLOR,
        fontWeight: 400,
        fontFamily: 'inherit',
        textAlign: isRTLLocale ? 'right' : 'left',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':focus': {
          color: COMMON_TEXT_COLOR,
        },

        '::placeholder': {
          color: '#aaa',
        },

        ':focus::placeholder': {
          color: '#aaa',
        },
      },
      invalid: {
        color: '#303238',
        ':focus': {
          color: COMMON_TEXT_COLOR,
        },
        '::placeholder': {
          color: '#aaa',
        },
      },
    }
  }
};

class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      delivery: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: 2,
      load: true
    }
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getAllPayments: { getPaymentMethods }, change } = nextProps;
    if (getPaymentMethods && getPaymentMethods.length == 1) {
      this.setState({
        paymentStatus: getPaymentMethods[0].id
      });
      change('paymentType', getPaymentMethods[0].id)
    }
  }

  renderFormControl = ({ input, label, type, placeholder, meta: { touched, error }, className, maxLength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx('inputFocusColorNone', cs.spaceBottom2)}>
        <FormControl {...input} placeholder={placeholder} type={type} className={className} maxLength={maxLength} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cs.spaceBottom3}>
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cs.noMargin}>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
          rows={'6'}
        >
          {children}
        </FormControl>
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? 'guests' : 'guest'}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    let rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      })
    }
    return rows;
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(reset('BookingForm'));
  }

  async handleSubmit(values, dispatch) {
    const { stripe, processCardAction } = this.props;

    let paymentType = values.paymentType, paymentCurrency, month;
    let monthValue, dateValue, dateOfBirth;
    let today, birthDate, age, monthDifference, dobDate;
    let dateOfMonth = Number(values.month) + 1;

    dobDate = values.year + '/' + dateOfMonth + '/' + values.day
    paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;
    month = values.month ? Number(values.month) + 1 : null;
    monthValue = Number(values.month) > 8 ? Number(month) : '0' + month;
    dateValue = values.day > 9 ? values.day : '0' + values.day;
    dateOfBirth = monthValue + "-" + dateValue + "-" + values.year;
    today = new Date();
    birthDate = new Date(dobDate);
    age = today.getFullYear() - birthDate.getFullYear();
    monthDifference = today.getMonth() - birthDate.getMonth();

    if (values.year) {
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 18) {
        toastr.error("Update Profile Failed", "Sorry, you must be 18 years old");
        return false;
      }
    }

    let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
      checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        status
      }
    }`;


    const params = {
      listId: values.listId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    };

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.checkReservation && data.checkReservation.status == "200") {

      let msg = '', paymentMethodId, createPaymentMethod;

      if (paymentType == 2) {
        createPaymentMethod = await stripe.createPaymentMethod('card', {
          card: <CardElement />,
          billing_details: {
            address: {
              postal_code: values.zipcode
            }
          }
        })

        if (createPaymentMethod && createPaymentMethod.paymentMethod) {
          paymentMethodId = createPaymentMethod.paymentMethod.id
        }
      }

      if (createPaymentMethod && createPaymentMethod.error && createPaymentMethod.error.message && paymentType == 2) {
        msg = createPaymentMethod.error.message
        toastr.error("Oops!", msg);
      } else {

        if (Number(values.paymentType) == 2 && !values.zipcode) {
          toastr.error("Oops!", 'Your Zip code is incomplete.');
          return;
        }

        const { status, paymentIntentSecret, reservationId } = await dispatch(makePayment(
          values.listId,
          values.listTitle,
          values.hostId,
          values.guestId,
          values.checkIn,
          values.checkOut,
          values.guests,
          values.message,
          values.basePrice,
          values.delivery,
          values.currency,
          values.discount,
          values.discountType,
          values.guestServiceFee,
          values.hostServiceFee,
          values.total,
          values.bookingType,
          paymentCurrency,
          paymentType,
          values.guestEmail,
          values.bookingSpecialPricing,
          values.isSpecialPriceAssigned,
          values.isSpecialPriceAverage,
          values.dayDifference,
          values.startTime,
          values.endTime,
          values.licenseNumber,
          values.firstName,
          values.middleName,
          values.lastName,
          dateOfBirth,
          values.country,
          paymentMethodId,
          values.securityDeposit
        )
        );

        if (status == 400 && paymentType == 2) {
          const cardAction = await stripe.handleCardAction(
            paymentIntentSecret,
          );
          let amount = values.total + values.guestServiceFee;
          let confirmPaymentIntentId;

          if (cardAction && cardAction.paymentIntent && cardAction.paymentIntent.id) {
            confirmPaymentIntentId = cardAction.paymentIntent.id;
            const { handleCardActionStatus, errorMessage } = await processCardAction(
              reservationId,
              values.listId,
              values.hostId,
              values.guestId,
              values.listTitle,
              values.guestEmail,
              amount,
              values.currency,
              confirmPaymentIntentId
            );
          } else {
            if (cardAction && cardAction.error && cardAction.error.message) {
              msg = cardAction.error.message;
              toastr.error("Oops!", msg);
            }
          }
        }

      }
    } else {
      toastr.error("Oops!", "Those dates are not available.");
    }
  }

  handlePayment(e) {
    let paymentType = e.target.value;

    if (paymentType == 2) {
      this.setState({ paymentStatus: 2 })
    } else {
      this.setState({ paymentStatus: 1 })
    }

  }

  render() {
    const { hostDisplayName, houseRules, hostPicture, paymentLoading, intl: { locale } } = this.props;
    const { handleSubmit, submitting, error, pristine, paymentType, hostProfileId, hostJoined } = this.props;
    const { listId } = this.props;
    const { paymentStatus, load } = this.state;
    const { formatMessage } = this.props.intl;
    const { data: { getCountries } } = this.props;
    const { getAllPayments: { getPaymentMethods } } = this.props;
    let joinedDate = hostJoined != null ? moment(hostJoined).format("MMM, YYYY") : '';

    return (
      <div className={cx('inputFocusColor')}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h1 className={cx(cs.commonTitleText, cs.paddingBottom4)}><FormattedMessage {...messages.reviewandPay} /></h1>
          <h3 className={cx(s.titleText, cs.paddingBottom2)}>
            1.{' '}<FormattedMessage {...messages.liscenseInfo} />
          </h3>
          <h4 className={cx(cs.commonContentText, cs.paddingBottom4)}>
            <FormattedMessage {...messages.aboutLiscenseContent} />
          </h4>
          <DriverInfo />
          <hr className={s.horizondalLine} />
          <h5 className={cx(s.titleText, cs.paddingBottom2)}>
            2.{' '}<FormattedMessage {...messages.aboutYourTrip} />
          </h5>
          <h5 className={cx(cs.commonContentText, cs.paddingBottom4)}>
            <FormattedMessage {...messages.sayHello} />
          </h5>
          <div className={cx(s.avatarImageGrid, cs.spaceBottom4)}>
            <Avatar
              source={hostPicture}
              type={"small"}
              height={80}
              width={80}
              title={hostDisplayName}
              className={cx(cs.profileAvatarLink, cs.profileAvatarLinkPayment)}
              withLink
              linkClassName={cs.displayinlineBlock}
              profileId={hostProfileId}
            />
            <div className={cx(s.textSection, 'viewListingTextSectionRTL')}>
              <a href={"/users/show/" + hostProfileId} target={'_blank'} className={cx(cs.commonSubTitleText, cs.siteTextColor, cs.fontWeightBold)}>
                {formatMessage(messages.hostedBy)} {' '}  <span className={cs.siteLinkColor}>{hostDisplayName}</span>
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
          />
          <hr className={s.horizondalLine} />
          {
            houseRules.length > 0 && <>
              <HouseRules
                hostDisplayName={hostDisplayName}
                houseRules={houseRules}
              />
              <hr className={s.horizondalLine} />
            </>
          }
          <div>
            <h5 className={cx(s.titleText, cs.paddingBottom2)}>4.{' '}<FormattedMessage {...messages.payment} /></h5>
            {getPaymentMethods && getPaymentMethods.length > 1 &&
              <>
                <h6 className={cx(cs.commonContentText, cs.paddingBottom4)}><FormattedMessage {...messages.paymentText} /></h6>
                <label><FormattedMessage {...messages.PaymentmethodText} /></label>
                <Field
                  name="paymentType"
                  type="text"
                  className={cs.formControlSelect}
                  component={this.renderFormControlSelect}
                  onChange={(e) => this.handlePayment(e)}
                >
                  <option value={2}>{formatMessage(messages.creditCard)}</option>
                  <option value={1}>{formatMessage(messages.payPal)}</option>
                </Field>
              </>
            }
            {
              getPaymentMethods && getPaymentMethods.length == 1 && <>
                <label className='textAlignRightRTL'>{paymentStatus == 2 ? formatMessage(messages.stripeContent) : formatMessage(messages.paypal)}</label>
              </>
            }
            {
              paymentStatus == 2 ? (!load ? <Loader /> :
                <>
                  <div className={cx('placeHolderFont', s.cardSection)}>
                    <>
                      <label>
                        <FormattedMessage {...messages.paymentCardNumber} />
                      </label>
                      <CardNumberElement
                        {...createOptions(isRTL(locale))}
                        placeholder="4242 4242 4242 4242"
                        className={cx(s.cardNumberSection, s.cardNumberSectionOne, 'cardNumberRtl')}
                      />
                    </>
                    <div className={s.dateFiledGrid}>
                      <div>
                        <label>
                          <FormattedMessage {...messages.cardExpires} />
                        </label>
                        <CardExpiryElement
                          placeholder="MM / YY"
                          {...createOptions(isRTL(locale))}
                          className={cx(s.cardNumberSectionTwo, s.cardNumberSection, 'cardNumberRtl')}
                        />
                      </div>
                      <div className={cx(s.datePadding, s.cvvNoPadding)}>
                        <label>
                          <FormattedMessage {...messages.cvv} />
                        </label>
                        <CardCvcElement
                          placeholder="_ _ _"
                          {...createOptions(isRTL(locale))}
                          className={cx(s.cardNumberSectionThree, s.cardNumberSection, 'cardNumberRtl')}
                        />
                      </div>
                      <div>
                        <label>
                          <FormattedMessage {...messages.zipcode} />
                        </label>
                        <div className={cx(s.cardNumberSectionFour, 'RTLcardNumberSectionFour')}>
                          <Field
                            name="zipcode"
                            component={this.renderFormControl}
                            className={cx(s.cardNumberSection, 'cardNumberRtlTwo', cs.formControlInput)}
                            placeholder={formatMessage(messages.zipcode)}
                            maxLength={30}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={cx(s.tableFlex, s.flexWrap)}>
                      <img src={imageOne} className={s.stripeImg} />
                      <img src={imageTwo} className={s.stripeImg} />
                    </div>
                  </div>
                </>
              ) : <span></span>
            }
            {
              paymentStatus == 1 &&
              <>
                <Field name="paymentCurrency" disabled={paymentType == 2} component={this.renderFormControlSelect} className={cs.formControlSelect} >
                  <option value="">{formatMessage(messages.chooseCurrency)}</option>
                  {
                    this.renderpaymentCurrencies()
                  }
                </Field>
                <p className={cx(cs.commonContentText, cs.paddingBottom4)}>
                  <FormattedMessage {...messages.loginInfo} />
                </p>
              </>
            }
            <div className={s.payNowFlex}>
              <div className={cx(s.cancelBtn, 'RTLcancelBtn')}>
                {
                  !paymentLoading && <>
                    <Link
                      to={"/cars/" + listId}
                      className={cx(cs.btnPrimaryBorder, cs.displayinlineBlock, cs.spaceTop5)}
                      onClick={this.handleClick}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Link>
                  </>
                }
                {
                  paymentLoading && <>
                    <a
                      href="javascript:void(0)"
                      className={cx(cs.btnPrimaryBorder, cs.displayinlineBlock, cs.spaceTop5)}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </a>
                  </>
                }
              </div>
              <Loader
                type={"button"}
                buttonType={"submit"}
                className={cx(cs.btnPrimary, cs.spaceTop5, 'arButtonLoader')}
                disabled={submitting || error}
                show={paymentLoading}
                label={formatMessage(messages.payNow)}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
  paymentType: selector(state, 'paymentType')
});

const mapDispatch = {
  processCardAction,
  change
};

export default injectStripe(compose(
  injectIntl,
  withStyles(s, cs),
  (connect(mapState, mapDispatch)),
  graphql(gql`
    query getCountries {
        getCountries{
            id
            countryCode
            countryName
            isEnable
            dialCode
        }
    }
`, { options: { ssr: false } }),
  graphql(gql`
  query getPaymentMethods {
    getPaymentMethods {
      id
      name
      isEnable
      paymentType
      paymentName
      status
    }
  }
  `,
    { name: 'getAllPayments' },
    { options: { ssr: false } }
  )
)(PaymentForm))