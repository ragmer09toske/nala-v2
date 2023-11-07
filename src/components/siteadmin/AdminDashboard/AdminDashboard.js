import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col,
    Grid
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';
import cs from '../../../components/commonStyle.css'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Image
import userIcon from '/public/AdminIcons/dashBoardUserIcon.svg';
import listingIcon from '/public/AdminIcons/dashBoardListing.svg';
import reservationsIcon from '/public/AdminIcons/reservationIcon.svg';

// Component
import DashboardTile from './DashboardTile';
import AdminDashboardReservations from './AdminDashboardReservations';
import Loader from '../../../components/Loader';

class AdminDashboard extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        user: PropTypes.shape({
            loading: PropTypes.bool,
            getUserDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
        listing: PropTypes.shape({
            loading: PropTypes.bool,
            getListingDashboard: PropTypes.shape({
                totalCount: PropTypes.number.isRequired,
                todayCount: PropTypes.number.isRequired,
                monthCount: PropTypes.number.isRequired,
            })
        }),
    };

    static defaultProps = {
        user: {
            loading: true
        },
        listing: {
            loading: true
        },
        reservation: {
            loading: true
        }
    };

    render() {
        const { user, listing, reservation, user: { getUserDashboard }, listing: { getListingDashboard } } = this.props;
        if (user.getUserDashboard && listing.getListingDashboard && reservation.getReservationDashboard) {
            return (
                <div className={cx(cs.adminContentPadding, s.pagecontentWrapper, s.bgColor)}>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={cs.spaceBottom5}>
                            <div className={s.columnGrid}>
                                <div className={cx(s.commonBg, s.marginOne, 'dashboardUserListingMarginOneRTL')}>
                                    <h4 className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3)}><FormattedMessage {...messages.usersLabel} /></h4>
                                    <div className={cx(s.userBox, s.userBoxBG)}>
                                        <div className={s.backgroundBgBlur}><img src={userIcon} className={s.imgZindex} /></div>
                                        <div className={cx(s.displayGrid, cs.paddingTop5)}>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h5 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getUserDashboard.monthCount}</h5>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.last30daysUsers} /></p>
                                            </div>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h4 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getUserDashboard.todayCount}</h4>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.last24hoursUsers} /></p>
                                            </div>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h2 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getUserDashboard.totalCount}</h2>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.totalUsers} /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx(s.commonBg, s.marginTwo, 'dashboardUserListingMarginTwoRTL')}>
                                    <h4 className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3)}><FormattedMessage {...messages.listings} /></h4>
                                    <div className={cx(s.listingBoxBg, s.userBox)}>
                                        <div className={cx(s.backgroundBgBlur, s.backgroundBgBlurTwo)}> <img src={listingIcon} className={s.imgZindex} /> </div>
                                        <div className={cx(s.displayGrid, cs.paddingTop5)}>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h4 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getListingDashboard.monthCount}</h4>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.last30daysListings} /></p>
                                            </div>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h5 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getListingDashboard.todayCount}</h5>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.last24hoursListings} /></p>
                                            </div>
                                            <div className={cx(cs.textAlignCenter, cs.spaceBottom5)}>
                                                <h6 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>{getListingDashboard.totalCount}</h6>
                                                <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}><FormattedMessage {...messages.totalListings} /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AdminDashboardReservations reservation={reservation} />
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <Loader type={"text"} />
            );
        }
    }
}

export default injectIntl(withStyles(s, cs)(AdminDashboard));