import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Col,
}
  from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import cs from '../../components/commonStyle.css';

// Component
import VerifiedInfo from '../VerifiedInfo';
import Avatar from '../Avatar';
import Link from '../Link';
import UnreadMessages from './UnreadMessages';

// Graphql 
import UnreadThreadsQuery from './getUnreadThreads.graphql';

// Locale
import messages from '../../locale/messages';

//Images
import arrow from '/public/siteImages/rightSideArrow.svg';
import handIcon from '/public/siteImages/dashBoardHandIcon.png';
import allMessages from '/public/siteImages/messages.svg';
import reviews from '/public/siteImages/reviews.svg';
import youCars from '/public/siteImages/yourCars.svg';
import userIcon from '/public/siteImages/user.svg';
import DashboardSideMenu from './DashboardSideMenu';

class Dashboard extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }).isRequired,
    allUnreadThreads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadThreads: PropTypes.array
    }),
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    allUnreadThreads: {
      loading: true,
      getUnreadThreads: []
    },
    account: {
      userId: null,
      picture: null
    }
  }

  render() {
    const { account: { userId, picture, firstName }, siteName } = this.props;
    const { allUnreadThreads: { loading, getUnreadThreads } } = this.props;
    const { formatMessage } = this.props.intl;
    let newMessages = 0;
    if (!loading) {
      newMessages = getUnreadThreads != null ? getUnreadThreads.length : 0;
    }
    let messageCount = formatMessage(messages.messages) + ` (${newMessages} ` + formatMessage(messages.messagesNew) + ')';

    return (
      <>
        <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
          <DashboardSideMenu isDashboardPage/>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
          <div className={cx(cs.commonBorderSection, cs.spaceBottom3, s.bgColor, s.handIconGrid)}>
            <div>
           { firstName && <h3 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.paddingBottom3)}>{formatMessage(messages.dashBoardHeader1) + ', ' + firstName}</h3> }
              <p className={cs.commonMediumText}>
                <FormattedMessage {...messages.dashBoardInfo} />
              </p>
            </div>
            <img src={handIcon} />
          </div>
          <div className={cx(s.btnMainGrid, cs.spaceBottom6)}>
            <Link to={'/inbox'} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteTextColor, cs.textDecorationNone, s.btnDisplayGrid, 'whiteBgColor')}>
              <img src={allMessages} />
              <div className={s.btnDisplayFlex}>
                <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.allMessages} /></h4>
                <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL', 'blueLeftArrowRTL')} />
              </div>
            </Link>
            <Link to={'/user/reviews/about-you'} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.textDecorationNone, s.btnDisplayGrid, cs.siteTextColor, s.reviewMargin, 'whiteBgColor')}>
              <img src={reviews} />
              <div className={s.btnDisplayFlex}>
                <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.reviews} /></h4>
                <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL', 'blueLeftArrowRTL')} />
              </div>
            </Link>
            <Link to={'/cars'} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.textDecorationNone, s.btnDisplayGrid, cs.siteTextColor, 'whiteBgColor')}>
              <img src={youCars} />
              <div className={s.btnDisplayFlex}>
                <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.yourLists} /></h4>
                <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL', 'blueLeftArrowRTL')} />
              </div>
            </Link>
          </div>
          <div className={cx(cs.commonBorderSection, 'whiteBgColor')}>
            <h4 className={cx(cs.commonContentText, cs.fontWeightBold)}>{messageCount}</h4>
            <UnreadMessages
              userId={userId}
              loading={loading}
              getUnreadThreads={getUnreadThreads}
            />
          </div>
        </Col>
      </>  
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreads',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  })
)(Dashboard);