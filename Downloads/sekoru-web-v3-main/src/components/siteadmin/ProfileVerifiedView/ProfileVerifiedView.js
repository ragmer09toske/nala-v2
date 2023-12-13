import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfileVerifiedView.css';
import cs from '../../../components/commonStyle.css';
import Link from '../../Link';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import Avatar from '../../Avatar';

//Image
import arrowIcon from '/public/AdminIcons/backArrow.svg';

const query = gql`query($profileId: Int, $isUser: Boolean) {
    showUserProfile(profileId: $profileId, isUser: $isUser) {
      userId
      profileId
      firstName
      lastName
      dateOfBirth
      gender
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      reviewsCount
      country
      profileBanStatus{
        email
      }
      userVerifiedInfo{
        isEmailConfirmed
        isIdVerification
        isGoogleConnected
        isFacebookConnected
        isPhoneVerified
      }
    }
  }`;

class ProfileVerifiedView extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        title: PropTypes.string.isRequired,
        addListToRecommended: PropTypes.any.isRequired,
        removeListFromRecommended: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: {
            profileBanStatus: null,
            userVerifiedInfo: null
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { data, intl, title } = this.props;
        let isVerifiedInfo = data && data.userVerifiedInfo;
        // let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isFacebookConnected || data.userVerifiedInfo.isPhoneVerified) ? true : false;
        let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isPhoneVerified) ? true : false;

        let isEmail, isGoogle, isDocument, isFacebook, isSMS;

        if (isVerifiedInfo && data.userVerifiedInfo.isEmailConfirmed == true) {
            isEmail = "Email";
        }
        if (isVerifiedInfo && data.userVerifiedInfo.isGoogleConnected == true) {
            isGoogle = "Google";
        }

        // if (isVerifiedInfo && data.userVerifiedInfo.isFacebookConnected == true) {
        //     isFacebook = "Facebook";
        // }

        if (isVerifiedInfo && data.userVerifiedInfo.isIdVerification == true) {
            isDocument = "Document";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isPhoneVerified == true) {
            isSMS = "Phone number";
        }
        let language;

        if (data.preferredLanguage == "id") {
            language = "Bahasa Indonesia"
        } else if (data.preferredLanguage == "ms") {
            language = "Bahasa Melayu"
        } else if (data.preferredLanguage == "ca") {
            language = "Català"
        } else if (data.preferredLanguage == "da") {
            language = "Dansk"
        } else if (data.preferredLanguage == "de") {
            language = "Deutsch"
        } else if (data.preferredLanguage == "en") {
            language = "English"
        } else if (data.preferredLanguage == "es") {
            language = "Español"
        } else if (data.preferredLanguage == "el") {
            language = "Eλληνικά"
        } else if (data.preferredLanguage == "fr") {
            language = "Français"
        } else if (data.preferredLanguage == "it") {
            language = "Italiano"
        } else if (data.preferredLanguage == "hu") {
            language = "Magyar"
        } else if (data.preferredLanguage == "nl") {
            language = "Nederlands"
        } else if (data.preferredLanguage == "no") {
            language = "Norsk"
        } else if (data.preferredLanguage == "pl") {
            language = "Polski"
        } else if (data.preferredLanguage == "pt") {
            language = "Português"
        } else if (data.preferredLanguage == "fi") {
            language = "Suomi"
        } else if (data.preferredLanguage == "sv") {
            language = "Svenska"
        } else if (data.preferredLanguage == "tr") {
            language = "Türkçe"
        } else if (data.preferredLanguage == "is") {
            language = "Íslenska"
        } else if (data.preferredLanguage == "cs") {
            language = "Čeština"
        } else if (data.preferredLanguage == "ru") {
            language = "Русский"
        } else if (data.preferredLanguage == "th") {
            language = "ภาษาไทย"
        } else if (data.preferredLanguage == "zh") {
            language = "中文 (简体)"
        } else if (data.preferredLanguage == "zh-TW") {
            language = "中文 (繁體)"
        } else if (data.preferredLanguage == "ja") {
            language = "日本語"
        } else {
            language = "한국어"
        }

        const dateOfBirth = moment(data.dateOfBirth, 'MM-YYYY-DD').format('MM/DD/YYYY');

        return (
            <div className={cx(cs.adminContentPadding)}>
                <div className={cs.textLineBreak}>
                    <div className={cx(cs.dFlexContainer, cs.spaceBottom4, cs.mobileDisplayBlock)}>
                        <h1 className={cx(cs.commonTotalText, cs.fontWeightBold)}><FormattedMessage {...messages.viewProfile} /></h1>
                        <div className={cx(s.gobackMobileSpace, cs.dFlex, cs.textAlignRight, cs.mobileDisplayBlock, 'textAlignLeftRTL')}>
                            <Link to={"/siteadmin/users"} className={cx(cs.siteLinkColor, cs.commonContentText, cs.fontWeightMedium, cs.commomLinkborderBottom, cs.textDecorationNone)}>
                                <img src={arrowIcon} className={cx(cs.backArrowStyle, 'adminGoBackArrowRTL')} />
                                <FormattedMessage {...messages.goBack} />
                            </Link>
                        </div>
                    </div>
                    <div className={cx(cs.commonAdminBorderSection, s.noProfilePadding)}>
                        <div className={s.profileHeader}>
                            <div className={cx(cs.dFlex, cs.mobileDisplayBlock)}>
                                <div>
                                    {
                                        data && data.picture && <span>
                                            <img
                                                src={"/images/avatar/" + data.picture}
                                                className={cx(s.profileAvatar, 'adminUserProfilePicRTL')}
                                            />
                                        </span>
                                    }
                                    {
                                        !data.picture && <span>
                                            <Avatar
                                                isUser
                                                height={80}
                                                width={80}
                                                className={cx(s.profileAvatar, 'adminUserProfilePicRTL')}
                                            />
                                        </span>
                                    }
                                </div>
                                <div className={cx(cs.commonTotalText, cs.fontWeightBold)}>
                                    {data.firstName}{' '}{data.lastName}
                                </div>
                            </div>
                        </div>

                        {
                            data && data.dateOfBirth && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.birthdayLabel} /></div>
                                <div>{dateOfBirth}</div>
                            </div>
                        }
                        {
                            data && data.gender && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.gender} /></div>
                                <div>{data.gender}</div>
                            </div>
                        }
                        {
                            data && data.profileBanStatus.email && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.emailLabel} /></div>
                                <div>{data.profileBanStatus.email}</div>
                            </div>
                        }
                        {
                            data && data.phoneNumber && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.phoneNumber} /></div>
                                <div>{data.phoneNumber}</div>
                            </div>
                        }

                        {
                            data && data.info && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.bioInfo} /></div>
                                <div>{data.info}</div>
                            </div>
                        }
                        {
                            data && data.location && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.location} /></div>
                                <div>{data.location}</div>
                            </div>
                        }
                        {
                            isVerify && <div className={cx(s.dataListItem, cs.commonContentText, cs.fontWeightNormal, s.profileViewGrid)}>
                                <div className={cs.fontWeightMedium}><FormattedMessage {...messages.verification} /></div>
                                {
                                    <div>
                                        <span>{isEmail}</span>
                                        {isGoogle && isEmail && <span>,{' '}</span>}
                                        <span>{isGoogle}</span>
                                        {isDocument && (isGoogle || isEmail) && <span>, {' '}</span>}
                                        <span>{isDocument}</span>
                                        {/* {isFacebook && isFacebook && <span>, {' '}</span>}
                                        <span>{isFacebook}</span> */}
                                        {isSMS && (isGoogle || isEmail || isDocument) && <span>, {' '}</span>}
                                        <span>{isSMS} </span>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}


export default compose(injectIntl, withStyles(s, cs))(ProfileVerifiedView);