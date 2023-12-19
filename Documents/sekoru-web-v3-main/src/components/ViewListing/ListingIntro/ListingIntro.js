import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
import cs from '../../../components/commonStyle.css';
import c from '../../../components/ViewListing/common.css';
import cx from 'classnames';

// Redux Action
import { contactHostOpen } from '../../../actions/message/contactHostModal';

// Translation
import { injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

//Images
import carTypeIcon from '/public/SiteIcons/carTypeIcon.svg';
import modelIcon from '/public/SiteIcons/modelIcon.svg';
import calendarIcon from '/public/SiteIcons/calendarIcon.svg';
import speedometerIcon from '/public/SiteIcons/speedometerIcon.svg';
import makeIcon from '/public/SiteIcons/makeIcon.svg';
import transmissionIcon from '/public/SiteIcons/transmissionIcon.svg';

class ListingIntro extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    contactHostOpen: PropTypes.any.isRequired,
  };

  render() {
    const { data, isHost, userBanStatus, contactHostOpen, id } = this.props;
    const { formatMessage } = this.props.intl;
    let joinedDate = data.user.profile.createdAt != null ? moment(data.user.profile.createdAt).format("MMM, YYYY") : '';
    let transmission = data.transmission == '1' ? 'Automatic' : 'Manual';

    return (
      <>
        <div className={s.gridColumn}>
          <div className={c.avatarImage}>
            <Avatar
              source={data.user.profile.picture}
              type={"small"}
              height={80}
              width={80}
              title={data.user.profile.firstName}
              className={cx(s.profileAvatar, c.profileAvatarLink)}
              withLink
              linkClassName={cs.displayinlineBlock}
              profileId={data.user.profile.profileId}
            />
            <div className={cx(s.textSection, 'viewListingTextSectionRTL')}>
              <a href={"/users/show/" + data.user.profile.profileId} target={'_blank'} className={cx(cs.commonSubTitleText, cs.siteTextColor, cs.fontWeightBold)}>
                {formatMessage(messages.hostedBy)} {' '}  <span className={cs.siteLinkColor}> {data.user.profile.firstName} </span>
              </a>
              <h4 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.paddingTop1)}>
                {formatMessage(messages.joinedIn)}{' '}{joinedDate}
              </h4>
            </div>
          </div>
          {
            !isHost && !userBanStatus && <Link noLink className={cx(cs.btnPrimary, cs.btnBig, cs.displayinlineBlock, s.mobileMargin)} onClick={(e) => { e.preventDefault(); contactHostOpen(id) }}>
              {formatMessage(messages.contactHost)}
            </Link>
          }
        </div>
        <hr className={cs.listingHorizoltalLine} />
        <div className={s.displayGrid}>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={carTypeIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.carType)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{data?.settingsData[0]?.listsettings?.itemName}</h5>
          </div>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={makeIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.whatTypeOfProperty)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{data?.settingsData[3]?.listsettings?.itemName}</h5>
          </div>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={modelIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.modelLabel)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{data?.settingsData[1]?.listsettings?.itemName}</h5>
          </div>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={calendarIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.year)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{data?.settingsData[2]?.listsettings?.itemName}</h5>
          </div>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={transmissionIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.isPersonalHome)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{transmission}</h5>
          </div>
          <div className={cx(s.gridBoxSection, cs.spaceBottom4, 'viewListingGridBoxRTL')}>
            <img src={speedometerIcon} className={cs.spaceBottom3} />
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom1)}>{formatMessage(messages.odometer)}</h4>
            <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, s.textSection)}>{data?.settingsData[4]?.listsettings?.itemName}</h5>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  contactHostOpen
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(ListingIntro)));