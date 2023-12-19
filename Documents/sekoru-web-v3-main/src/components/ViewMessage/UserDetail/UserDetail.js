import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cs from '../../commonStyle.css'
// Component
import Avatar from '../../Avatar';
import Link from '../../Link';
// Locale
import messages from '../../../locale/messages';
import verificationIcon from '/public/SiteIcons/g648.svg'
import reviewsIcon from '/public/SiteIcons/user-details-star.svg'

class UserDetail extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    location: PropTypes.string,
    reviewsCount: PropTypes.number,
    verifications: PropTypes.shape({
      isEmailConfirmed: PropTypes.bool,
      isFacebookConnected: PropTypes.bool,
      isGoogleConnected: PropTypes.bool,
    }),
  };

  static defaultProps = {
    picture: null,
    displayName: '',
    location: '',
  };

  render() {
    const { profileId, picture, displayName, location, verifications, reviewsCount } = this.props;
    const { formatMessage } = this.props.intl;
    let totalVerification = 0;
    if (verifications) {
      if (verifications.isEmailConfirmed) { totalVerification += 1; }
      // if (verifications.isFacebookConnected) { totalVerification += 1; }
      if (verifications.isGoogleConnected) { totalVerification += 1; }
      if (verifications.isIdVerification) { totalVerification += 1; }
    }
    return (
      <div className="">
        <hr class={s.horizondalLine} />
        <div className={cx(s.messageMainContainer)}>
          <div className={s.messageAvatar}>
            <Avatar
              source={picture}
              title={displayName}
              className={s.profileAvatar}
              withLink
              linkClassName={s.userDetailsImgContainer}
              profileId={profileId}
            />
          </div>
          <div className={cx(s.userDetailsInfo, s.userDetailsMarginLeft, 'userDetailsMarginLeftRTL')}>
            <div className={cx()}>
              <span className={cx(s.ownedByText)}>
                <FormattedMessage {...messages.hostedBy} />{" "}
              </span>
              <a href={"/users/show/" + profileId} target={'_blank'} className={cx(s.userDetailsName)}>{displayName}</a>
            </div>
            <div className={cx(s.marginTop7, s.verificationFlexContainer, s.verificationBotAlignment)}>
              {/* <span>{location}</span> */}
              <span className={cx(s.verificationFlexBox)}>
                <img src={verificationIcon} className={cx()} alt="verified Icon" />
                <span className={cx(s.marginLeft, s.verificationText, 'marginLeftRTL')}>{totalVerification} {totalVerification > 1 ? formatMessage(messages.verifications) : formatMessage(messages.verification)}</span>
              </span>
              {/* <span>&nbsp;/&nbsp;</span> */}
              <span className={cx(s.dotCss)}></span>
              <span className={cx(s.verificationFlexBox, s.marginTop6Mobile)}>
                <img src={reviewsIcon} className={cx(s.verificationStarIcon)} alt="reviews Icon" />
                <span className={cx(s.marginLeft, s.verificationText, 'marginLeftRTL')}>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, cs)(UserDetail));

