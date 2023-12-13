import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';
// Redux
import { connect } from 'react-redux';
// Component
import Avatar from '../Avatar';
import Link from '../Link';
// Locale
import messages from '../../locale/messages';
import StarRating from '../StarRating/StarRating';
import arrow from '/public/siteImages/rightSideArrow.svg';

class ReviewItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        picture: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileId: PropTypes.number,
        reviewContent: PropTypes.string,
        createdAt: PropTypes.string,
        response: PropTypes.object,
        otherUserResponse: PropTypes.bool,
        showUserName: PropTypes.bool,
        otherUserName: PropTypes.string,
        otherUserProfileId: PropTypes.number,
        isAdmin: PropTypes.bool,
        siteName: PropTypes.string
    };

    static defaultProps = {
        response: null,
        showUserName: false
    };

    render() {
        const { firstName, lastName, profileId, picture, otherUserName, otherUserProfileId, isAdmin } = this.props;
        const { reviewContent, createdAt, response, otherUserResponse, showUserName, siteName, rating, listData, current, reservationId } = this.props;
        let date = moment(createdAt).format('MM/DD/YYYY');
        const { formatMessage } = this.props.intl;

        let isGuestImage = response && response.authorData && response.authorData.picture;
        let isGuestProfileId = response && response.authorData && response.authorData.profileId;
        let showAvatar = showUserName == false ? picture : isGuestImage;
        let isProfileId;
        if (!showUserName) {
            isProfileId = profileId
        } else {
            isProfileId = isGuestProfileId
        }

        return (
            <li className={cx(cs.paddingBottom4)}>
                <div className={cx(s.listAvatarGrid,cs.reviewsContainer)}>
                    <div className={cx(cs.reviewsYourItemsOne,cs.reviewsYourLs)}>
                        {
                            !isAdmin && <div className={cx(s.pullRight, s.mediaContainer, s.textCenter, 'reviewsId')} >
                                <Avatar
                                    source={picture}
                                    title={firstName}
                                    className={s.profileAvatar}
                                    withLink
                                    linkClassName={cx(cs.commonProfileAvatarLink, s.noBackground)}
                                    profileId={profileId}
                                />
                            </div>
                        }
                        {
                            isAdmin && <div className={cx(s.pullRight, s.mediaContainer, s.textCenter,cs.commonProfileAvatarLink,s.reviewYoursAdminImg, 'reviewsId')} >
                                <Avatar
                                    source={'../../../adminAvatar.png'}
                                    title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                                    className={cx(s.profileAvatar, s.noBackground)}
                                    staticImage
                                />
                            </div>
                        }
                    </div>
                    <div className={cx(s.listDeatilsGrid,cs.reviewsYourItemsTwo,cs.rightBg, 'rightBgRTL','reviewDeatilsGridRTL', 'bgBlackTwo', 'dashRightBg')}>
                        <div className={cx(cs.dFlexColumn)}>
                            {
                                showUserName && <span className={cx(cs.writtenReviewTitle)}>
                                    <FormattedMessage {...messages.Youhadreviewsfor} />{' '}
                                    <a href={"/users/show/" + otherUserProfileId} target={'_blank'} className={cx(cs.reviewTitleLink,cs.commonContentText)}>{otherUserName}</a>:
                                </span>
                            }

                            {
                                isAdmin && <div className={cx(s.guestName, cs.writtenReviewTitle)}>
                                    {formatMessage(messages.verifiedBy) + ' ' + siteName}
                                </div>
                            }

                            {
                                !isAdmin && !showUserName &&
                                <div className={cx(cs.writtenReviewTitle)}>
                                    {listData &&
                                        <>
                                            {firstName}<span className={cx(cs.reviewHeadingColor)}>{' '} <FormattedMessage {...messages.sreview} /></span><a href={"/cars/" + listData.id} target={"_blank"} className={cx(cs.reviewTitleLink,cs.commonContentText)}>{" "}{listData.title}</a>
                                        </>
                                    }
                                    {!listData &&
                                        <FormattedMessage {...messages.notAvailable} />
                                    }
                                </div>
                            }
                            {
                                reviewContent && <div className={cx(cs.reviewFlex,cs.dFlex,'reviewStarSection')}>
                                    <div><StarRating /></div>
                                    <div>{rating}</div>
                                    <span className={cx(cs.dotCss)}></span>
                                    <div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL')}>{date}</div>
                                </div>
                            }
                            <p className={cx(cs.reviewPara,cs.commonMediumText,s.contentTop, { [s.noResponse]: isAdmin })}>
                                {
                                    reviewContent && (reviewContent.trim()).split("\n").map(function (content, index) {
                                        return (
                                            <span key={index}>
                                                {content}
                                                <br />
                                            </span>
                                        )
                                    })
                                }
                            </p>
                            {!isAdmin &&
                                <div className={cx(s.rightText, 'textAlignLeftRtl')}>
                                    <div className={cs.commonlineCss}></div>
                                    {current == 'notResponded' && 
                                        <>
                                            <Link to={"/review/write/" + reservationId} className={cx(cs.reviewTitleLink,cs.commonContentText,cs.commomLinkborderBottom,cs.dInlineFlex)}>
                                                <span className={cx(cs.vtrMiddle)}><FormattedMessage {...messages.reply} /></span>
                                                <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
                                            </Link>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s,cs)(connect(mapState, mapDispatch)(ReviewItem)));