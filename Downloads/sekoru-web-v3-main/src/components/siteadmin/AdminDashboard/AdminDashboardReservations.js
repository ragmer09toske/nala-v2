import React, { Component } from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminDashboard.css';
import cs from '../../../components/commonStyle.css'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Image
import reservationsIcon from '/public/AdminIcons/reservationIcon.svg';


class AdminDashboardReservations extends Component {

    render() {
        const { reservation: { getReservationDashboard } } = this.props;
        return (
            <div className={s.reservationBg}>
                <h4 className={cx(cs.commonSubTitleText, cs.fontWeightBold)}><FormattedMessage {...messages.panelReservation} /></h4>
                <div className={s.reservationGrid}>
                    <div className={cs.spaceTop3}>
                        <div className={s.reservationBox}>
                            <img src={reservationsIcon} className={cs.spaceBottom3} />
                            <h4 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>
                                {getReservationDashboard.monthCount}
                            </h4>
                            <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}>
                                <FormattedMessage {...messages.last30daysReservations} />
                            </p>
                        </div>
                    </div>
                    <div className={cx(cs.spaceTop3, s.reservationMarginRight, s.reservationMarginLeft)}>
                        <div className={s.reservationBox}>
                            <img src={reservationsIcon} className={cs.spaceBottom3} />
                            <h5 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>
                                {getReservationDashboard.todayCount}
                            </h5>
                            <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}>
                                <FormattedMessage {...messages.last24hoursReservations} />
                            </p>
                        </div>
                    </div>
                    <div className={cs.spaceTop3}>
                        <div className={s.reservationBox}>
                            <img src={reservationsIcon} className={cs.spaceBottom3} />
                            <h6 className={cx(cs.commonTotalText, cs.fontWeightExtraBold, cs.paddingBottom2)}>
                                {getReservationDashboard.totalCount}
                            </h6>
                            <p className={cx(cs.commonMediumText, cs.fontWeightMedium)}>
                                <FormattedMessage {...messages.totalReservations} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s, cs)(AdminDashboardReservations));