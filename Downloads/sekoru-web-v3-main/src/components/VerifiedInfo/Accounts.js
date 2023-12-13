import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import AccountItem from './AccountItem';
import NoItem from './NoItem';
import Link from '../Link';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';

// Locale
import messages from '../../locale/messages';

//Image
import emailIcon from '/public/siteImages/emailVerify.svg';
import documentIcon from '/public/siteImages/docsVerify.svg';
import faceBookIcon from '/public/siteImages/fbVerify.svg';
import googleIcon from '/public/siteImages/googleVerify.svg';
import arrow from '/public/siteImages/rightSideArrow.svg';

class Accounts extends Component {

    static propTypes = {
        items: PropTypes.shape({
            isEmailConfirmed: PropTypes.bool.isRequired,
            isFacebookConnected: PropTypes.bool.isRequired,
            isGoogleConnected: PropTypes.bool.isRequired,
            isIdVerification: PropTypes.bool.isRequired,
        }),
        isLoggedInUser: PropTypes.bool.isRequired,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        items: {
            isEmailConfirmed: false,
            isFacebookConnected: false,
            isGoogleConnected: false,
            isIdVerification: false
        }
    }

    render() {
        const { items, isLoggedInUser, isTrustVerfiedPage, isUser } = this.props;
        const { formatMessage } = this.props.intl;

        if (items !== null) {
            let count = 0;
            count = items.isEmailConfirmed ? count + 1 : count;
            // count = items.isFacebookConnected ? count + 1 : count;
            count = items.isGoogleConnected ? count + 1 : count;
            count = items.isIdVerification ? count + 1 : count;
            return (
                <>
                    {
                        items.isEmailConfirmed && <div className={cx(s.displayGrid, cs.paddingBottom3)}>
                            <img src={emailIcon} className={s.emailTop} />
                            <AccountItem itemName={formatMessage(messages.emailConfirmed)} />
                        </div>
                    }

                    {/* {
                        items.isFacebookConnected && <div className={cx(s.displayGrid, cs.paddingBottom3)}>
                            <img src={faceBookIcon} className={s.fbIcon} />
                            <AccountItem itemName={formatMessage(messages.fbConnected)} />
                        </div>
                    } */}

                    {
                        items.isGoogleConnected && <div className={cx(s.displayGrid, cs.paddingBottom3)}>
                            <img src={googleIcon} className={s.googleIcon} />
                            <AccountItem itemName={formatMessage(messages.googleConnected)} />
                        </div>
                    }

                    {
                        items.isIdVerification && <div className={cx(s.displayGrid, cs.paddingBottom3)}>
                            <img src={documentIcon} />
                            <AccountItem itemName={formatMessage(messages.documentverified)} />
                        </div>
                    }
                    {
                        !items.isEmailConfirmed && !items.isGoogleConnected && !items.isIdVerification &&  isUser &&<NoItem isLoggedInUser={isLoggedInUser} isTrustVerfiedPage={isTrustVerfiedPage} />
                    }
                    {
                        isLoggedInUser && !isTrustVerfiedPage && count > 0 && count < 3 && isUser &&
                        <Link to={"/user/verification"} className={cx(cs.commonContentText, cs.siteLinkColor, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                            <FormattedMessage {...messages.moreVerifications} />
                            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                        </Link>
                    }
                    {
                        isLoggedInUser && !isTrustVerfiedPage && count == 3 && isUser &&
                        <Link to={"/user/verification"} className={cx(cs.commonContentText, cs.siteLinkColor, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                            <FormattedMessage {...messages.trustAndVerification} />
                            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                        </Link>
                    }
                </>
            );
        } else {
            return <NoItem isLoggedInUser={isLoggedInUser} />
        }
    }
}

export default injectIntl(withStyles(s, cs)(Accounts));