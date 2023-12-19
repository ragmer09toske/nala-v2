import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

import {
  Button,
  Grid,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Components
import Summary from './Summary';
import DetailsForHost from './DetailsForHost';
import DetailsForGuest from './DetailsForGuest';
import NotFound from '../../routes/notFound/NotFound';
import Link from '../Link';

// Helpers
import validate from './validate';
import submit from './submit';

// Locale
import messages from '../../locale/messages';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class CancellationPolicy extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    userType: PropTypes.string.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      delivery: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            id: PropTypes.number.isRequired,
            policyName: PropTypes.string.isRequired,
            priorDays: PropTypes.number.isRequired,
            accommodationPriorCheckIn: PropTypes.number.isRequired,
            accommodationBeforeCheckIn: PropTypes.number.isRequired,
            accommodationDuringCheckIn: PropTypes.number.isRequired,
            guestFeePriorCheckIn: PropTypes.number.isRequired,
            guestFeeBeforeCheckIn: PropTypes.number.isRequired,
            guestFeeDuringCheckIn: PropTypes.number.isRequired,
          })
        })
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string,
        userData: PropTypes.shape({
          email: PropTypes.string.isRequired
        })
      }),
      guestData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string,
        userData: PropTypes.shape({
          email: PropTypes.string.isRequired
        })
      }),
    })
  };

  static defaultProps = {
    data: {
      checkIn: null,
      checkOut: null
    }
  };

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel() {
    const { handleSubmit } = this.props;
    await handleSubmit();
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={cx(s.errorMessage, s.spaceInline)}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  calculateCancellation(interval, nights) {
    const { data, data: { listData: { listingData } } } = this.props;
    let accomodation, guestFees, remainingNights, policyName, priorDays, policyContent;
    if (data && data.cancellation) {
      const { data: { cancellation } } = this.props;
      policyName = cancellation.policyName;
      priorDays = cancellation.priorDays;
      policyContent = cancellation.policyContent;
      if (interval >= cancellation.priorDays) {
        // Prior
        accomodation = cancellation.accommodationPriorCheckIn;
        guestFees = cancellation.guestFeePriorCheckIn;
      } else if (interval < cancellation.priorDays && interval > 0) {
        // Before
        accomodation = cancellation.accommodationBeforeCheckIn;
        guestFees = cancellation.guestFeeBeforeCheckIn;
        remainingNights = nights - 1; //Fisrt day amount reduced 
      } else {
        // During
        accomodation = cancellation.accommodationDuringCheckIn;
        guestFees = cancellation.guestFeeDuringCheckIn;
        remainingNights = (nights - 1) + interval;
      }

    } else if (listingData && listingData.cancellation) {
      const { data: { listData: { listingData: { cancellation } } } } = this.props;
      policyName = cancellation.policyName;
      policyContent = cancellation.policyContent;
      if (interval >= cancellation.priorDays) {
        // Prior
        accomodation = cancellation.accommodationPriorCheckIn;
        guestFees = cancellation.guestFeePriorCheckIn;

      } else if (interval < cancellation.priorDays && interval > 0) {
        // Before
        accomodation = cancellation.accommodationBeforeCheckIn;
        guestFees = cancellation.guestFeeBeforeCheckIn;
        remainingNights = nights - 1; //Fisrt day amount reduced 

      } else {
        // During
        accomodation = cancellation.accommodationDuringCheckIn;
        guestFees = cancellation.guestFeeDuringCheckIn;
        remainingNights = (nights - 1) + interval;
      }
    }
    return { policyName, accomodation, guestFees, remainingNights, interval, nights, priorDays, policyContent };
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { userType, data, data: { guestData, hostData, messageData, checkOut, checkIn, startTime, endTime } } = this.props;
    const { data: { listData, listData: { settingsData, transmission, reviewsCount, reviewsStarRating } } } = this.props;

    let momentStartDate, momentEndDate, nights, interval, cancelData = {}, placeholder, carType, transmissionLabel, starRatingValue = 0,
      keepReservationUrl = userType === 'owner' ? '/reservation/current' : '/trips/current';

    let today = moment().startOf('days')
    if (checkIn && checkOut) {
      momentStartDate = moment(checkIn).startOf('days')
      momentEndDate = moment(checkOut).startOf('days')
      nights = momentEndDate.diff(momentStartDate, 'days');
      interval = momentStartDate.diff(today, 'days');
      nights = nights + 1;
    }
    if (guestData && hostData && messageData && listData) {
      cancelData = this.calculateCancellation(interval, nights);
      const { handleSubmit, submitting, error, pristine } = this.props;
      if (userType === 'owner') {
        placeholder = formatMessage(messages.cancelReasonHost);
      } else {
        placeholder = formatMessage(messages.cancelReasonGuest);
      }
      carType = settingsData && settingsData.length > 0 && settingsData[0].listsettings.itemName;
      transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual'
      if (reviewsCount > 0 && reviewsStarRating > 0) {
        starRatingValue = Math.round(reviewsStarRating / reviewsCount)
      }
      return (
        <div>
          <Grid>
            <Row className={s.landingContaiconfirmationCodener}>
              <form onSubmit={handleSubmit(submit)}>
                <Col xs={12} sm={7} md={7} lg={7} >
                  <Summary
                    userType={userType}
                    profileData={userType === 'owner' ? guestData : hostData}
                    guests={data.guests}
                    nights={nights}
                    interval={interval}
                    cancelData={cancelData}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    startTime={startTime}
                    endTime={endTime}
                    hostData={hostData}
                  />
                  <div className={s.spaceBottom2}>
                    <Field
                      inputClass={cx(s.textAreaInput, s.commonMediumText)}
                      name="message"
                      component={CommonFormComponent}
                      label={placeholder}
                      componentClass={"textarea"}
                    />
                  </div>
                  <p className={cx(s.spaceBottom5, s.commonContentText, s.fontWeightNormal)}>
                    {userType === 'owner' ? <FormattedMessage {...messages.reservationCancel} /> : <FormattedMessage {...messages.tripCancel} />}
                  </p>
                  <FormGroup>
                    <div className={cx(s.cancellationBtnSection, s.dFlex)}>
                      <Link
                        className={cx(s.btnPrimaryBorder, s.btnMediumSpace, s.spaceRight2, s.mobMarginBtn, s.textAlignCenter, s.displayinlineBlock, 'spaceRight2RTL')}
                        to={keepReservationUrl}>
                        {userType === 'owner' ? <FormattedMessage {...messages.keepReservation} /> : <FormattedMessage {...messages.keepYourTrip} />}
                      </Link>

                      <Button
                        className={cx(s.btnPrimary, s.btnMediumSpace, s.cancelReservationBtn)}
                        onClick={() => this.handleCancel()}
                      >
                        {userType === 'owner' ? <FormattedMessage {...messages.cancelYourReservation} /> : <FormattedMessage {...messages.cancelYourTrip} />}
                      </Button>
                    </div>
                  </FormGroup>
                </Col>
                {
                  userType === 'owner' && <DetailsForHost
                    userType={userType}
                    firstName={guestData.firstName}
                    guestEmail={guestData.userData.email}
                    hostName={hostData.firstName}
                    profileId={hostData.profileId}
                    picture={hostData.picture}
                    checkIn={data.checkIn}
                    checkOut={data.checkOut}
                    guests={data.guests}
                    title={data.listTitle ? data.listTitle : listData.title}
                    discount={data.discount ? data.discount : 0}
                    listId={data.listId}
                    basePrice={data.basePrice}
                    delivery={data.delivery}
                    guestServiceFee={data.guestServiceFee}
                    hostServiceFee={data.hostServiceFee}
                    total={data.total}
                    currency={data.currency}
                    cancelData={cancelData}
                    reservationId={data.id}
                    threadId={data.messageData.id}
                    confirmationCode={data.confirmationCode}
                    holdeData={data}
                    startTime={data.startTime}
                    endTime={data.endTime}
                    carType={carType}
                    transmission={transmissionLabel}
                    starRatingValue={starRatingValue}
                  />
                }
                {
                  userType === 'renter' && <DetailsForGuest
                    userType={userType}
                    firstName={hostData.firstName}
                    hostEmail={hostData.userData.email}
                    guestName={guestData.firstName}
                    profileId={hostData.profileId}
                    picture={hostData.picture}
                    checkIn={data.checkIn}
                    checkOut={data.checkOut}
                    guests={data.guests}
                    title={data.listTitle ? data.listTitle : listData.title}
                    listId={data.listId}
                    basePrice={data.basePrice}
                    delivery={data.delivery}
                    guestServiceFee={data.guestServiceFee}
                    hostServiceFee={data.hostServiceFee}
                    total={data.total}
                    currency={data.currency}
                    cancelData={cancelData}
                    reservationId={data.id}
                    threadId={data.messageData.id}
                    confirmationCode={data.confirmationCode}
                    discount={data.discount ? data.discount : 0}
                    holdeData={data}
                    startTime={data.startTime}
                    endTime={data.endTime}
                    carType={carType}
                    transmission={transmissionLabel}
                    starRatingValue={starRatingValue}
                  />
                }
              </form>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return <NotFound />
    }

  }
}

CancellationPolicy = reduxForm({
  form: 'CancellationForm', // a unique name for this form
  validate,
  onSubmit: submit
})(CancellationPolicy);

export default injectIntl(withStyles(s)(CancellationPolicy));
