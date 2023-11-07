
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import s from '../../Home/HomeSlider/HomeSlider.css';
import cs from '../../../components/commonStyle.css';
import steeringIcon from '../../../../public/SiteIcons/steeringIcon.svg';
import startIcon from '../../../../public/SiteIcons/star.svg'
import arrowIcon from '../../../../public/SiteIcons/rentNowArrow.svg';

import CurrencyConverter from '../../CurrencyConverter';


// Locale
import messages from '../../../locale/messages';
import { formatURL } from '../../../helpers/formatURL';

//Components
import WishListIcon from '../../../components/WishListIcon';
import ListCoverPhoto from '../../ListCoverPhoto/ListCoverPhoto';


class ListingItem extends React.Component {

  render() {
    const { data, intl: { locale }, arrow, similarClassName, similiarListPadding, fromPage, isEditWishList } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <>
        {
          data && data.length > 0 && data.map((item, index) => {
            let carType = item.settingsData && item.settingsData[0] && item.settingsData[0].listsettings && item.settingsData[0].listsettings.itemName, transmissionLabel;
            let transmission = item.transmission;
            let isListOwner = item.isListOwner
            transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';
            let starRatingValue = 0;
            if (item.reviewsCount > 0 && item.reviewsStarRating > 0) {
              starRatingValue = Math.round(item.reviewsStarRating / item.reviewsCount)
            }
            if (item.listPhotos.length > 0) {
              return (
                <div className={cx(s.background, s.positionRelative, similiarListPadding)}>
                  {
                    !isListOwner && <WishListIcon listId={item.id} key={item.id} isChecked={item.wishListStatus} isEditWishList={isEditWishList} />
                  }
                  <a href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'} className={cs.textDecorationNone}>
                    <div className={s.boxShadow}>
                      <ListCoverPhoto
                        className={s.HRCar}
                        listPhotos={item.listPhotos}
                        coverPhoto={item.coverPhoto}
                        photoType={"x_medium"}
                        bgImage
                      />
                      <div className={s.PerDayWrap}>

                      </div>
                      <div className={s.sliderbackground}>
                        <div className={cx(s.HRDetails, 'HRDetailsRTL')}>
                          <div className={cx(s.trip, s.hiddentextSlider, 'hiddentextSliderRTL')}>
                            <img src={steeringIcon} className={cx(s.carType, 'carTypeIconRTL')} />
                            <span className='carTypeRTL'>{carType}</span>
                            <span className={s.dotCss}></span>
                            <span className={s.textFlow}>{transmissionLabel}</span>
                          </div>
                        </div>
                        <div className={cx(s.PerDay)}>
                          {
                            item.bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                          }
                          <CurrencyConverter
                            amount={item.listingData.basePrice}
                            from={item.listingData.currency}
                          />
                          <span className={cx(s.perNightCss, 'PerDayRTL')}>{' '}{formatMessage(messages.perNight)}</span>
                        </div>
                        <h3 className={s.titleCss}>{item.title}</h3>
                        <div className={s.HRRight}>
                          {starRatingValue > 0 && <div className={cx(s.reviewCss, 'reviewCssSliderRTL')}>
                            <img src={startIcon} className={cx(s.reviewCssImg, 'reviewCssImgRTL')} /><span>{starRatingValue}</span>
                          </div>}
                          <a className={cx(s.btn, cs.textDecorationNone)} href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'}>
                            <span className={cs.vtrMiddle}><FormattedMessage {...messages.rentNowText} /></span>
                            <img src={arrowIcon} className={cx(s.arrowIconCss, 'sliderArrowRTL')} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              )
            }
          })
        }
      </>
    );
  }
}

export default injectIntl(withStyles(s, cs)(ListingItem));