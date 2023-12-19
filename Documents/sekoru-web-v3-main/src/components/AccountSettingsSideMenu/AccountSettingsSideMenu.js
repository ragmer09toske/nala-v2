import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccountSettingsSideMenu.css';
import cx from 'classnames';

// Component
import Link from '../Link';
import history from '../../core/history';

// Locale
import messages from '../../locale/messages';

class AccountSettingsSideMenu extends React.Component {
    render() {
        let location;
        if (history.location) {
            location = history.location.pathname;
        }
        return (
            <div>
                <ul className={cx(s.listContainer, 'listContainerRTL')}>
                    <li className={cx({ [s.active]: location === "/user/payout" })}>
                        <Link to={"/user/payout"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.payoutPreferences} />
                        </Link>
                    </li>
                    <li className={cx({ [s.active]: location === "/user/transaction" })}>
                        <Link to={"/user/transaction"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.transactionHistory} />
                        </Link>
                    </li>
                    <li className={cx({ [s.active]: location === "/users/security" })}>
                        <Link to={"/users/security"} className={s.sideNavitem}>
                            <FormattedMessage {...messages.security} />
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withStyles(s)(AccountSettingsSideMenu);