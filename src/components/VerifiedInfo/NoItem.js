import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

//Image
import arrow from '/public/siteImages/rightSideArrow.svg';

class NoItem extends Component {

    static propTypes = {
        isLoggedInUser: PropTypes.bool.isRequired,
        formatMessage: PropTypes.any,
    };

    render() {
        const { isLoggedInUser, isTrustVerfiedPage } = this.props;
        return (
            <>
                <h5 className={cx(cs.commonMediumText, cs.fontWeightNormal, cs.paddingBottom3)}>
                    <FormattedMessage {...messages.noVerifications} />
                </h5>
                {
                    isLoggedInUser && !isTrustVerfiedPage && <>
                        <Link to={"/user/verification"} className={cx(cs.commonContentText, cs.siteLinkColor, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                            <FormattedMessage {...messages.addVerifications} />
                            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                        </Link>
                    </>
                }
            </>
        );
    }
}

export default injectIntl(withStyles(s, cs)(NoItem));