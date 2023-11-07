import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  Form,
  Row, FormGroup,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import cs from '../../../components/commonStyle.css'
// Components
import StarRating from '../../StarRating';
import ListCoverPhoto from '../../ListCoverPhoto';
import Link from '../../Link';
// image
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
// Locale
import messages from '../../../locale/messages';
import Avatar from '../../Avatar/Avatar';
// Helpers
import { formatURL } from '../../../helpers/formatURL';
class ListingDetails extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      coverPhoto: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      }))
    }),
    hostData: PropTypes.shape({
      picture: PropTypes.string.isRequired,
      profileId: PropTypes.number.isRequired
    })
  };

  render() {
    const { data: { id, title, settingsData, transmission }, hostData: { picture, profileId } } = this.props;
    const { data: { coverPhoto, listPhotos, reviewsCount, reviewsStarRating } } = this.props;
    const { formatMessage } = this.props.intl;
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    let carType = settingsData && settingsData.length > 0 && settingsData[0].listsettings.itemName, transmissionLabel;
    transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';
    return (
      <div>
        <div className={s.imgContainer}>
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <a href={"/cars/" + formatURL(title) + '-' + id} target={'_blank'}>
                  <ListCoverPhoto
                    className={cx(s.imageContent)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </a>
                <div className={cx(s.writeListingImg, 'writeListingImgRTL')}>
                  <Avatar
                    source={picture}
                    height={44}
                    width={44}
                    className={cx(cs.profileAvatarLink, cs.profileAvatarLinkSmall)}
                    withLink
                    profileId={profileId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={s.bannerSection}>
            <div className={cx(s.HRDetails, 'HRDetailsRTL')}>
              <div className={cx(s.trip, s.hiddentextSlider, 'hiddentextSliderRTL')}>
                <img src={steeringIcon} className={cx(s.carType, 'carTypeIconRTL')} />
                <span className={cs.displayinlineBlock}>Crossover</span>
                <span className={s.dotCss}></span>
                <span className={cs.displayinlineBlock}>{transmissionLabel}</span>
              </div>
            </div>
            <h3 className={s.titleCss}>
              <a href={"/cars/" + id} target={"_blank"}>{title}</a>
            </h3>
            {starRatingValue > 0 && <div>
              <span><StarRating name={"listRating"} value={starRatingValue} className={cx(s.starReview, 'floatRightRTL')} /></span>
              <span className={s.reviewText}>&nbsp;{starRatingValue} {starRatingValue > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}


export default injectIntl(withStyles(s)(ListingDetails));
