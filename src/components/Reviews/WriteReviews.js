import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';
// Components
import Link from '../Link';
import Loader from '../Loader';
import Avatar from '../Avatar';
// Locale
import messages from '../../locale/messages';
import NoDataView from '../NoDataView/NoDataView';
// icons
import EditWriteIcon from '/public/SiteIcons/editWrite.svg'
import ViewWriteIcon from '/public/SiteIcons/viewWrite.svg'
import noDataIcon from '/public/SiteIcons/noReviewIcon.svg';
class WriteReviews extends React.Component {

	static propTypes = {
		pendingData: PropTypes.shape({
			loading: PropTypes.bool,
			pendingReviews: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number.isRequired,
				listId: PropTypes.number.isRequired,
				hostId: PropTypes.string.isRequired,
				guestId: PropTypes.string.isRequired,
				hostData: PropTypes.shape({
					firstName: PropTypes.string.isRequired,
					lastName: PropTypes.string.isRequired,
					picture: PropTypes.string,
					profileId: PropTypes.number.isRequired,
				}),
				guestData: PropTypes.shape({
					firstName: PropTypes.string.isRequired,
					lastName: PropTypes.string.isRequired,
					picture: PropTypes.string,
					profileId: PropTypes.number.isRequired,
				}),
			}))
		}),
		userId: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
	};

	render() {
		const { data: { loading, pendingReviews }, userId } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<>
				{
					loading && <Loader type={"text"} />
				}
				{
					!loading && (!pendingReviews || (pendingReviews &&
						pendingReviews.length === 0)) &&
					<div className={cx(s.textCenter, s.noListingTop)}>
						<NoDataView
							noDataIcon={noDataIcon}
							title={formatMessage(messages.noReviewHeadingByYou)}
							content1={formatMessage(messages.noReviewSubHeding)}
						/>
					</div>
				}
				{
					!loading && pendingReviews && pendingReviews.length > 0 &&
					<div className={cx(s.panelNolist, cs.spaceTop4, 'bgBlack')}>

						<div className={cx(cs.spaceTop4)}>
							{
								pendingReviews.map((item, index) => {
									let isHost = false;
									if (userId === item.hostId) {
										isHost = true;
									}
									let userLink = "/users/show/";
									if (item.guestData && item.hostData && item.listData) {
										let hostDetails = isHost ? item.guestData.profileId : item.hostData.profileId;
										return (
											<ul className={cx(cs.commonListStyleNone, s.recommondations, 'listStyleRTL', 'listLayoutArbic')}>
												<li className={cx(cs.paddingBottom4)}>
													<div className={cx(s.listAvatarGrid, cs.reviewsContainer, s.writePanel)}>
														<div className={cx(s.textCenter, cs.reviewsYourItemsOne, cs.reviewsYourLs, 'reviewsId')} >
															<Avatar
																source={isHost ? item.guestData.picture : item.hostData.picture}
																title={isHost ? item.guestData.firstName : item.hostData.firstName}
																className={s.profileAvatar}
																withLink
																linkClassName={cx(cs.commonProfileAvatarLink, s.noBackground)}
																profileId={isHost ? item.guestData.profileId : item.hostData.profileId}
															/>

														</div>
														<div className={cx(s.listDeatilsGrid, cs.reviewsYourItemsTwo, cs.rightBg, 'rightBgRTL', 'reviewDeatilsGridRTL', 'bgBlackTwo', 'dashRightBg')}>
															<p className={cx(cs.spaceBottom2, cs.reviewWriteHeading)}>
																<FormattedMessage {...messages.writeReviewFor} />
																{" "}
																<a href={"/cars/" + item.listId} target={"_blank"} className={cx(cs.reviewTitleLink, cs.commonContentText)}>
																	{item.listData && item.listData.title}
																</a>
															</p>
															<div className={cx(cs.dFlex, cs.mobileReviewIconBox)}>
																<span className={cx(cs.spaceRight4, cs.mrMarginBottom, cs.mrRemoveMargin, 'writeReviewTextRTL')}>
																	<Link to={"/review/write/" + item.id} className={cx(cs.dInlineFlex, cs.commonContentText, cs.commomLinkborderBottom, cs.reviewTitleLink)}>
																		<img src={EditWriteIcon} className={cx(s.iconPadRight, 'iconPadRightRTL')} />
																		<span className={cx(cs.vtrMiddle)}><FormattedMessage {...messages.writeReview} /></span>
																	</Link>
																</span>
																<span className={cx(cs.spaceRight4, s.viewIconLeft, cs.mrRemoveMargin, '', 'writeReviewTextRTL')}>
																	<Link to={"/users/trips/itinerary/" + item.id} className={cx(cs.dInlineFlex, cs.commonContentText, cs.commomLinkborderBottom, cs.reviewTitleLink)}>
																		<img src={ViewWriteIcon} className={cx(s.iconPadRight, 'iconPadRightRTL')} />
																		<span className={cx(cs.vtrMiddle)}><FormattedMessage {...messages.viewLitneray} /></span>
																	</Link>
																</span>
															</div>
														</div>
													</div>
												</li>
											</ul>
										);
									}
								})
							}
						</div>
					</div>
				}

			</>
		);
	}
}

const mapState = (state) => ({
	userId: state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(WriteReviews)));
