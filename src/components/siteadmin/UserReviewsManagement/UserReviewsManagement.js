import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviewsManagement.css';
import cs from '../../../components/commonStyle.css';

import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import TableAction from '../../CommonTable/TableAction';
import StarRating from '../../StarRating';

import { updateReviewStatus } from '../../../actions/siteadmin/UserReview/manageReviews';
// Translation
import messages from '../../../locale/messages';
class UserReviewsManagement extends React.Component {

	static propTypes = {
		data: PropTypes.array,
		editUser: PropTypes.func,
		title: PropTypes.string.isRequired,
		updateReviewStatus: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			currentPage: 1,
			searchList: '',
			typing: false,
			typingTimeout: 0
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	paginationData(currentPage) {
		const { refetch } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	handleClick(searchList) {
		const { refetch } = this.props;
		const { currentPage } = this.state;
		let variables = {
			currentPage: 1,
			searchList: searchList
		};
		this.setState({ currentPage: 1 });
		refetch(variables);
	}

	handleSearchChange = (e) => {
		const self = this;
		if (self.state.typingTimeout) {
			clearTimeout(self.state.typingTimeout);
		}
		self.setState({
			searchList: e.target.value,
			typing: false,
			typingTimeout: setTimeout(function () {
				self.handleClick(self.state.searchList);
			}, 450)
		});
	}

	thead = () => {
		const { formatMessage } = this.props.intl;
		return [
			{ data: formatMessage(messages.listId) },
			{ data: formatMessage(messages.reviewContentLabel) },
			{ data: formatMessage(messages.adminListTitle) },
			{ data: formatMessage(messages.reservationConfirmCode) },
			{ data: formatMessage(messages.CheckInDate) },
			{ data: formatMessage(messages.CheckOutDate) },
			{ data: formatMessage(messages.SenderLabel) },
			{ data: formatMessage(messages.receiverLabel) },
			{ data: formatMessage(messages.ratingReviewLabel) },
			{ data: formatMessage(messages.reviewStatusLabel) },
			{ data: formatMessage(messages.reviewActionLabel) },
		]
	};

	tbody = () => {
		const { data } = this.props;
		const { updateReviewStatus } = this.props;
		const { currentPage, searchList } = this.state;

		return data?.reviewsData.map(value => {
			let content = value.reviewContent;
			let reviewContent = content.slice(0, 10);
			let dots = '...'
			let isContent = false;
			if (content.length > 10) {
				isContent = true;
			} else {
				isContent = false;
			}
			let hostName = value.userData && value.userData.firstName;
			let guestName = value.authorData && value.authorData.firstName;
			let hostProfileId = value.userData && value.userData.profileId;
			let guestProfileId = value.authorData && value.authorData.profileId;
			let title = value.listData && value.listData.title ? value.listData.title : 'List is missing';
			let confirmationCode = value.singleReservationData && value.singleReservationData.confirmationCode ? value.singleReservationData.confirmationCode : '';
			let checkInDate = value.singleReservationData && value.singleReservationData.checkIn ? moment(value.singleReservationData.checkIn).format('DD-MM-YYYY') : '';
			let checkOutDate = value.singleReservationData && value.singleReservationData.checkOut ? moment(value.singleReservationData.checkOut).format('DD-MM-YYYY') : '';


			return {
				id: value?.id,
				data: [
					{ data: value?.listId },
					{
						data: <div className={cx(cs.displayFlex, cs.alignCenter, cs.spaceBetween)}>
							{reviewContent.concat(dots)}
							<TableAction
								showEdit
								editLink={"/siteadmin/management-reviews/" + value.id}
							/>
						</div>
					},
					{
						data: <a href={"/cars/" + value.listId} target="_blank">
							{title}
						</a>
					},
					{ data: confirmationCode },
					{ data: checkInDate },
					{ data: checkOutDate },
					{
						data: <a href={"/users/show/" + guestProfileId} target="_blank">
							{guestName}
						</a>
					},
					{
						data: <a href={"/users/show/" + hostProfileId} target="_blank">
							{hostName}
						</a>
					},
					{
						data: <StarRating
							className={s.reviewStar}
							value={value.rating}
							name={'review'}
							starCount={5}
						/>
					},
					{ data: !value.isAdminEnable ? <FormattedMessage {...messages.disabledLabel} /> : <FormattedMessage {...messages.enabledLabel} /> },
					{
						data: !value.isAdminEnable ? <a href="javascript:void(0)" onClick={() => updateReviewStatus(value.id, 'enable', { currentPage, searchList })}>
							<FormattedMessage {...messages.setToEnable} />
						</a> : <a href="javascript:void(0)" onClick={() => updateReviewStatus(value.id, 'disable', { currentPage, searchList })}>
							<FormattedMessage {...messages.setToDisable} />
						</a>
					},
				]
			}
		})
	}

	render() {
		const { data } = this.props;
		const { formatMessage } = this.props.intl;
		const { currentPage } = this.state;
		return (
			<div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
				<div className={s.contentBox}>
					<CommonTable
						thead={this.thead}
						tbody={this.tbody}
						title={formatMessage(messages.usersReviews)}
						isSearch
						onSearch={this.handleSearchChange}
					/>
					{
						data?.reviewsData.length > 0
						&& <div>
							<CustomPagination
								total={data.count}
								currentPage={currentPage}
								defaultCurrent={1}
								defaultPageSize={10}
								change={this.paginationData}
								paginationLabel={formatMessage(messages.usersLabel)}
							/>
						</div>
					}
				</div>
			</div>
		);
	}

}

const mapState = (state) => ({
});

const mapDispatch = {
	updateReviewStatus
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(UserReviewsManagement)));