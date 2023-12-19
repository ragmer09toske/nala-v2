import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

import {
	Row,
	Col,
	Label
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';
import cs from '../../../components/commonStyle.css';

import logoUrl from '../logo-small.jpg';
import chatIcon from '/public/siteImages/chatIcon.svg';
// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

// Locale
import messages from '../../../locale/messages';

// Graphql 
import GetAllThreadQuery from '../AllThreadsQuery.graphql';
import { formatTime } from '../../../helpers/formatting';


class InboxItem extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		type: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		sentBy: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
		account: PropTypes.shape({
			userId: PropTypes.string.isRequired
		}),
		readMessage: PropTypes.any.isRequired
	};

	static defaultProps = {
		createdAt: null,
		startDate: null,
		endDate: null,
		picture: null,
		status: null,
		sentBy: null,
		read: false
	}

	label(status, noStyle) {
		let style, label;
		switch (status) {
			case 'inquiry':
				label = <FormattedMessage {...messages.messageStatus1} />
				style = 'inquiry';
				break;
			case 'preApproved':
				label = <FormattedMessage {...messages.messageStatus2} />
				style = 'success';
				break;
			case 'declined':
				label = <FormattedMessage {...messages.messageStatus3} />
				style = 'danger';
				break;
			case 'approved':
				label = <FormattedMessage {...messages.messageStatus4} />
				style = 'success';
				break;
			case 'pending':
				label = <FormattedMessage {...messages.messageStatus5} />
				style = 'primary';
				break;
			case 'cancelledByHost':
				label = <FormattedMessage {...messages.messageStatus6} />
				style = 'danger';
				break;
			case 'cancelledByGuest':
				label = <FormattedMessage {...messages.messageStatus7} />
				style = 'danger';
				break;
			case 'intantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'confirmed':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'expired':
				label = <FormattedMessage {...messages.messageStatus9} />
				style = 'expired';
				break;
			case 'requestToBook':
				label = <FormattedMessage {...messages.messageStatus10} />
				style = 'primary';
				break;
			case 'completed':
				label = <FormattedMessage {...messages.inboxCompleted} />
				style = 'completed';
				break;
			case 'claimRequested':
				label = <FormattedMessage {...messages.securityDepositClaimdebyOwner} />
				style = 'securityDeposit';
				break;
			case 'claimRefunded':
				label = <FormattedMessage {...messages.securityDepositRefunded} />
				style = 'securityDeposit';
				break;
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate, firstName } = this.props;
		const { city, state, country, status, sentBy, read, zipcode, startTime, endTime } = this.props;
		const { formatMessage } = this.props.intl;
		const { account: { userId } } = this.props;
		const { readMessage } = this.props;
		let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '',
			start = startDate != null ? moment(startDate).format('MM/DD/YYYY') : '',
			end = endDate != null ? moment(endDate).format('MM/DD/YYYY') : '',
			formattedStartTime = formatTime(startTime),
			formattedEndTime = formatTime(endTime),
			isRead = true;
		if (userId !== sentBy && read === false) {
			isRead = false;
		}
		return (
			<li className={s.PanelBody}>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12} className={s.threadAuthor}>
						<div className={cx(s.displayFlexContainer, s.inboxBorderSection)}>
							<div className={s.threadAvatar}>
								<Avatar
									source={picture}
									title={displayName}
									className={s.profileAvatar}
									withLink
									linkClassName={cx(s.inboxProfileAvatarLink, s.noBackground)}
									profileId={profileId}
								/>
							</div>
							<div className={cx(s.inBoxContentSection, 'inBoxContentSectionRTL')}>
								<div className={cx(s.contentGridBox)}>
									<div className={cx(s.inBoxNameWidth, s.inboxPaddingRight, 'inboxPaddingRightRTL')}>
										<a href={"/users/show/" + profileId} target={'_blank'} className={cx(cs.siteTextColor, cs.fontWeightMedium, cs.commonMediumText, cs.paddingBottom1, cs.displayinlineBlock)}> {firstName}</a>
										<div className={cx(cs.commonSmallText, cs.fontWeightNormal, cs.paddingBottom1)}>
											<time>{createdDate}</time>
										</div>
										<Link to={"/message/" + threadId + "/" + type} onClick={() => readMessage(threadId, type)} className={cx(cs.siteLinkColor, cs.fontWeightNormal, cs.commonSmallText, s.displayFlex)}>
											<img src={chatIcon} className={cx(s.iconSpace, 'reservationIconSpaceRTL')} /><FormattedMessage {...messages.messageHistroy} />
										</Link>
									</div>
									<div className={cx(s.inBoxAddressWidth, s.inboxPaddingRight, 'inboxPaddingRightRTL')}>
										<Link
											to={"/message/" + threadId + "/" + type}
											className={cx(cs.displayBlock, { [s.threadSubjectUnread]: isRead === false }, { [s.threadRead]: isRead === true }, { ["threadSubjectUnreadRTL"]: isRead === false })}
											onClick={() => readMessage(threadId, type)}
										>
											<div>
												{content != null ? content : this.label(status, true)}
											</div>
										</Link>
										<div className={cx(s.threadInfo, s.spaceTop1)}>
										<Link to={"/message/" + threadId + "/" + type} className={s.noTextLine}>
											<p className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText, cs.paddingBottom1)}>
												<span>{`${city},${state},${country} - ${zipcode}`}</span>
											</p>
											<div className={cx(cs.siteTextColor, cs.fontWeightNormal, cs.commonSmallText)}>
												{status !== 'message' &&
													<div>
														(<span className={s.inboxTimeInfo}>
															<span className={s.inlineBlock}>
																{start}
															</span>
															<span> - </span>
															<span className={s.inlineBlock}>
																{end}
															</span>
															<span>, {" "}</span>
														</span>
														<span className={s.inboxTimeInfo}>
															<span className={cx(s.inlineBlock, "inboxTimeDirection")}>
																{formattedStartTime}
															</span>
															<span> - </span>
															<span className={cx(s.inlineBlock, "inboxTimeDirection")}>
																{formattedEndTime}
															</span>
														</span>)
													</div>
												}
											</div>
											</Link>
										</div>
									</div>
									<div className={cx('inBoxbtn')}>
										{this.label(status)}
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</li>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	readMessage
};


export default compose(
	injectIntl,
	withStyles(s, cs),
	connect(mapState, mapDispatch),
	graphql(GetAllThreadQuery, {
		name: 'GetAllThreads',
		options: {
			ssr: false,
			pollInterval: 5000,
			fetchPolicy: 'network-only',
		}
	})
)(InboxItem);
