import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Calendar.css';
import cs from '../../../components/commonStyle.css';
import {
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux action
import { bookingProcess } from '../../../actions/booking/bookingProcess';

// Component
import DateRange from '../DateRange';
import CurrencyConverter from '../../CurrencyConverter';
import BillDetails from './BillDetails';
import BookingButton from './BookingButton';
import moment from 'moment'
import TimeField from '../TimeField';
import { formattingTime, generateTimes } from '../../../helpers/formatting';
import CustomCheckbox from '../../CustomCheckbox';

//Images
import miniBus from '/public/siteImages/minibus.svg';

class BookingForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string,
    monthlyDiscount: PropTypes.number,
    weeklyDiscount: PropTypes.number,
    minDay: PropTypes.number,
    maxDay: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    loading: PropTypes.bool,
    availability: PropTypes.bool,
    maximumStay: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    blockedDates: PropTypes.array,
    isHost: PropTypes.bool.isRequired,
    guests: PropTypes.number,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userBanStatus: PropTypes.number,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      includeDelivery: false
    }

    this.handleCheckBox = this.handleCheckBox.bind(this)
    // this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    blockedDates: [],
    availability: true,
    maximumStay: false,
    startDate: null,
    endDate: null,
    guests: 1,
    personCapacity: 0,
  };

  componentDidMount() {
    const { URLRoomType, roomType, change } = this.props;
    this.setState({ includeDelivery: URLRoomType == "true" ? true : false })
    change('roomType', URLRoomType == "true" ? true : false)
  }


  renderFormControlSelect({ input, label, meta: { touched, error }, children, className }) {
    return (
      <div className={'inputFocusColor'}>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    );
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  handleCheckBox(event) {
    const { change } = this.props;
    const { includeDelivery } = this.state;
    this.setState({ includeDelivery: !includeDelivery });
    change('roomType', event);
  }
  checkboxHorizontalGroup = ({ label, labelSmall }) => {
    const { formatMessage } = this.props.intl;
    const { delivery, currency, roomType } = this.props

    return (
      <div className={s.doorStepSection}>
        <img src={miniBus} className={cx(s.doorStepImage, 'doorStepImageRTL')} />
        <div className={cx(s.doorStepText, 'doorStepRTL')}>
          <div>
            <p className={cs.commonMediumText}>{label}</p>
            <p className={cx(cs.commonSmallText, cs.siteLinkColor)}>({labelSmall}{' '}-{' '}{<CurrencyConverter amount={delivery} from={currency} />})</p>
          </div>
          <CustomCheckbox
            className={'icheckbox_square-green'}
            onChange={event => {
              this.handleCheckBox(event);
            }}
            checked={roomType}
            value={true}
          />
        </div>
      </div>
    )
  };


  render() {
    const { includeDelivery } = this.state;
    const { formatMessage } = this.props.intl;
    const { id, personCapacity, basePrice, delivery, currency, isHost, bookingType } = this.props;
    const { monthlyDiscount, weeklyDiscount, minDay, maxDay, maxDaysNotice, securityDeposit } = this.props;
    const { isLoading, availability, maximumStay, guests, startDate, endDate, account, blockedDates } = this.props;
    const { bookingProcess, serviceFees, base, rates, bookingLoading, initialValues, startTime, endTime } = this.props;
    const { roomType, URLRoomType } = this.props;
    const isDateChosen = startDate != null && endDate != null || false;
    let userBanStatusValue, deliveryFee, deliveryStatus;;

    if (account) {
      const { account: { userBanStatus } } = this.props;
      userBanStatusValue = userBanStatus;
    }

    if (includeDelivery) {
      deliveryFee = delivery
      deliveryStatus = 'include'
    } else {
      deliveryFee = 0
      deliveryStatus = 'exclude'
    }


    let isDisabled = false;
    let isValue = true;
    let momentStartDate, momentEndDate, dayDifference;
    momentStartDate = moment(startDate);
    momentEndDate = moment(endDate);
    dayDifference = momentEndDate.diff(momentStartDate, 'days');


    let isTimeChosen = isNaN(startTime) || isNaN(endTime) ? false : true;
    // const isSameTime = (startTime >= endTime) || false;
    let isSameTime = isNaN(startTime) || isNaN(endTime) ? true : false;

    if ((startTime >= endTime) && dayDifference == 0) {
      isValue = false;
      isDisabled = true;
    }
    if (!isTimeChosen) {
      isDisabled = true;
    } else if (!isDateChosen) {
      isDisabled = true;
    }


    let isToday = false;

    let startTimeLookup = generateTimes(0, 1410, isToday);
    let endTimeLookup = generateTimes(0, 0);

    if (momentStartDate) {
      isToday = moment(moment(momentStartDate)).isSame(moment(), 'day');
      startTimeLookup = generateTimes(0, 1410, isToday);
    }

    if (momentEndDate) {
      isToday = moment(moment(momentEndDate)).isSame(moment(), 'day');
      endTimeLookup = generateTimes(0, 0, isToday);
    }

    return (
      <Form>
        <FormGroup className={cs.spaceBottom4}>
          <label>
            <FormattedMessage {...messages.dates} />
          </label>
          <span className={cx('viewListingDate')}>
            <DateRange
              listId={id}
              minimumNights={minDay}
              maximumNights={maxDay}
              blockedDates={blockedDates}
              formName={'BookingForm'}
              maxDaysNotice={maxDaysNotice}
              startTime={startTime}
              endTime={endTime}
            />
          </span>
        </FormGroup>
        <FormGroup className={cs.spaceBottom4}>
          <label>{formatMessage(messages.startLabel)}</label>
          <div className={s.displayGrid}>
            <TimeField
              name={"startTime"}
              className={cs.formControlSelect}
              TimeLookup={startTimeLookup}
              formName={"BookingForm"}
              label={formatMessage(messages.tripStart)}
              listId={id}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              maximumNights={maxDay}
              value={startTime}
              classNameParent={cx(s.paddingRight, 'calendarPaddingRightRTL')}
            />
            <TimeField
              name={"endTime"}
              className={cs.formControlSelect}
              TimeLookup={endTimeLookup}
              formName={"BookingForm"}
              label={formatMessage(messages.tripEnd)}
              listId={id}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              maximumNights={maxDay}
              value={endTime}
              classNameParent={cx(s.paddingLeft, 'calendarPaddingLeftRTL')}
            />
          </div>
        </FormGroup>
        {
          (delivery != null || delivery != undefined) && Number(delivery) > 0 &&
          <FormGroup className={cs.spaceBottom3}>
            <Field
              name="roomType"
              component={this.checkboxHorizontalGroup}
              label={formatMessage(messages.doorstepDelivery)}
              labelSmall={formatMessage(messages.deliveryCharges)}
            />
          </FormGroup>
        }
        <FormGroup>
          {
            !isLoading && maximumStay && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, cs.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.maximumStay} /> {maxDay} {maxDay > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
              </p>
            </div>
          }
          {
            !isLoading && !availability && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, cs.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.hostErrorMessage2} />
              </p>
            </div>
          }
          {
            isTimeChosen && !isValue && <div className={cx(s.bookItMessage, cs.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}><FormattedMessage {...messages.youMustChooseTime} /></p>
            </div>
          }
        </FormGroup>
        {
          !maximumStay && availability && isDateChosen && !userBanStatusValue && isTimeChosen && isValue && <BillDetails
            basePrice={basePrice}
            delivery={deliveryFee}
            currency={currency}
            monthlyDiscount={monthlyDiscount}
            weeklyDiscount={weeklyDiscount}
            startDate={startDate}
            endDate={endDate}
            serviceFees={serviceFees}
            base={base}
            rates={rates}
            securityDeposit={securityDeposit}
          />
        }
        <BookingButton
          listId={id}
          startDate={startDate}
          endDate={endDate}
          guests={!isNaN(guests) ? guests : 1}
          bookingProcess={bookingProcess}
          availability={availability}
          isDateChosen={isDateChosen}
          userBanStatus={userBanStatusValue}
          basePrice={basePrice}
          isHost={isHost}
          bookingType={bookingType}
          bookingLoading={bookingLoading}
          maximumStay={maximumStay}
          isDisabled={isDisabled}
          startTime={startTime}
          endTime={endTime}
          deliveryStatus={deliveryStatus}
          roomType={roomType}
        />
      </Form>
    );
  }
}
BookingForm = reduxForm({
  form: 'BookingForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BookingForm);
// Decorate with connect to read form values
const selector = formValueSelector('BookingForm'); // <-- same as form name

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  startDate: selector(state, 'startDate'),
  endDate: selector(state, 'endDate'),
  guests: Number(selector(state, 'guests')),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  startTime: Number(selector(state, 'startTime')),
  endTime: Number(selector(state, 'endTime')),
  roomType: selector(state, 'roomType')
});
const mapDispatch = {
  bookingProcess,
};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(BookingForm)));