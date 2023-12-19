import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../commonStyle.css';
// Component
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import StarRating from '../StarRating/StarRating';

class ResponseItem extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            authorData: PropTypes.shape({
                picture: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                profileId: PropTypes.number,
            }),
        }),
        otherUserResponse: PropTypes.bool,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        otherUserResponse: false,
    };

    render() {
        const { data: { authorData: { firstName, lastName, profileId, picture } } } = this.props;
        const { data: { reviewContent, rating }, otherUserResponse, date, showReviewName } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <div className={cs.commonlineCss}></div>
                <div className={cx(cs.reviewsContainer, s.responseFlex)}>
                    <div className={cx(cs.reviewsYourItemsOne, s.pullLeft, 'floatRight')}>
                        <Avatar
                            source={picture}
                            title={firstName}
                            className={s.profileAvatar}
                            withLink
                            linkClassName={cx(s.avatarDisplay, cs.commonProfileAvatarLink)}
                            profileId={profileId}
                        />
                    </div>
                    <div className={cx(cs.reviewsYourItemsTwo, 'responseRs')}>
                        <span className={cx(cs.writtenReviewTitle, cs.commonContentText)}>{otherUserResponse ? firstName : (showReviewName ? firstName : formatMessage(messages.your))} <FormattedMessage {...messages.response} /></span>
                        {
                            reviewContent && <div className={cx(cs.reviewFlex, cs.dFlex, 'reviewStarSection')}>
                                <div><StarRating /></div>
                                <div>{rating}</div>
                                <span className={cx(cs.dotCss)}></span>
                                <div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL')}>{date}</div>
                            </div>
                        }
                        <p className={cx(cs.reviewPara, cs.commonMediumText)}>
                            {
                                reviewContent
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(ResponseItem));