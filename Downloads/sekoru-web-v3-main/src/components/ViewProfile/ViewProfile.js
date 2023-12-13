import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
  Button,
  Form,
  Grid,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import cs from '../commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

import { connect } from 'react-redux';

import { openReportUserModal, openThankYouModal } from '../../actions/modalActions';
import ReportUserModal from '../ReportUserModal';

import ThankYouModal from '../ThankYouModal';

// Component
import Reviews from './Reviews';
import Link from '../Link';
import Avatar from '../Avatar';

// Locale
import messages from '../../locale/messages';
import DashboardSideMenu from '../Dashboard/DashboardSideMenu';
import PanelWrapper from './ManageListing/PanelWrapper/PanelWrapper';

class ViewProfile extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      profileId: PropTypes.number.isRequired,
      reviewsCount: PropTypes.number.isRequired,
    }).isRequired,
    isUser: PropTypes.bool,
    loadMore: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    data: {
      createdAt: new Date(),
      picture: null
    },
    isUser: false
  };

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

    const { data, isUser, loadMore, openReportUserModal, profileId, userData, isAuthenticate, loading } = this.props;
    const { open } = this.state;
    let date = moment(data.createdAt).format('MMMM YYYY');
    let count = 150, firstArray, restArray, dotString = false;

    if (data && data.info) {
      firstArray = data.info.slice(0, count);
      restArray = data.info.slice(count, data.info.length);
      if (restArray && restArray.length > 0) {
        dotString = true;
      }
    }

    return (
      <Grid fluid className={cx(s.pageContainer, 'ViewProfile')}>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} className={cs.spaceTop6}>
            <DashboardSideMenu isViewProfilePage isUser={isUser} data={data} />
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>
            <div className={cx(cs.commonBorderSection, 'whiteBgColor')}>
              <div>
                <div>
                  <h1 className={s.profileTitle}>
                    <FormattedMessage {...messages.hey} />{' '} {data.firstName}!
                  </h1>
                  {data.location && <p className={s.profileInfo}>
                    <FormattedMessage {...messages.livesIn} /> {data.location}
                  </p>}
                  {
                    !isUser && isAuthenticate &&
                    <p className={s.reportProfile}>
                      <ReportUserModal profileId={profileId} />
                      <Link
                        className={cx(s.reportProfile)}
                        onClick={openReportUserModal}
                      >
                        <FontAwesome.FaFlag className={cx(s.flagIcon, 'flagIconRTL')} />
                        <FormattedMessage {...messages.reportUser} />
                      </Link>
                      <ThankYouModal />
                    </p>
                  }
                </div>
                {data.info &&
                  <>
                    <div>
                      <div className={s.lineCss}></div>
                      <h3 className={s.subTitle}><FormattedMessage {...messages.aboutMe} /></h3>
                      <p className={cx(s.subContent, 'textWhite')}>
                        {!this.state.open && count >= 150 &&
                          <span className={cx(s.subText, s.lineBreak)}>  {firstArray} {dotString === true && <span>...</span>}</span>
                        }
                        {
                          restArray && restArray.length > 0 &&
                          <div>
                            <Collapse in={open} onExiting={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                              <div> <span className={cx(s.subText, s.lineBreak)}>
                                {this.state.open && <>{firstArray}{restArray}</>}
                              </span></div>
                            </Collapse>
                            {
                              dotString && <div className={s.btnContainer}>
                                <div className={s.showHidePadding}>
                                  <Button
                                    bsStyle="link"
                                    className={cx(s.button, s.noPadding, s.btnLInk, s.showHideBtn, s.collapseBtn, 'bgTransparent')}
                                    onClick={() => this.handleClick()}
                                  >
                                    {this.state.open ? <FormattedMessage {...messages.closeAll} /> : <FormattedMessage {...messages.showDescription} />}

                                    {
                                      this.state.open && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                    }
                                    {
                                      !this.state.open && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                                    }

                                  </Button>
                                </div>
                              </div>
                            }
                          </div>
                        }
                      </p>
                    </div>
                  </>
                }
                <PanelWrapper userId={data.userId} firstName={data.firstName} />
              </div>
              {
                data.reviewsCount > 0 && <Reviews
                  loading={loading}
                  reviewsCount={data.reviewsCount}
                  data={data.reviews}
                  loadMore={loadMore}
                />
              }
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapState = (state) => ({
  listSettingsData: state.adminListSettingsData.data,
  userData: state.account.data,
  isAuthenticate: state.runtime.isAuthenticated
});

const mapDispatch = {
  openReportUserModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ViewProfile)));