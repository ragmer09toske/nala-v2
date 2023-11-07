import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../commonStyle.css';

// Components
import Avatar from '../Avatar';
import ListCoverPhoto from '../ListCoverPhoto';
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';

// Locale
import messages from '../../locale/messages';
import starIcon from '/public/SiteIcons/star.svg';
import { formatTime } from '../../helpers/formatting';

//Image
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
import arrowIcon from '/public/SiteIcons/paymentArrow.svg';
import Arrow from '/public/siteImages/rightSideArrow.svg';

class Payment extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      formatMessage: PropTypes.any,
      hostData: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      }),
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array.isRequired,
        settingsData: PropTypes.arrayOf(PropTypes.shape({
          listsettings: PropTypes.shape({
            itemName: PropTypes.string.isRequired
          })
        })),
        houseRules: PropTypes.array,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            policyName: PropTypes.string.isRequired
          })
        })
      }),

    }),
  };

  render() {
    const { data: { hostData: { firstName, picture, profileId, createdAt } }, data } = this.props;
    const { data: { listData: { title, city, state, country, personCapacity, listingData } } } = this.props;
    const { data: { id, checkIn, checkOut, guests, message, licenseNumber, lastName, countryCode, dateOfBirth, listId, startTime, endTime } } = this.props;
    const { data: { listData: { coverPhoto, listPhotos, settingsData, houseRules, transmission, reviewsCount, reviewsStarRating } } } = this.props;
    const { data: { total, basePrice, delivery, guestServiceFee, discountType, discount, currency, securityDeposit } } = this.props;

    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, MMM D, YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, MMM D, YYYY') : '';
    let amount = total + guestServiceFee + securityDeposit;
    let dateOfBirthObj, transmissionLabel, formattedStartTime, formattedEndTime, starRatingValue = 0;
    transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';;

    if (dateOfBirth != null) {
      let dateOfBirthArray = dateOfBirth.split("-");
      dateOfBirthObj = {
        "month": Number(dateOfBirthArray[0] - 1),
        "day": dateOfBirthArray[1],
        "year": dateOfBirthArray[2],
      };
    }

    let initialValues = {
      reservationId: id,
      amount,
      currency,
      message,
      guests,
      title,
      licenseNumber,
      firstName: data.firstName,
      lastName,
      country: countryCode,
      ...dateOfBirthObj
    };

    formattedStartTime = formatTime(startTime);
    formattedEndTime = formatTime(endTime);

    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    return (
      <Grid>
        <Row>
          <Col md={7} className={s.paymentDetailsPadding}>
            <PaymentForm
              hostName={firstName}
              houseRules={houseRules}
              allowedGuests={personCapacity}
              initialValues={initialValues}
              hostPicture={picture}
              hostProfileId={profileId}
              hostJoined={createdAt}
              disabled={true}
              listId={listId}
            />
          </Col>
          <Col md={5}>
            <div className={cx(s.summaryCard, s.colCenter)}>
              <div className={s.positionRelative}>
                <a href={"/cars/" + listId} target={"_blank"} >
                  <ListCoverPhoto
                    className={cx(s.bannerImage, s.backgroundCover)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </a>
                <div className={cx(s.profileAvatarSection, 'profileAvatarSectionPayRTL')}>
                  <Avatar
                    source={picture}
                    title={firstName}
                    profileId={profileId}
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
                  <span>{settingsData[0]?.listsettings?.itemName}</span>
                  <span className={cs.dotCss}></span>
                  <span>{transmissionLabel}</span>
                </h6>
              </div>
              <div className={cx(cs.spaceTop1, cs.commonContentText, cs.fontWeightBold)}>
                {title}
              </div>
              {starRatingValue > 0 && <div className={cx(cs.spaceTop1, cs.commonContentText, s.starFlex)}>
                <img src={starIcon} className={'searchHeaderIcon'} /> <span>{starRatingValue}</span>
              </div>}
              <div className={s.spaceTop2}>
                <hr className={s.horizondalLine} />
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
                <hr className={s.horizondalLine} />
              </div>
              <PaymentDetails
                checkIn={checkIn}
                checkOut={checkOut}
                total={total}
                basePrice={basePrice}
                delivery={delivery}
                discount={discount}
                discountType={discountType}
                serviceFee={guestServiceFee}
                currency={currency}
                securityDeposit={securityDeposit}
                bookingSpecialPricing={data?.bookingSpecialPricing}
              />
            </div>
            {
              listingData && listingData.cancellation && <div className={cx(s.cancellationSectionPayment, cs.spaceTop4, cs.spaceBottom4)}>
                <p className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3)}>
                  <span><FormattedMessage {...messages.cancellationPolicy} /></span>
                  :   <a
                    href={"/cancellation-policies/"} className={cs.siteLinkColor}
                    target={'_blank'}
                  ><span >{listingData.cancellation.policyName}</span></a>
                </p>
                <p className={cx(cs.commonContentText, cs.paddingBottom2)}>
                  {listingData.cancellation.policyContent}
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
            }
          </Col>

        </Row>
      </Grid>

    );
  }
}

export default injectIntl(withStyles(s)(Payment));
