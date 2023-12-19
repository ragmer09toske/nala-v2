
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, submit as submitForm, formValueSelector, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingItem.css';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import cs from '../../commonStyle.css'

import CurrencyConverter from '../../CurrencyConverter';
import ListingPhotos from '../ListingPhotos';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

import { formatURL } from '../../../helpers/formatURL';

//Image
import streeingIcon from '/public/SiteIcons/steeringIcon.svg';
import startIcon from '/public/SiteIcons/star.svg';
import arrowIcon from '/public/SiteIcons/rentNowArrow.svg';


class ListingItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    beds: PropTypes.number,
    personCapacity: PropTypes.number,
    carType: PropTypes.string,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  handleMouseOver(value) {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', { 'id': value, 'hover': 'true' });
  }

  handleMouseOut(value) {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', {});
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      basePrice,
      currency,
      title,
      beds,
      personCapacity,
      carType,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating,
      wishListStatus,
      isListOwner,
      transmission,
      personalized
    } = this.props;

    let bedsLabel = 'Trip';
    let guestsLabel = 'guest';
    let heartIcon = 'heartIcon';
    let transmissionLabel;
    if (beds > 1) {
      bedsLabel = 'Trips';
    }

    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    let activeItem = 0, photoTemp, photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }

    transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';
    let personalizeURL = '', startDate, endDate, location;
    startDate = personalized && personalized.startDate ? "?&startdate=" + personalized.startDate : '';
    endDate = personalized && personalized.endDate ? "&enddate=" + personalized.endDate : '';
    personalizeURL = startDate + endDate;

    if (personalized.location && personalized.startDate && personalized.endDate) {
      startDate = personalized && personalized.startDate ? "&startdate=" + personalized.startDate : '';
      location = personalized && personalized.location ? "?&address=" + personalized.location : '';
      personalizeURL = location + startDate + endDate;
    } else if (personalized.location) {
      location = personalized && personalized.location ? "?&address=" + personalized.location : '';
      personalizeURL = location
    }

    return (
      <div className={cx(s.listItemContainer)} onMouseOver={() => this.handleMouseOver(id)} onMouseOut={() => this.handleMouseOut(id)}>
        {
          !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} heartIcon={heartIcon} />
        }

        <ListingPhotos
          id={id}
          coverPhoto={coverPhoto}
          listPhotos={photosList}
          formatURL={formatURL}
          title={title}
          personalizeURL={personalizeURL}
        />


        <div className={s.listInfo}>
          <a className={s.listInfoLink} href={"/cars/" + formatURL(title) + '-' + id + personalizeURL} target={"_blank"}>
            <Row>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoText, s.infoSpace, cs.commonSmallText)}>
                <div className={cx(s.listingInfo, 'floatRightRTL', cs.commonSmallText, s.displayFlex)}>
                  <img src={streeingIcon} className={cx('imgIconRight', s.streeingIcon)} />
                  <span className='carTypeRTL'>{carType}</span>
                  <span className={s.dotCss}></span>
                  <span className={cx('dotRTL', s.textSmall, s.textEllipsis)}>{transmissionLabel}</span>

                </div>

              </Col>
              <div className={cx(s.priceCss, 'priceCssRTL', cs.commonSubTitleText, cs.fontWeightBold)}>
                {
                  bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                }

                <div>{
                  <CurrencyConverter
                    amount={basePrice}
                    from={currency}
                  />
                }
                  {' '}<span className={cx(cs.fontWeightNormal, cs.commonSmallText)}><FormattedMessage {...messages.perNight} /></span>
                </div>
              </div>
              <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.listingTitle, 'directionLtr', 'textAlignRightRTL', cs.commonContentText)}>
                {title}

              </Col>
              <div className={s.HRRight}>
                {starRatingValue > 0 && <div className={cx(s.reviewCss, 'reviewCssSliderRTL')}>
                  <img src={startIcon} className={cx(s.reviewCssImg, 'reviewCssImgRTL')} /> {starRatingValue}
                </div>}
                <a className={s.btn} href={"/cars/" + formatURL(title) + '-' + id + personalizeURL} target={'_blank'}>
                  <FormattedMessage {...messages.rentNowText} />
                  <img src={arrowIcon} className={cx(s.arrowIconCss, 'viewArrowLeft')} />
                </a>
              </div>
              {/* <Col xs={12} sm={12} md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoSpaceTop1)}
              >
                <div className={cx(s.reviewStar, 'small-star-rating')}>
                  <StarRating
                    value={starRatingValue}
                    name={'review'}
                    className={s.displayInline}
                    starColor={COMMON_TEXT_COLOR}
                    emptyStarColor={'#cccccc'}
                  />
                  <span className={s.textInline}>&nbsp; {reviewsCount + ' '}{reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                  </span>
                </div>

              </Col> */}
            </Row>

          </a>
        </div>

      </div>
    );
  }
}

const mapState = (state) => ({
  personalized: state.personalized,
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ListingItem)));
