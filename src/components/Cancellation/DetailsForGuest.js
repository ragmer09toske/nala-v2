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
import cs from '../../components/commonStyle.css'
// Components
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
// Locale
import messages from '../../locale/messages';
// Images
import defaultPic from './large_no_image.jpeg';
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
import starIcon from '/public/SiteIcons/star.svg';
import nonRefund from '/public/SiteIcons/nonRefund.svg';
import refund from '/public/SiteIcons/refund.svg';
import { formatTime } from '../../helpers/formatting';
import { cancellationGuestData } from '../../helpers/cancellationData';
class DetailsForGuest extends React.Component {

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
    hostEmail: PropTypes.string.isRequired,
    guestName: PropTypes.string.isRequired,
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
    }).isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      nonRefundableNightPrice: 0,
      refundableNightPrice: 0
    }
  }

  componentDidMount() {
    const { reservationId, firstName, hostEmail, checkIn, checkOut, guests, title, guestName } = this.props;
    const { basePrice, delivery, guestServiceFee, hostServiceFee, total, currency, threadId, confirmationCode } = this.props;
    const { cancelData: { policyName, accomodation, guestFees, remainingNights, interval, nights, priorDays }, initialize } = this.props;
    const { discount, holdeData, startTime, endTime, serviceFees, base, rates } = this.props;


    let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0, cancellationData = {};
    let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, subtotal = 0;
    let formattedStartTime, formattedEndTime;
    let bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let priceForDays = 0, cancellationGuestObj = {};


    if (startTime && endTime) {
      formattedStartTime = formatTime(startTime);
      formattedEndTime = formatTime(endTime);
    }

    let isCleaingPrice = 0
    if (delivery) {
      isCleaingPrice = delivery;
    } else {
      isCleaingPrice = 0;
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

    cancellationGuestObj = cancellationGuestData({remainingNights,
      nights,
      priceForDays,
      accomodation,
      isCleaingPrice,
      guestServiceFee,
      guestFees,
      discount,
      hostServiceFee,
      basePrice,
      total,
      policyName,
      interval,
      priorDays,
      serviceFees,
      base,
      rates,
      currency});

    refundableNightPrice = cancellationGuestObj.refundableNightPrice;
    nonRefundableNightPrice = cancellationGuestObj.nonRefundableNightPrice;
    payoutToHost = cancellationGuestObj.payoutToHost;
    updatedHostFee = cancellationGuestObj.updatedHostFee;
    updatedGuestFee = cancellationGuestObj.updatedGuestFee;
    subtotal = total + guestServiceFee;

    cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundableNightPrice,
      payoutToHost: payoutToHost,
      guestServiceFee:updatedGuestFee,
      hostServiceFee:updatedHostFee ,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'renter',
      checkIn,
      checkOut,
      guests,
      guestName,
      hostName: firstName,
      listTitle: title,
      confirmationCode,
      hostEmail,
      startTime,
      endTime
    };

    initialize('CancellationForm', cancellationData, true);
    this.setState({ nonRefundableNightPrice, refundableNightPrice, })
  }

  render() {
    const { firstName, title, listId, picture, profileId, carType, transmission, starRatingValue } = this.props;
    const { currency } = this.props;
    const { cancelData: { policyName, policyContent }, holdeData } = this.props;
    const { nonRefundableNightPrice, refundableNightPrice } = this.state;
    let coverImage = holdeData && holdeData.listData && holdeData.listData.listPhotos.find(o => o.id == holdeData.listData.coverPhoto),
      path = '/images/upload/x_medium_', showImage;

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
          <div className={cx(s.cancelRightCol, cs.commonBorderSection, cs.spaceBottom3)}>
            <div className={cx(s.bgCover, cs.spaceBottom3)}>
              <a href={"/cars/" + listId} target="_blank">
                <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}>
                </div>
              </a>
              <div className={cx(s.profileAvatarSection, 'cancelTripAvatarSecRTL')}>
                <Avatar
                  source={picture}
                  height={44}
                  width={44}
                  title={firstName}
                  className={cx(s.profileAvatar, cs.profileAvatarLinkSmall)}
                  withLink
                  linkClassName={cx(s.profileAvatarLink, s.profileLinkPadding)}
                  profileId={profileId}
                />
              </div>
            </div>
            <div className={cx(s.carTypeTextSec, cs.dFlex, cs.commonSmallText, cs.fontWeightNormal)}>
              <img src={steeringIcon} className={cx(s.steeringIcon, 'steeringIconRTL')} />
              <span className={cx(s.carType, 'carTypeRTL')}>{carType}</span>
              <span className={cx(cs.dotCss, s.dotStyle)}></span>
              <span className={cx(s.textTruncate, 'carTypeRTL')}>{transmission}</span>
            </div>
            <div className={cx(s.textTruncate, s.listingTitleSec)}>
              <a className={cx(s.listingTitle, cs.commonContentText, cs.fontWeightBold)} href={"/cars/" + listId} target="_blank">
                {title}
              </a>
            </div>
            {starRatingValue > 0 && <div className={cs.dFlex}>
              <img src={starIcon} className={cx(s.starIcon, 'cancelTripStarIconRTL')} />
              <span className={cx(cs.commonContentText, cs.fontWeightNormal)}>{starRatingValue}</span>
            </div>}
          </div>
          <div>
            <div className={cx(s.cancelPayDetails, cs.spaceBottom3, { [s.hostFundSec]: refundableNightPrice <= 0 }, { [s.guestFundSec]: refundableNightPrice > 0 })}>
              {
                
                nonRefundableNightPrice > 0 &&
                <>
                <div className={cx(cs.dFlex, cs.spaceBottom9)}>
                  <div className={cx(s.leftSecWidth, s.textLeft, cs.dFlex, 'textAlignRightRTL')}>
                    <img src={nonRefund} className={cx(s.missedEarningsIcon, 'missedEarningsIconRTL')} />
                    <span className={cx(cs.commonContentText, cs.fontWeightBold)}>
                      <FormattedMessage {...messages.nonRefundable} />
                    </span>
                  </div>
                  <div className={cx(s.rightSecWidth, s.textRight, 'textAlignLeftRTL')}>
                    <span className={cx(cs.commonContentText, cs.fontWeightBold, s.strikeOutLine)}>
                      <CurrencyConverter
                        amount={nonRefundableNightPrice}
                        from={currency}
                      />
                    </span>
                  </div>
                </div>
              { refundableNightPrice == 0 && <p className={cx(cs.commonSmallText, cs.fontWeightNormal)}>
                    <FormattedMessage {...messages.payoutCost} />
                  </p>}
                </>
              }
              {
                (nonRefundableNightPrice > 0) && (refundableNightPrice > 0) &&
                <>
                  <hr className={s.lineBg} />
                </>
              }
              {
                refundableNightPrice > 0 &&
                <>
                  <div className={cx(cs.dFlex, cs.spaceBottom9)}>
                    <div className={cx(s.leftSecWidth, s.textLeft, cs.dFlex, 'textAlignRightRTL')}>
                      <img src={refund} className={cx(s.missedEarningsIcon, 'missedEarningsIconRTL')} />
                      <span className={cx(cs.commonContentText, cs.fontWeightBold)}>
                        <FormattedMessage {...messages.refundable} />
                      </span>
                    </div>
                    <div className={cx(s.rightSecWidth, s.textRight, 'textAlignLeftRTL')}>
                      <span className={cx(cs.commonContentText, cs.fontWeightBold)}>
                        <CurrencyConverter
                          amount={refundableNightPrice}
                          from={currency}
                        />
                      </span>
                    </div>
                  </div>
                  <p className={cx(cs.commonSmallText, cs.fontWeightNormal)}>
                    <FormattedMessage {...messages.refundCost} />
                  </p>
                </>
              }
            </div>
            <div className={cx(s.cancellationPolicySec, cs.spaceBottom5)}>
              <div className={cx(cs.commonContentText, cs.fontWeightBold, cs.spaceBottom1)}>
                <span><FormattedMessage {...messages.cancellationPolicy} />:{' '}</span>
                <span><a href={'/cancellation-policies/' + policyName} target="_blank" className={cs.siteLinkColor}>{policyName}</a></span>
              </div>
              <div className={cx(cs.commonMediumText, cs.fontWeightNormal, s.cancelPolicyContent)}>
                {policyContent}
              </div>
            </div>
          </div>
        </Col>
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

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(DetailsForGuest)));
