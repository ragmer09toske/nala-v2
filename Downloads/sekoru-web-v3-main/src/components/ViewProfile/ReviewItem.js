import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
	Row,
	Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import cs from '../commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Component
import ResponseItem from './ResponseItem';
import Avatar from '../Avatar';
import Link from '../Link';
import StarRating from '../StarRating/StarRating';

// Locale
import messages from '../../locale/messages';

class ReviewItem extends React.Component {

	static propTypes = {
		formatMessage: PropTypes.any,
		picture: PropTypes.string,
		firstName: PropTypes.string,
		profileId: PropTypes.number,
		reviewContent: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		response: PropTypes.object,
		location: PropTypes.string,
		isAdmin: PropTypes.bool,
		siteName: PropTypes.string
	};

	static defaultProps = {};

	render() {
		const { firstName, profileId, picture, location, isAdmin, siteName } = this.props;
		const { reviewContent, createdAt, response, rating, listData, showUserName } = this.props;
		const { formatMessage } = this.props.intl;
		let date = moment(createdAt).format('DD/MM/YYYY');

		let isGuestImage = response && response.authorData && response.authorData.picture;
		let isGuestProfileId = response && response.authorData && response.authorData.profileId;
		let isProfileId;
		if (!showUserName) {
			isProfileId = profileId
		} else {
			isProfileId = isGuestProfileId
		}
		return (
			<div className={s.panelBody}>
				<div className={cx(cs.reviewsContainer)}>
					<div className={cx(cs.reviewsYourItemsOne, s.LeftBg)}>
						{
							!isAdmin && <div className={cx(s.pullLeft, s.mediaContainer, s.textCenter)}>
								<Avatar
									source={picture}
									title={firstName}
									className={s.profileAvatar}
									withLink
									linkClassName={s.profileAvatarLink}
									profileId={profileId}
								/>
								{/* <div className={cx(s.textCenter, s.profileName)}>
									<Link to={"/users/show/" + profileId} className={s.profileName}>{firstName}</Link>
								</div> */}

							</div>
						}
						{
							isAdmin && <div className={cx(s.pullLeft, s.mediaContainer, s.textCenter,s.adminImg,s.profileAvatarLink)}>
								<Avatar
									source={'../../../adminAvatar.svg'}
									title={formatMessage(messages.verifiedBy) + ' ' + siteName}
									className={cx(s.profileAvatar, s.noBackground)}
									staticImage
								/>
								{/* <div className={cx(s.textCenter, s.profileName)}>
									{formatMessage(messages.verifiedBy) + ' ' + siteName}
								</div> */}
							</div>
						}
					</div>
					<div className={cx(cs.reviewsYourItemsTwo, cs.rightBg,'rightBgRTL')}>
						<div className={s.commentContainer}>
							{
								showUserName && <span className={cx(cs.writtenReviewTitle,cs.commonContentText)}>
									<FormattedMessage {...messages.youreviewedfor} />{' '}
									<a href={"/users/show/"} target={'_blank'} className={cx(cs.reviewTitleLink,cs.commonContentText)}>{otherUserName}</a>
								</span>
							}
							{
								isAdmin && <div className={cx(s.guestName, cs.writtenReviewTitle)}>
									{formatMessage(messages.verifiedBy)}
									<span>{" "}{siteName}</span>
								</div>
							}
							{
								!isAdmin && !showUserName &&
								<div className={cx(s.guestName,cs.writtenReviewTitle)}>
									{listData &&
										<>
											{firstName}<span>{' '} <FormattedMessage {...messages.reviewedTheLabel} /></span>  <a href={"/cars/" + listData.id} target={"_blank"} className={cx(cs.reviewTitleLink,cs.commonContentText)}>{listData.title}</a>
										</>
									}
									{!listData &&
										<FormattedMessage {...messages.notAvailable} />
									}
								</div>
							}

							<div className={cx(cs.reviewFlex,cs.dFlex,'reviewStarSection')}>
								<StarRating />
								<div>{rating}</div>
								<span className={cx(cs.dotCss)}></span>
								<div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL')}>{date}</div>
							</div>
							<p className={cx(cs.reviewPara,cs.commonMediumText)}>
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
							{
								response && <ResponseItem
									data={response}
								/>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItem)));