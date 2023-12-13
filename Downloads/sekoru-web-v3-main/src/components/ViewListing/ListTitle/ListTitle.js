import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListTitle.css';
import cs from '../../../components/commonStyle.css';
import c from '../../../components/ViewListing/common.css';
import cx from 'classnames';

//Redux Action
import { openSocialShareModal } from '../../../actions/modalActions';

// Translation
import { injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

//Images
import shareIcon from '/public/siteImages/shareIcon.svg';
import starImage from '/public/SiteIcons/star.svg';

// Component
import WishListIcon from '../../WishListIcon/WishListIcon';
import SocialShareModal from '../SocialShareModal';

class ListTitle extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    isHost: PropTypes.bool.isRequired,
    isHost: false,
    contactHostOpen: PropTypes.any.isRequired,
  };

  handleClick = async () => {
    const { openSocialShareModal } = this.props;
    var root = document.getElementsByTagName('html')[0];
    root.classList.add('scrollHidden');
    await openSocialShareModal()
  }

  handleRelease = () => {
    var root = document.getElementsByTagName('html')[0];
    root.classList.remove('scrollHidden');
  }

  render() {
    const { data, loading, openSocialShareModal, starRatingValue } = this.props;
    const { formatMessage } = this.props.intl;

    let isListOwner = data.isListOwner;
    let wishListStatus = data.wishListStatus;

    return (
      <div className={s.padding}>
        <h1 className={cx(cs.commonTitleText, cs.paddingBottom1, cs.fontWeightBold)}>
          {data.title != null ? data.title : data?.settingsData && data?.settingsData?.length > 0 && data?.settingsData[0]?.listsettings?.itemName + ' ' + formatMessage(messages.in) + ' ' + data.city}
        </h1>
        <div className={cx(s.displayFlex, s.alignItemEnd, s.disGridTitle)}>
          <div>
            <SocialShareModal handleRelease={this.handleRelease} listId={data.id} title={data.title} city={data.city} state={data.state} country={data.country} />
            <p className={cx(cs.commonContentText, cs.fontWeightNormal, c.reviewStarSection, s.mobilePadding)}>
              {starRatingValue > 0 && <span className={c.reviewCountFlex}>
                <img src={starImage} className={cx(c.starImageMargin, 'viewlistStarImage')} />
                <span>{' '}{starRatingValue}</span>
              </span>}{' '}
              <span className={cx(s.lineHeight, 'viewlistDotSectionRTL', { [c.dotSection]: starRatingValue > 0 })}>{data.city}, {data.state}, {data.country}</span>
            </p>
          </div>
          <div className={cx(s.displayFlex, s.justifyTab)}>
            {
              !isListOwner && !loading && <><WishListIcon type="button" listId={data.id} key={data.id} isChecked={wishListStatus} isViewListing={true} />
              </>
            }
            {
              <div className={cx(s.displayFlex, s.alignItemCenter, cs.curserPointer)} onClick={() => this.handleClick()}>
                <img src={shareIcon} className={cx(cs.viewListIcon, 'commonIconSpace')} />
                <h5 className={cx(cs.commonContentText, cs.fontWeightNormal)}>{formatMessage(messages.share)}</h5>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  openSocialShareModal
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(ListTitle)));