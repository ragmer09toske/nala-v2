import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, Collapse } from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// External Component
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostDetail.css';
import cs from '../../../components/commonStyle.css';
import c from '../../../components/ViewListing/common.css';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';


// Component
import Avatar from '../../Avatar';
import ContactHost from '../ContactHost';
import Link from '../../Link';

// Redux Action
import { contactHostOpen } from '../../../actions/message/contactHostModal';

//Images
import Arrow from '/public/siteImages/rightSideArrow.svg';
import starImage from '/public/SiteIcons/star.svg';

class HostDetail extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    personCapacity: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      profileId: PropTypes.number.isRequired,
      displayName: PropTypes.string.isRequired,
      picture: PropTypes.string,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      info: PropTypes.string,
    }).isRequired,
    listingData: PropTypes.shape({
      minDay: PropTypes.number,
      maxDay: PropTypes.number,
      maxDaysNotice: PropTypes.string,
    }).isRequired,
    blockedDates: PropTypes.array,
    contactHostOpen: PropTypes.any.isRequired,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    id: 0,
    userId: null,
    userBanStatus: 0,
    personCapacity: 0,
    city: null,
    profile: {
      profileId: 0,
      displayName: null,
      picture: null,
      location: null,
      createdAt: null,
      info: null
    },
    listingData: {
      minDay: 0,
      maxDay: 0
    },
    blockedDates: [],
    showContactHostModal: false,
    isHost: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { contactHostOpen, isHost, hostEmail, userBanStatus } = this.props;
    const { id, personCapacity, userId, city, blockedDates, startDate, endDate } = this.props;
    const { profile: { profileId, displayName, firstName, lastName, picture, location, info, createdAt, reviewsCount, reviewsStarRating } } = this.props;
    const { listingData: { minDay, maxDay, maxDaysNotice } } = this.props;
    const { open } = this.state;
    let joinedDate = createdAt != null ? moment(createdAt).format("MMM, YYYY") : '';
    let initialValues = {
      listId: id,
      host: userId,
      hostEmail,
      firstName,
      startDate,
      endDate
    };
    let starRatingValue = 0, count = 150, firstArray, restArray, dotString = false;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    if (info) {
      firstArray = info.slice(0, count);
      restArray = info.slice(count, info.length);
      if (restArray && restArray.length > 0) {
        dotString = true;
      }
    }
    return (
      <div>
        <ContactHost
          initialValues={initialValues}
          id={id}
          userId={userId}
          city={city}
          profileId={profileId}
          picture={picture}
          displayName={firstName}
          personCapacity={personCapacity}
          blockedDates={blockedDates}
          minDay={minDay}
          maxDay={maxDay}
          maxDaysNotice={maxDaysNotice}
        />
        <div className={cx(c.avatarImage, cs.paddingBottom3)}>
          <Avatar
            source={picture}
            height={80}
            width={80}
            title={firstName}
            className={cx(s.profileAvatar, c.profileAvatarLink)}
            withLink
            profileId={profileId}
            linkClassName={cs.displayinlineBlock}
          />
          <div className={cx('viewListingTextSectionRTL')}>
            <a href={"/users/show/" + profileId} target={'_blank'} className={cx(cs.commonSubTitleText, cs.siteTextColor, cs.fontWeightBold)}>
              <FormattedMessage {...messages.hostedBy} /> {' '}  <span className={cs.siteLinkColor}>{firstName}</span>
            </a>
            <h5 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.paddingTop1)}><FormattedMessage {...messages.joinedIn} /> {joinedDate}</h5>
          </div>
        </div>
        <h4 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.paddingBottom3, c.reviewStarSection)}>
          {starRatingValue > 0 && <span className={c.reviewCountFlex}>
            <img src={starImage} className={cx(c.starImageMargin, 'viewlistStarImage')} />
            <span>{starRatingValue}</span>
          </span>}
          {location && <span className={cx('viewlistDotSectionRTL', { [c.dotSection]: starRatingValue > 0 })}><FormattedMessage {...messages.livesIn} /> {location}</span>}
        </h4>
        <p className={cs.commonContentText}>
          {!this.state.open && count >= 150 &&
            <span>  {firstArray} {dotString === true && <span>...</span>}</span>
          }
          {
            restArray && restArray.length > 0 &&
            <div>
              <Collapse in={open}>
                <div>
                  <span>{this.state.open && <>{firstArray}{restArray}</>}</span>
                </div>
              </Collapse>
              {
                dotString && <div className={cs.paddingTop2}>
                  <div>
                    <Button
                      bsStyle="link"
                      onClick={() => this.handleClick()}
                      className={s.showHideBtn}
                    >
                      {this.state.open ? <FormattedMessage {...messages.closeAll} /> : <FormattedMessage {...messages.showDescription} />}

                      {
                        this.state.open && <FontAwesome.FaAngleUp />
                      }
                      {
                        !this.state.open && <FontAwesome.FaAngleDown />
                      }

                    </Button>
                  </div>
                </div>
              }
            </div>
          }
        </p>
        {
          !isHost && !userBanStatus && <Link noLink className={cx(cs.commonContentText, cs.siteLinkColor, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone, cs.paddingTop2, cs.displayinlineBlock, cs.curserPointer)} onClick={(e) => { e.preventDefault(); contactHostOpen(id) }}>
            <FormattedMessage {...messages.contactHost} />
            <img src={Arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
          </Link>
        }
        <hr className={cs.listingHorizoltalLine} />
      </div>
    );
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  contactHostOpen
};
export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(HostDetail)));