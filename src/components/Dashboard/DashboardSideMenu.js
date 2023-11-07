import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import cs from '../../components/commonStyle.css';

// Component
import VerifiedInfo from '../VerifiedInfo';
import Avatar from '../Avatar';
import Link from '../Link';

// Graphql 
import UnreadThreadsQuery from './getUnreadThreads.graphql';

// Locale
import messages from '../../locale/messages';

//Images
import arrow from '/public/siteImages/rightSideArrow.svg';
import userIcon from '/public/siteImages/user.svg';
import starIcon from '/public/SiteIcons/outerStar.svg';
import editProfileIcon from '/public/SiteIcons/Group 42677.svg';
import DropZone from './DropZone';
import Loader from '../Loader/Loader';
import { doRemoveProfilePicture } from '../../actions/manageUserProfilePicture';

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
        siteName: PropTypes.string.isRequired,
        isDashboardPage: PropTypes.bool,
        isEditProfilePage: PropTypes.bool,
        isTrustVerfiedPage: PropTypes.bool
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
        const { account: { userId, profileId, picture }, data, doRemoveProfilePicture, profilePictureData: { userAccount } } = this.props;
        const { allUnreadThreads: { loading, getUnreadThreads }, isDashboardPage, isEditProfilePage, isTrustVerfiedPage, profilePhotoLoading, isUser, isViewProfilePage } = this.props;
        const { formatMessage } = this.props.intl;
        let showProfile = isViewProfilePage && !isUser ? false : true, isVerified = profileId;
        return (
            <>
                <div className={cx(s.avatarSectionBorder, cs.spaceBottom3, 'whiteBgColor')}>
                    <div className={cx(s.avatarSection, cs.textAlignCenter)}>
                        <Loader
                            show={profilePhotoLoading}
                            type={"page"}
                        >
                            <Avatar
                                height={150}
                                width={150}
                                className={cs.profileAvatarLink}
                                source={data && data.picture}
                                isUser={showProfile}
                            />
                            {showProfile && userAccount?.picture && <DropZone
                                guestPicture={picture}
                                className={cx('dashboardDropzone', 'profileEditIconPosition')}
                                iconPosition={'dashboardUploadIcon'}
                                isEditIcon
                            />}
                        </Loader>

                        {showProfile && !userAccount?.picture && <DropZone
                            guestPicture={picture}
                            defaultMessage={formatMessage(messages.updatePhotoLabel)}
                            className={'dashboardDropzone'}
                            iconPosition={'dashboardUploadIcon'}
                        />}
                    </div>
                    {showProfile && userAccount?.picture && <div className={cx(cs.textAlignCenter, cs.spaceTop3, cs.spaceBottom11)}><Link onClick={() => doRemoveProfilePicture(userAccount?.picture)} 
                    className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteLinkColor, cs.textDecorationNone, cs.commomLinkborderBottom, cs.textAlignCenter, cs.curserPointer)}>
                    <FormattedMessage {...messages.removeProfilePhoto} /></Link></div>}
                    <hr className={cx(cs.listingHorizoltalLine, cs.spaceTop3, cs.spaceBottom3)} />
                    <VerifiedInfo userId={showProfile ? userId : data && data.userId} isTrustVerfiedPage={isTrustVerfiedPage} isUser={showProfile} />
                </div>
                {!isDashboardPage && showProfile && <Link to={'/user/reviews/about-you'} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteTextColor, cs.textDecorationNone, s.btnDisplayGrid, s.viewProfileGrid, cs.spaceBottom3, 'whiteBgColor')}>
                    <img src={starIcon} />
                    <div className={s.btnDisplayFlex}>
                        <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.reviews} /></h4>
                        <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                    </div>
                </Link>
                }

                {!isEditProfilePage && showProfile && <Link to={'/user/edit'} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteTextColor, cs.textDecorationNone, s.btnDisplayGrid, s.viewProfileGrid, cs.spaceBottom3, 'whiteBgColor')}>
                    <img src={editProfileIcon} />
                    <div className={s.btnDisplayFlex}>
                        <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.editProfile} /></h4>
                        <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                    </div>
                </Link>
                }

                {isEditProfilePage && showProfile && <Link to={'/users/show/' + isVerified} className={cx(cs.commonContentText, cs.fontWeightMedium, cs.siteTextColor, cs.textDecorationNone, s.btnDisplayGrid, s.viewProfileGrid, 'whiteBgColor')}>
                    <img src={userIcon} />
                    <div className={s.btnDisplayFlex}>
                        <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.viewProfile} /></h4>
                        <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                    </div>
                </Link>
                }
            </>
        );
    }
}

const mapState = (state) => ({
    account: state.account.data,
    siteName: state.siteSettings.data.siteName,
    userData: state.account.data,
    profilePhotoLoading: state.account.profilePhotoLoading
});

const mapDispatch = {
    doRemoveProfilePicture
};

export default compose(
    injectIntl,
    withStyles(s, cs),
    connect(mapState, mapDispatch),
    graphql(gql`
    query {
        userAccount {
            picture
        }
    }
  `, {
        name: 'profilePictureData',
        options: {
            ssr: false,
            fetchPolicy: 'network-only'
        }
    }, UnreadThreadsQuery, {
        name: 'allUnreadThreads',
        options: {
            ssr: false,
            pollInterval: 5000,
            fetchPolicy: 'network-only'
        }
    }
    )
)(Dashboard);