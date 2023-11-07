import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../../commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import Avatar from '../../Avatar';
import ListCoverPhoto from '../../ListCoverPhoto';

// Helper
import { convert } from '../../../helpers/currencyConvertion';

// Locale
import messages from '../../../locale/messages';
import { formatTime } from '../../../helpers/formatting';
import Link from '../../Link';

//Image
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
import arrowIcon from '/public/SiteIcons/paymentArrow.svg';
import starIcon from '/public/SiteIcons/star.svg';
import Arrow from '/public/siteImages/rightSideArrow.svg';

import { Elements } from 'react-stripe-elements';

class Payment extends Component {

  static propTypes = {
    listId: PropTypes.number.isRequired,
    hostId: PropTypes.string.isRequired,
    guestId: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    hostPicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    listTitle: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    listType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    checkIn: PropTypes.object.isRequired,
    checkOut: PropTypes.object.isRequired,
    guests: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string.isRequired,
    weeklyDiscount: PropTypes.number,
    monthlyDiscount: PropTypes.number,
    listPhotos: PropTypes.array,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired,
      host: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
  };

  render() {
    const { guestEmail, hostDisplayName, hostPicture, coverPhoto, listPhotos, bookingType, policyName, policyContent } = this.props;
    const { listId, listTitle, listType, city, state, country, allowedPersonCapacity, hostProfileId, hostJoined, transmission, settingsData } = this.props;
    const { houseRules, hostId, guestId, securityDeposit } = this.props;
    const { guests, checkIn, checkOut, startTime, endTime } = this.props;
    const { basePrice, delivery, currency, weeklyDiscount, monthlyDiscount } = this.props;
    const { serviceFees, base, rates, specialPricing, bookingData, reviewsCount, reviewsStarRating } = this.props;
    let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0;
    let discount = 0, discountType, total = 0, totalWithoutFees = 0;
    let momentStartDate, momentEndDate, dayDifference, isAverage = 0, totalWithoutServiceFee = 0;
    let currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let isDayTotal = 0, formattedStartTime, formattedEndTime, starRatingValue = 0;

    let carType = settingsData && settingsData.length > 0 && settingsData[0].listsettings.itemName, transmissionLabel;
    transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';

    if (checkIn != null && checkOut != null) {
      momentStartDate = moment(checkIn);
      momentEndDate = moment(checkOut);
      dayDifference = momentEndDate.diff(momentStartDate, 'days');
      // priceForDays = Number(basePrice) * Number(dayDifference);
      dayDifference = dayDifference + 1;

      //New 
      if (dayDifference > 0) {

        let stayedNights = [];
        // Find stayed nights
        for (let i = 0; i < dayDifference; i++) {
          let currentDate = moment(checkIn).add(i, 'day');
          stayedNights.push(currentDate);
        }

        if (stayedNights && stayedNights.length > 0) {
          stayedNights.map((item, key) => {
            let isSpecialPricing;
            if (item) {
              let pricingRow, currentPrice;
              currentDay = (moment(item).format('dddd').toLowerCase());
              // isSpecialPricing = specialPricing.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));
              isSpecialPricing = bookingData && bookingData.listBlockedPrice.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));

              if (isSpecialPricing && isSpecialPricing.isSpecialPrice) {
                isSpecialPriceAssigned = true;
                currentPrice = Number(isSpecialPricing.isSpecialPrice);
              } else {
                currentPrice = Number(basePrice);
              }
              // Price object
              pricingRow = {
                blockedDates: item,
                isSpecialPrice: currentPrice,
              };
              bookingSpecialPricing.push(pricingRow);
            }
          });
        }
      }

      if (isSpecialPriceAssigned) {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
      } else {
        bookingSpecialPricing.map((item, index) => {
          priceForDays = priceForDays + Number(item.isSpecialPrice);
        });
      }
    }

    isAverage = Number(priceForDays) / Number(dayDifference);
    isDayTotal = isAverage.toFixed(2) * dayDifference;
    priceForDays = isDayTotal;

    if (dayDifference >= 7) {
      if (monthlyDiscount > 0 && dayDifference >= 28) {
        discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
        discountType = monthlyDiscount + "% monthly price discount";
      } else {
        if (weeklyDiscount > 0) {
          discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
          discountType = weeklyDiscount + "% weekly price discount";
        }
      }
    }

    totalWithoutServiceFee = (isDayTotal + delivery) - discount;

    if (serviceFees) {
      if (serviceFees.guest.type === 'percentage') {
        guestServiceFee = totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100);
      } else {
        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
      }

      if (serviceFees.host.type === 'percentage') {
        hostServiceFee = totalWithoutServiceFee * (Number(serviceFees.host.value) / 100);
      } else {
        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
      }

    }

    total = (priceForDays + guestServiceFee + delivery + securityDeposit) - discount;
    totalWithoutFees = (priceForDays + delivery) - discount;

    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, MMM D, YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, MMM D, YYYY') : '';

    let initialValues = {
      listId,
      listTitle,
      hostId,
      guestId,
      guests,
      checkIn,
      checkOut,
      basePrice,
      currency,
      delivery,
      discount,
      discountType,
      guestServiceFee,
      hostServiceFee,
      total: totalWithoutFees,
      bookingType,
      paymentType: '2',
      guestEmail,
      isSpecialPriceAssigned,
      bookingSpecialPricing: JSON.stringify(bookingSpecialPricing),
      isSpecialPriceAverage: isAverage.toFixed(2),
      dayDifference,
      startTime,
      endTime,
      securityDeposit
    };

    formattedStartTime = formatTime(startTime);
    formattedEndTime = formatTime(endTime);

    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    return (
      <Grid fluid className={s.container}>
        <Row className={cs.positionRelative}>
          <Col lg={7} md={7} sm={12} xs={12} className={cx(cs.spaceTop7, 'paymentDetailsPadding')}>
            <Elements>
              <PaymentForm
                hostDisplayName={hostDisplayName}
                houseRules={houseRules}
                allowedPersonCapacity={allowedPersonCapacity}
                initialValues={initialValues}
                listId={listId}
                hostPicture={hostPicture}
                hostProfileId={hostProfileId}
                hostJoined={hostJoined}
              />
            </Elements>
          </Col>
          <Col lg={5} md={5} sm={12} xs={12} className={cx(cs.spaceTop7, cs.paymentSticky)}>
            <div className={s.datePanelSection}>
              <div className={cx(cs.positionRelative, cs.spaceBottom3)}>
                <a href={"/cars/" + listId} target={"_blank"}>
                  <ListCoverPhoto
                    className={cx(s.bannerImage, s.backgroundCover)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </a>
                <div className={cx(cs.positionAvatar, 'positionAvatarRTL')}>
                  <Avatar
                    source={hostPicture}
                    title={hostDisplayName}
                    profileId={hostProfileId}
                    className={cx(cs.profileAvatarLink, cs.profileAvatarLinkSmall)}
                    width={44}
                    height={44}
                    withLink
                  />
                </div>
              </div>
              <div className={cx(s.houseRules, cs.spaceTop3)}>
                <img src={steeringIcon} className={'commonIconSpace'} />
                <h6 className={cx(cs.commonSmallText, cs.fontWeightNormal)}>
                  <span>{carType}</span>
                  <span className={cs.dotCss}></span>
                  <span>{transmissionLabel}</span>
                </h6>
              </div>
              {/* <a href={"/cars/" + listId} target={"_blank"} className={cx(cs.spaceTop1, cs.commonContentText, cs.fontWeightBold, cs.siteLinkColor)}>
                {listTitle}
              </a> */}
              <div className={cx(cs.spaceTop1, cs.commonContentText, cs.fontWeightBold)}>
                {listTitle}
              </div>
              {starRatingValue > 0 && <div className={cx(cs.spaceTop1, cs.commonContentText, s.starFlex)}>
                <img src={starIcon} className={'searchHeaderIcon'} /> <span>{starRatingValue}</span>
              </div>}
              <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
              <div className={s.tableFlex}>
                <div>
                  <h4 className={cx(cs.commonSmallText, cs.fontWeightNormal, cs.paddingBottom1)}><FormattedMessage {...messages.checkIn} /></h4>
                  <h5 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.siteLinkColor, cs.paddingBottom1)}>{checkInDate}</h5>
                  {
                    formattedStartTime &&
                    <h6 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.siteLinkColor)}>{formattedStartTime}</h6>
                  }
                </div>
                <img src={arrowIcon} className={cx(s.arrowMargin, 'commonDateArrowRTLRotate')} />
                <div>
                  <h5 className={cx(cs.commonSmallText, cs.fontWeightNormal, cs.paddingBottom1)}><FormattedMessage {...messages.checkOut} /></h5>
                  <h4 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.siteLinkColor, cs.paddingBottom1)}>{checkOutDate}</h4>
                  {
                    formattedEndTime &&
                    <h6 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.siteLinkColor)}> {formattedEndTime}</h6>
                  }
                </div>
              </div>
              <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
              <PaymentDetails
                basePrice={basePrice}
                delivery={delivery}
                securityDeposit={securityDeposit}
                currency={currency}
                dayDifference={dayDifference}
                priceForDays={priceForDays}
                discount={discount}
                discountType={discountType}
                serviceFees={guestServiceFee}
                total={total}
                bookingSpecialPricing={bookingSpecialPricing}
                isSpecialPriceAssigned={isSpecialPriceAssigned}
                isAverage={isAverage}
              />
            </div>
            <div className={cx(s.cancellationSectionPayment, cs.spaceTop4, cs.spaceBottom4)}>
              <p className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3)}>
                <span><FormattedMessage {...messages.cancellationPolicy} /></span>
                :   <a
                  href={"/cancellation-policies/"} className={cs.siteLinkColor}
                  target={'_blank'}
                ><span >{policyName}</span></a>
              </p>
              <p className={cx(cs.commonContentText, cs.paddingBottom2)}>
                {policyContent}
              </p>
              <a
                href={"/cancellation-policies/"}
                target={'_blank'}
                className={cx(cs.commonContentText, cs.siteLinkColor, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}
              >
                <FormattedMessage {...messages.viewDetails} />
                <img src={Arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
              </a>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default injectIntl(withStyles(s, cs)(Payment));