import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

// Internal Component
import DayDragCalendar from '../../components/DayDragCalendar';
import FooterButton from './FooterButton';

import updateStep3 from './updateStep3';
// Locale
import messages from '../../locale/messages';
import Logo from '../Logo';

//Image
import defaultPic from './large_no_image.jpeg';
import locationIcon from '/public/SiteIcons/locationIdea.svg';
class Calendar extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
    disabledDates: [],
    blockedDates: [],
    availableDatesPrices: [],
    availableDates: []
  };

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      isSaving: false,
      isBlocking: false,
    };
  }

  componentDidMount() {
    const { listBlockedPrice } = this.props;
    let sources = [];
    let sourceObject = {};
    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listBlockedPrice } = nextProps;
    let sources = [];
    let sourceObject = {};
    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });
  }

  setStateLoading = variable => this.setState(variable);

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, nextPage, previousPage } = this.props;
    const { disabledDates, blockedDates, listId, listingSteps: { step3 } } = this.props;
    const { minDay, maxday, houseRules, checkInEnd, checkInStart } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime } = this.props;
    const { availableDates, availableDatesPrices, baseCurrency, currency, availableCurrencies, formPage, step } = this.props;
    const { basePrice, delivery, weeklyDiscount, monthlyDiscount, stepTwoDetails } = this.props;
    const { sources, isSaving, isBlocking } = this.state;
    let isAdminCurrency;
    isAdminCurrency = availableCurrencies && availableCurrencies.find(o => o.isBaseCurrency == true)
    let title = stepTwoDetails && stepTwoDetails.title;
    let description = stepTwoDetails && stepTwoDetails.description;
    let coverPhoto = stepTwoDetails && stepTwoDetails.coverPhoto;
    let coverImage = stepTwoDetails && stepTwoDetails.listPhotos.find(o => o.id == coverPhoto);
    let path = '/images/upload/x_medium_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos.length > 0) {
      showImage = path + (stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }

    return (
      <div className={cx(s.landingContainer, s.fullWidthCalendar)}>
        <div className={s.landingContent}>
          <div>
            {step3 == 'completed' && <div className={s.stepLogo}><Logo link={"/"} className={cx(s.brand, s.brandImg)} /></div>}
            <h3 className={cx(cs.commonTitleText, cs.fontWeightBold, cs.spaceBottom4)}><FormattedMessage {...messages.calendar} /></h3>
            <div className={s.lableWeight}>
              <p className={cx(s.bookedWidth, 'bookedWidthRTL')}><span className={cx(s.notAvailableColor, 'ColorRTL')}></span><FormattedMessage {...messages.booked} /></p>
              <p className={cx(s.calenderColorText, 'calenderColorTextRTL')}><span className={cx(s.bookedColor, 'ColorRTL')}></span><FormattedMessage {...messages.notAvailable} /></p>
              <p className={cx(s.calenderColorText, 'calenderColorTextRTL')}><span className={cx(s.availableColor, 'ColorRTL')}></span><FormattedMessage {...messages.Availablee} /></p>
              <p className={cx(s.calenderColorText, 'calenderColorTextRTL')}><span className={cx(s.specialColor, 'ColorRTL')}></span><FormattedMessage {...messages.makeDateAvailable} /></p>
            </div>
            <div className={cx(s.searchToolTip, cs.spaceTop3, cs.spaceBottom5)}>
              <img src={locationIcon} className={'listTipIcon'} />
              <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.calendarTripText} /></span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <FormGroup className={cx(s.formGroup, s.posRelative)}>
                  <div className={'stepCalendar'}>
                    <DayDragCalendar
                      formName={"ListPlaceStep3"}
                      disabledDates={disabledDates}
                      blockedDates={blockedDates}
                      listId={listId}
                      availableDates={availableDates}
                      availableDatesPrices={availableDatesPrices}
                      sources={sources}
                      minDay={minDay}
                      maxday={maxday}
                      houseRules={houseRules}
                      checkInEnd={checkInEnd}
                      checkInStart={checkInStart}
                      cancellationPolicy={cancellationPolicy}
                      maxDaysNotice={maxDaysNotice}
                      bookingNoticeTime={bookingNoticeTime}
                      baseCurrency={baseCurrency}
                      currency={currency}
                      isAdminCurrency={isAdminCurrency}
                      basePrice={basePrice}
                      delivery={delivery}
                      weeklyDiscount={weeklyDiscount}
                      monthlyDiscount={monthlyDiscount}
                      todayLabel={formatMessage(messages.toDay)}
                      setStateLoading={this.setStateLoading}
                      isSaving={isSaving}
                      isBlocking={isBlocking}
                    />
                  </div>
                </FormGroup>
              </div>
              <FooterButton
                isSaving={isSaving}
                isBlocking={isBlocking}
                isDisabled={error}
                nextPage={nextPage}
                previousPage={previousPage}
                nextPagePath={"booking-scenarios"}
                previousPagePath={"min-max-days"}
                formPage={formPage}
                step={step}
                footerClass={s.footerFullWidth}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Calendar = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Calendar);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  disabledDates: selector(state, 'disabledDates'),
  blockedDates: selector(state, 'blockedDates'),
  listBlockedPrice: selector(state, 'listBlockedPrice'),
  minDay: selector(state, 'minDay'),
  maxday: selector(state, 'maxday'),
  houseRules: selector(state, 'carRules'),
  checkInStart: selector(state, 'checkInStart'),
  checkInEnd: selector(state, 'checkInEnd'),
  bookingNoticeTime: selector(state, 'bookingNoticeTime'),
  maxDaysNotice: selector(state, 'maxDaysNotice'),
  cancellationPolicy: selector(state, 'cancellationPolicy'),
  availableDates: selector(state, 'availableDates'),
  availableDatesPrices: selector(state, 'availableDatesPrices'),
  currency: selector(state, 'currency'),
  availableCurrencies: state.currency.availableCurrencies,
  basePrice: selector(state, 'basePrice'),
  delivery: selector(state, 'delivery'),
  weeklyDiscount: selector(state, 'weeklyDiscount'),
  monthlyDiscount: selector(state, 'monthlyDiscount'),
  stepTwoDetails: state.calendar.stepTwoDetails,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Calendar)));
