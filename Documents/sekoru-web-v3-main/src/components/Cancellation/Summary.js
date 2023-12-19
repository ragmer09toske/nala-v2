import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';
import bt from '../../components/commonStyle.css'
import arrowIcon from '/public/SiteIcons/paymentArrow.svg';

import Avatar from '../Avatar';

// Locale
import messages from '../../locale/messages';
import moment from 'moment';
import { formatTime } from '../../helpers/formatting';

class Summary extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    userType: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    nights: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    cancelData: PropTypes.shape({
      remainingNights: PropTypes.number,
    }).isRequired,
    profileData: PropTypes.shape({
      profileId: PropTypes.number.isRequired,
      picture: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  };

  static defaultProps = {};

  render() {
    const { userType, guests, nights, interval, checkIn, checkOut, startTime, endTime } = this.props;
    const { profileData: { profileId, picture, firstName, createdAt } } = this.props;
    const { formatMessage } = this.props.intl;

    let checkInDate, checkOutDate, formattedStartTime, formattedEndTime, joinedDate;

    checkInDate = checkIn ? moment(checkIn).format('ddd, MMM D, YYYY ') : '';
    checkOutDate = checkOut ? moment(checkOut).format('ddd, MMM D, YYYY ') : '';

    formattedStartTime = formatTime(startTime);
    formattedEndTime = formatTime(endTime);
    joinedDate = createdAt ? moment(createdAt).format("MMM, YYYY") : '';

    return (
      <div>
        {
          userType === 'renter' &&
          <div className={cx(bt.commonTitleText, bt.spaceBottom4, bt.fontWeightBold)}>
            <FormattedMessage {...messages.cancelYourTrip} />
          </div>
        }

        {
          userType === 'owner' && <div>
            <div className={cx(bt.commonTitleText, bt.spaceBottom4, bt.fontWeightBold)}>
              <FormattedMessage {...messages.cancelYourReservation} />
            </div>
            <div className={cx(bt.commonTotalText, bt.fontWeightBold, bt.spaceBottom2)}>
              <span><FormattedMessage {...messages.consider} />{' '}{firstName}'s{' '}</span>
              <span><FormattedMessage {...messages.tripBeforeCanceling} /></span>
            </div>
            <p className={cx(bt.commonContentText, bt.spaceBottom3)}>
              <FormattedMessage {...messages.cancellingInfo} />
            </p>
          </div>
        }
        <div>
          <div className={s.displayGridDate}>
            <h5 className={cx(bt.commonContentText, bt.fontWeightBold, bt.paddingBottom2)}><FormattedMessage {...messages.checkIn} /></h5>
            <span></span>
            <h5 className={cx(bt.commonContentText, bt.fontWeightBold, bt.paddingBottom2)}><FormattedMessage {...messages.checkOut} /></h5>
          </div>
          <div className={s.displayGridDate}>
            <div>
              <p className={cx(bt.commonMediumText, bt.fontWeightNormal, bt.paddingBottom1)}>{checkInDate}</p>
              <p className={cx(bt.commonMediumText, bt.fontWeightNormal, bt.paddingBottom3)}>{formattedStartTime}</p>
            </div>
            <span className={s.tripArrowIconSec}>
              <img src={arrowIcon} className={cx(s.dateArrowIcon, 'commonDateArrowRTLRotate')} />
            </span>
            <div>
              <p className={cx(bt.commonMediumText, bt.fontWeightNormal, bt.paddingBottom1)}>{checkOutDate}</p>
              <p className={cx(bt.commonMediumText, bt.fontWeightNormal, bt.paddingBottom3)}>{formattedEndTime}</p>
            </div>
          </div>
        </div>
        <div className={s.displayGridDate}>
          <div>
            {
              (interval > 0) ? <>
                <h5 className={cx(bt.commonContentText, bt.fontWeightBold, bt.paddingBottom2)}><FormattedMessage {...messages.startIn} /></h5>
                <p className={cx(bt.commonMediumText, bt.fontWeightNormal)}>{interval} {interval > 1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)}</p>
              </> : <>
                <h5 className={cx(bt.commonContentText, bt.fontWeightBold, bt.paddingBottom2)}><FormattedMessage {...messages.started} /></h5>
                <p className={cx(bt.commonMediumText, bt.fontWeightNormal)}>{interval == 0 ? interval : Math.abs(interval)} {interval > -1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)} ago</p>
              </>
            }
          </div>
          <div></div>
          <div>
            <h5 className={cx(bt.commonContentText, bt.fontWeightBold, bt.paddingBottom2)}><FormattedMessage {...messages.stayingFor} /></h5>
            <p className={cx(bt.commonMediumText, bt.fontWeightNormal)}>{nights} {nights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</p>
          </div>
        </div>
        <div>
          <hr className={s.horizontalLineStyle} />
        </div>
        {/* <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.travelingWith} /></span><br />
            <span>{guests} {guests > 1 ? formatMessage(messages.howManyGuest) : formatMessage(messages.guest)}</span>
          </Col>
        </Row> */}
        {/* <Row className={cx(s.space4,s.spaceTop3)}>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.stayingFor} /></span><br />
            <span>{nights} {nights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span>
          </Col>
        </Row> */}
        <div>
          <h5 className={cx(bt.commonTotalText, bt.spaceBottom10)}><FormattedMessage {...messages.tellMeWhyToCancel} /></h5>
          <div className={cx(bt.dFlex, bt.spaceBottom4)}>
            <div className={bt.dFlex}>
              <Avatar
                source={picture}
                height={80}
                width={80}
                title={firstName}
                className={s.profileAvatar}
                withLink
                linkClassName={cx(s.profileAvatarLink, s.avatarSpaceRight, 'cancelAvatarSpaceLeftRTL')}
                profileId={profileId} />
            </div>
            <div>
              <div className={cx(bt.spaceBottom11, bt.commonSubTitleText, bt.fontWeightBold)}><span>{userType === 'renter' && <FormattedMessage {...messages.hostedBy} />}{' '}</span><a href={'/users/show/' + profileId} className={cx(bt.siteLinkColor, s.firstName)}>{firstName}</a></div>
              {userType === 'renter' && <div className={cx(bt.commonContentText, bt.fontWeightNormal)}><FormattedMessage {...messages.joinedIn} /> {joinedDate}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s, bt)(Summary));