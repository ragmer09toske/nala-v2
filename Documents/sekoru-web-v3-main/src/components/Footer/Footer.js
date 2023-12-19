import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import cx from 'classnames';
import cs from '../../components/commonStyle.css';
import { Row, Col, Grid } from 'react-bootstrap';

// Component
import Link from '../Link';

//Images
import PlayStoreImage from '/public/siteImages/playStore.svg';
import AppStoreImage from '/public/siteImages/appStore.svg';
import bgImage from '/public/siteImages/footernewBg.svg';
import facebookIcon from '/public/SiteIcons/facebookIcon.svg';
import twitterIcon from '/public/SiteIcons/twitterLogo.svg';
import instaIcon from '/public/SiteIcons/instagramIcon.svg';
import whiteFooter from '/public/siteImages/whiteFooterWave.svg';
// Locale
import messages from '../../locale/messages';

import getEnabledBlog from './getEnabledBlog.graphql';

class Footer extends React.Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    appAvailableStatus: PropTypes.bool,
    playStoreUrl: PropTypes.string,
    appStoreUrl: PropTypes.string,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getEnabledBlog: PropTypes.array,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      rentall: false,
      hosting: false,
      discover: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      data: { getEnabledBlog },
      siteName,
    } = nextProps;
    getEnabledBlog &&
      getEnabledBlog.length > 0 &&
      getEnabledBlog.map((item, key) => {
        if (
          item.footerCategory != 'discover' &&
          item.footerCategory != 'hosting'
        ) {
          this.setState({ rentall: true });
        }
        if (item.footerCategory == 'discover') {
          this.setState({ discover: true });
        }
        if (item.footerCategory == 'hosting') {
          this.setState({ hosting: true });
        }
      });
  }

  render() {
    const {
      siteName,
      facebook,
      twitter,
      instagram,
      appAvailableStatus,
      playStoreUrl,
      appStoreUrl,
      footerMargin,
      whiteBg,
      isAuthenticated,
    } = this.props;
    const {
      data: { getEnabledBlog },
    } = this.props;
    const { rentall, discover, hosting } = this.state;
    let becomeAHostLink = isAuthenticated
      ? '/become-a-owner?mode=new'
      : '/why-become-owner';
    return (
      <div>
        <div
          className={s.bgImage}
          style={{ backgroundImage: `url(${whiteBg ? whiteFooter : bgImage})` }}
        />
        <div className={cx(s.bgImageSection, 'hidden-print')}>
          <div className={cx(whiteBg ? s.bgWhite : s.bgColor)} />
          <Grid fluid className={s.container}>
            <Row>
              <Col sm={12} md={12} lg={12} xs={12}>
                <div className={s.displayGrid}>
                  <div className={cs.spaceTop3}>
                    <label
                      className={cx(
                        cs.commonMediumText,
                        cs.paddingBottom2,
                        cs.fontWeightBold
                      )}
                    >
                      {siteName}
                    </label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link
                          to={'/about'}
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.about} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/contact'}
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.contactForm} />
                        </Link>
                      </li>
                      {rentall &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item, key) => {
                          if (
                            item.footerCategory != 'discover' &&
                            item.footerCategory != 'hosting'
                          ) {
                            return (
                              <li>
                                <Link
                                  to={'/page/' + item.pageUrl}
                                  className={cs.siteTextColor}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                  <div className={cs.spaceTop3}>
                    <label
                      className={cx(
                        cs.commonMediumText,
                        cs.paddingBottom2,
                        cs.fontWeightBold
                      )}
                    >
                      <FormattedMessage {...messages.discover} />
                    </label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link
                          to={'/safety'}
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.trustSafety} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/travel'}
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.travelCredit} />
                        </Link>
                      </li>
                      {discover &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item, key) => {
                          if (item.footerCategory == 'discover') {
                            return (
                              <li>
                                <Link
                                  to={'/page/' + item.pageUrl}
                                  className={cx(
                                    cs.siteTextColor,
                                    cs.commonMediumText
                                  )}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                  <div className={cs.spaceTop3}>
                    <label
                      className={cx(
                        cs.commonMediumText,
                        cs.paddingBottom2,
                        cs.fontWeightBold
                      )}
                    >
                      <FormattedMessage {...messages.hosting} />
                    </label>
                    <ul className={s.listContainer}>
                      <li>
                        <Link
                          to={becomeAHostLink}
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.becomeAHost} />
                        </Link>
                      </li>
                      <li>
                        <a
                          href={
                            'https://app.termly.io/document/privacy-policy/47d8177e-feaa-463b-8389-6ba2be8e0baf'
                          }
                          className={cx(cs.siteTextColor, cs.commonMediumText)}
                        >
                          <FormattedMessage {...messages.termsPrivacy} />
                        </a>
                      </li>
                      {hosting &&
                        getEnabledBlog &&
                        getEnabledBlog.length > 0 &&
                        getEnabledBlog.map((item, key) => {
                          if (item.footerCategory == 'hosting') {
                            return (
                              <li>
                                <Link
                                  to={'/page/' + item.pageUrl}
                                  className={cx(
                                    cs.siteTextColor,
                                    cs.commonMediumText
                                  )}
                                >
                                  {item.pageTitle}
                                </Link>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                  <div className={cs.spaceTop3}>
                    <label
                      className={cx(
                        cs.commonMediumText,
                        cs.paddingBottom2,
                        cs.fontWeightBold
                      )}
                    >
                      <FormattedMessage {...messages.followUsText} />
                    </label>
                    <div className={s.socialFlex}>
                      {facebook && (
                        <a
                          href={facebook}
                          target='_blank'
                          className={s.shareIcon}
                        >
                          <img src={facebookIcon} />
                        </a>
                      )}
                      {twitter && (
                        <a
                          href={twitter}
                          target='_blank'
                          className={cx(s.shareIcon, s.twitterMargin)}
                        >
                          <img src={twitterIcon} />
                        </a>
                      )}
                      {instagram && (
                        <a
                          href={instagram}
                          target='_blank'
                          className={s.shareIcon}
                        >
                          <img src={instaIcon} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <hr
                  className={cx(
                    cs.listingHorizoltalLine,
                    cs.spaceBottom6,
                    cs.spaceTop6
                  )}
                />
                <div className={cx(s.displayFlex, s.flexReverse)}>
                  <h4
                    className={cx(
                      cs.commonSmallText,
                      cs.fontWeightNormal,
                      s.siteNamePadding
                    )}
                  >
                    © {siteName}
                  </h4>
                  {appAvailableStatus == 1 && (playStoreUrl || appStoreUrl) && (
                    <div>
                      {appStoreUrl && (
                        <a
                          href={appStoreUrl}
                          target='_blank'
                          className={cx(
                            cs.displayInlineBlock,
                            s.appStoreMargin
                          )}
                        >
                          <img alt='Image' src={AppStoreImage} />
                        </a>
                      )}
                      {playStoreUrl && (
                        <a
                          href={playStoreUrl}
                          target='_blank'
                          className={cs.displayInlineBlock}
                        >
                          <img alt='Image' src={PlayStoreImage} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
  appAvailableStatus: state.siteSettings.data.appAvailableStatus,
  playStoreUrl: state.siteSettings.data.playStoreUrl,
  appStoreUrl: state.siteSettings.data.appStoreUrl,
  isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(getEnabledBlog, {
    options: {
      fetchPolicy: 'network-only',
      ssr: false,
    },
  })
)(Footer);
