import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import cs from '../commonStyle.css';
import moment from 'moment';
// Component
import Avatar from '../Avatar';
import StarRating from '../StarRating/StarRating';

// Locale
import messages from '../../locale/messages';

class ResponseItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            authorData: PropTypes.shape({
                picture: PropTypes.string,
                firstName: PropTypes.string.isRequired,
                profileId: PropTypes.number.isRequired,
            }),
        }),
    };

    render() {
        const { data: { authorData: { firstName, profileId, picture } } } = this.props;
        const { data: { reviewContent, rating, createdAt } } = this.props;
        let date = moment(createdAt).format('MM/DD/YYYY');
        return (
            <div>
                <div className={s.lineCss}></div>
                <div className={cx(cs.reviewsContainer)}>
                    <div className={cx(s.pullLeft,cs.reviewsYourItemsOne, 'floatRightRTL')}>
                        <Avatar
                            source={picture}
                            title={firstName}
                            className={s.profileAvatar}
                            withLink
                            linkClassName={cx(s.avatarDisplay, s.profileAvatarLink)}
                            profileId={profileId}
                        />
                    </div>
                    <div className={cx(cs.reviewsYourItemsTwo,'responseRs')}>
                        <div className={cx(cs.writtenReviewTitle,cs.commonContentText)}><FormattedMessage {...messages.responseFrom} /></div>
                        {
                            reviewContent && <div className={cx(cs.reviewFlex,cs.dFlex,'reviewStarSection')}>
                                <div><StarRating /></div>
                                <div>{rating}</div>
                                <span className={cx(cs.dotCss)}></span>
                                <div className={cx(s.responseDate, 'textWhite')}>{date}</div>
                            </div>
                        }
                        <p className={cx(cs.reviewPara,cs.commonMediumText)}>
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