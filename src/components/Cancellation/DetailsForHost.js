import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import {
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';
import bt from '../../components/commonStyle.css'

// Components
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

// Images

import defaultPic from './large_no_image.jpeg';
import { formatTime } from '../../helpers/formatting';
import { cancellationHostData } from '../../helpers/cancellationData';
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
import starIcon from '/public/SiteIcons/star.svg';
import nonRefund from '/public/SiteIcons/nonRefund.svg';
import refund from '/public/SiteIcons/refund.svg';

class DetailsForHost extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string.isRequired,
      accomodation: PropTypes.number.isRequired,
      guestFees: PropTypes.number.isRequired,
      remainingNights: PropTypes.number,
      interval: PropTypes.number.isRequired,
      nights: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      nonPayoutAmount: 0,
      refundDays: 0,
      earnedDays: 0,
      payoutAmount: 0,
      totalNights: 0
    }
  }

  componentDidMount() {
    const { reservationId, firstName, guestEmail, checkIn, checkOut, guests, title, hostName } = this.props;
    const { basePrice, delivery, guestServiceFee, hostServiceFee, total, currency, threadId, confirmationCode, initialize, discount } = this.props;
    const { cancelData: { policyName, accomodation, guestFees, remainingNights, interval, nights, priorDays } } = this.props;
    const { holdeData, startTime, endTime, serviceFees, base, rates } = this.props;

    let refundAmount = 0, nonPayoutAmount = 0, refundDays = 0, payoutAmount = 0, earnedDays = 0, subtotal = 0, updatedGuestFee = 0, updatedHostFee = 0, totalNights = 0;
    let isCleaingPrice = 0, formattedStartTime, formattedEndTime;
    let bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let priceForDays = 0, cancellationHostObj = {};

    if (delivery) {
      isCleaingPrice = delivery;
    } else {
      isCleaingPrice = 0;
    }


    if (startTime && endTime) {
      formattedStartTime = formatTime(startTime);
      formattedEndTime = formatTime(endTime);
    }

    holdeData.bookingSpecialPricing && holdeData.bookingSpecialPricing.map((item, key) => {
      let pricingRow, currentPrice;
      if (item.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item.isSpecialPrice);
      } else {
        currentPrice = Number(basePrice);
      }
      pricingRow = {
        blockedDates: item,
        isSpecialPrice: currentPrice,
      };
      bookingSpecialPricing.push(pricingRow);
    })

    if (isSpecialPriceAssigned) {
      bookingSpecialPricing.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item.isSpecialPrice);
      });
    } else {
      priceForDays = Number(basePrice) * Number(nights)
    }

    cancellationHostObj = cancellationHostData({
      remainingNights,
      nights,
      priceForDays,
      accomodation,
      guestServiceFee,
      guestFees,
      hostServiceFee,
      basePrice,
      total,
      policyName,
      interval,
      serviceFees,
      priorDays,
      isCleaingPrice,
      base,
      rates,
      currency,
      discount
    });

    refundAmount = cancellationHostObj.refundAmount;
    nonPayoutAmount = cancellationHostObj.nonPayoutAmount;
    payoutAmount = cancellationHostObj.payoutAmount;
    earnedDays = cancellationHostObj.earnedDays;
    refundDays = cancellationHostObj.refundDays;
    updatedHostFee = cancellationHostObj.updatedHostFee;
    updatedGuestFee = cancellationHostObj.updatedGuestFee;
    subtotal = total + guestServiceFee;

    let cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundAmount,
      payoutToHost: payoutAmount,
      guestServiceFee: updatedGuestFee,
      hostServiceFee: updatedHostFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'owner',
      checkIn,
      checkOut,
      guests,
      hostName,
      guestName: firstName,
      listTitle: title,
      confirmationCode,
      guestEmail,
      startTime,
      endTime
    };
    totalNights = nights - refundDays;
    initialize('CancellationForm', cancellationData, true);
    this.setState({ nonPayoutAmount, earnedDays, refundDays, payoutAmount, totalNights })
  }

  render() {
    const { firstName, title, listId, picture, profileId, hostName, carType, transmission, starRatingValue, } = this.props;
    const { cancelData: { policyName, policyContent }, holdeData, basePrice, currency } = this.props;
    const { nonPayoutAmount, earnedDays, refundDays, payoutAmount, totalNights } = this.state;
    const { formatMessage } = this.props.intl;

    let coverImage = holdeData && holdeData.listData && holdeData.listData.listPhotos.find(o => o.id == holdeData.listData.coverPhoto);
    let path = '/images/upload/x_medium_', showImage;

    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && holdeData.listData && holdeData.listData.listPhotos.length > 0) {
      showImage = path + (holdeData.listData && holdeData.listData.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }

    return (
      <div>
        <Col xs={12} sm={5} md={5} lg={5}>
          <div className={cx(s.cancelRightCol, bt.commonBorderSection, bt.spaceBottom3)}>
            <div className={cx(s.bgCover, bt.spaceBottom3)}>
              <a href={"/cars/" + listId} target="_blank">
                <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}></div>
              </a>
              <div className={cx(s.profileAvatarSection, 'cancelTripAvatarSecRTL')}>
                <Avatar
                  source={picture}
                  height={44}
                  width={44}
                  title={hostName}
                  className={cx(s.profileAvatar, bt.profileAvatarLinkSmall)}
                  withLink
                  linkClassName={cx(s.profileAvatarLink, s.profileLinkPadding)}
                  profileId={profileId}
                />
              </div>
            </div>

            <div className={cx(s.carTypeTextSec, bt.dFlex, bt.commonSmallText, bt.fontWeightNormal)}>
              <img src={steeringIcon} className={cx(s.steeringIcon, 'steeringIconRTL')} />
              <span className={cx(s.carType, 'carTypeRTL')}>{carType}</span>
              <span className={cx(bt.dotCss, s.dotStyle)}></span>
              <span className={cx(s.textTruncate, 'carTypeRTL')}>{transmission}</span>
            </div>

            <div className={cx(s.textTruncate, s.listingTitleSec)}>
              <a className={cx(s.listingTitle, bt.commonContentText, bt.fontWeightBold)} href={"/cars/" + listId} target="_blank">
                {title}
              </a>
            </div>
            {starRatingValue > 0 && <div className={bt.dFlex}>
              <img src={starIcon} className={cx(s.starIcon, 'cancelTripStarIconRTL')} />
              <span className={cx(bt.commonContentText, bt.fontWeightNormal)}>{starRatingValue}</span>
            </div>}
          </div>
          <div>
            <div className={cx(s.cancelPayDetails, bt.spaceBottom3, { [s.hostFundSec]: payoutAmount <= 0 }, { [s.guestFundSec]: payoutAmount > 0 })}>
              {
                payoutAmount > 0 && <div>
                  <div className={cx(bt.dFlex, bt.spaceBottom9)}>
                    <div className={cx(s.leftSecWidth, s.textLeft, bt.dFlex, 'textAlignRightRTL')}>
                      <img src={refund} className={cx(s.missedEarningsIcon, 'missedEarningsIconRTL')} />
                      <span className={cx(bt.commonContentText, bt.fontWeightBold)}><FormattedMessage {...messages.earningsLabel} /></span>
                    </div>
                    <div className={cx(s.rightSecWidth, s.textRight, 'textAlignLeftRTL')}>
                      <span className={cx(bt.commonContentText, bt.fontWeightBold)}>
                        <CurrencyConverter
                          amount={payoutAmount}
                          from={currency} />
                      </span>
                    </div>
                  </div>
                  <div className={cx(bt.commonSmallText, bt.fontWeightNormal, { [bt.spaceBottom8]: nonPayoutAmount > 0 })}>
                    <span>
                      <CurrencyConverter
                        amount={basePrice}
                        from={currency}
                      />
                    </span>
                    <span> x {totalNights} {totalNights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span><br />
                  </div>
                </div>
              }
              {
                (nonPayoutAmount > 0 && payoutAmount > 0) &&
                <>
                  <hr className={s.lineBg} />
                </>
              }
              {
                refundDays > 0 && nonPayoutAmount > 0 &&
                <div>
                  <div className={cx(bt.dFlex, bt.spaceBottom9)}>
                    <div className={cx(s.leftSecWidth, s.textLeft, bt.dFlex, 'textAlignRightRTL')}>
                      <img src={nonRefund} className={cx(s.missedEarningsIcon, 'missedEarningsIconRTL')} />
                      <span className={cx(bt.commonContentText, bt.fontWeightBold)}><FormattedMessage {...messages.missedEarnings} /></span>
                    </div>
                    <div className={cx(s.rightSecWidth, s.textRight, 'textAlignLeftRTL')}>
                      <span className={cx(bt.commonContentText, bt.fontWeightBold, s.strikeOutLine)}>
                        <CurrencyConverter
                          amount={nonPayoutAmount}
                          from={currency} />
                      </span>
                    </div>
                  </div>
                  <div className={cx(bt.commonSmallText, bt.fontWeightNormal, bt.spaceBottom8)}>
                    <span>
                      <CurrencyConverter
                        amount={basePrice}
                        from={currency}
                      />
                    </span>
                    <span> x {refundDays} {refundDays > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span><br />
                  </div>
                </div>
              }
              {nonPayoutAmount > 0 &&
                <div className={cx(s.spaceTop2)}>
                  <p className={cx(bt.commonSmallText, bt.fontWeightNormal)}>
                    <span>{firstName}{' '}
                      <FormattedMessage {...messages.willBeRefund} />{' '}{earnedDays > 0 ? '' : 'full'}{' '}
                      <FormattedMessage {...messages.reservationCost} />
                    </span>
                  </p>
                </div>
              }
            </div>
            <div className={cx(s.cancellationPolicySec, bt.spaceBottom5)}>
              <div className={cx(bt.commonContentText, bt.fontWeightBold, bt.spaceBottom1)}>
                <span><FormattedMessage {...messages.cancellationPolicy} />:{' '}</span>
                <span><a href={'/cancellation-policies/' + policyName} target="_blank" className={bt.siteLinkColor}> {policyName}</a></span>
              </div>
              <div className={cx(bt.commonMediumText, bt.fontWeightNormal, s.cancelPolicyContent)}>
                {policyContent}
              </div>
            </div>
          </div>
        </Col >
      </div >
    );
  }
}

const mapState = (state) => ({
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
});

const mapDispatch = {
  initialize
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(DetailsForHost)));
