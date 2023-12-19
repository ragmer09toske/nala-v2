import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { graphql, compose } from 'react-apollo';
import { initialize, destroy } from 'redux-form';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageSecurityDeposit.css';
import cs from '../../../components/commonStyle.css';
// Components
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
//graphql
import reservationsQuery from './reservationsQuery.graphql';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import { convert } from '../../../helpers/currencyConvertion';
import HostClaimModal from '../../HostClaimModal/HostClaimModal';
import AdminClaimModal from '../../AdminClaimModal/AdminClaimModal';
import { decode } from '../../../helpers/queryEncryption';
import ClaimPayoutModal from '../ClaimPayoutModal/ClaimPayoutModal';

class ManageSecurityDeposit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			searchList: '',
			typing: false,
			typingTimeout: 0,
			claimedModal: false,
			reservationId: null,
			claimType: 'all',
			adminClaimModal: false,
			reservationCurrency: 'USD',
			openClaimPayoutModal: false
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	paginationData(currentPage) {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		this.setState({ currentPage });
		let variables = { currentPage };
		setStateVariable(variables);
		refetch(variables);
	}

	handleClick(searchList) {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		let variables = {
			currentPage: 1,
			searchList: searchList
		};
		this.setState(variables);
		setStateVariable(variables)
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

	changeModalState = (status = false, reservationId) => this.setState({
		claimedModal: status,
		reservationId,
		currentPage: 1
	});

	onFilter = claimType => {
		const { getAllReservationAdmin: { refetch }, setStateVariable } = this.props;
		const { currentPage, searchList } = this.props;
		this.setState({ claimType, currentPage: 1 });
		setStateVariable({ claimType, currentPage: 1 })
		refetch({ currentPage: 1, searchList, claimType });
	}

	refetchData = () => {
		const { getAllReservationAdmin: { refetch } } = this.props;
		const { currentPage, searchList, claimType } = this.props;
		refetch({ currentPage, searchList, claimType });
	}

	openAdminClaimModal = (reservationId, reservationCurrency) => {
		var root = document.getElementsByTagName('html')[0];
		root.classList.add('scrollHidden');
		this.setState({ adminClaimModal: true, reservationId, reservationCurrency });
	}
	closeAdminClaimModal = () => {
		var root = document.getElementsByTagName('html')[0];
		root.classList.remove('scrollHidden');
		this.setState({ adminClaimModal: false, reservationId: null });
	}
	openClaimPayoutModal = (value) => {
		const { initialize } = this.props;
		let initialData = {
			hostId: value?.hostId,
			reservationId: value?.id,
			receiverEmail: value?.hostPayout?.payEmail,
			payoutId: value?.hostPayout?.id,
			currency: value?.currency,
			claimPayout: value?.claimPayout,
			paymentMethodId: value?.hostPayout?.methodId,
			payoutCurrency: value?.hostPayout?.currency,
			last4Digits: value?.hostPayout?.last4Digits,
			hostEmail: decode(value?.hostData?.userData?.email)
		};
		var root = document.getElementsByTagName('html')[0];
		root.classList.add('scrollHidden');
		this.setState({ openClaimPayoutModal: true })
		initialize('ClaimPayoutForm', initialData, true);
	}

	closeClaimPayoutModal = () => {
		const { destroy } = this.props;
		var root = document.getElementsByTagName('html')[0];
		root.classList.remove('scrollHidden');
		this.setState({ openClaimPayoutModal: false });
		destroy('ClaimPayoutForm')
	}

	thead = () => {
		const { claimType } = this.props;
		const { formatMessage } = this.props.intl;
		let claimActionLabel = '';
		if (claimType == 'all') claimActionLabel = formatMessage(messages.statusOrAction);
		else if (claimType == 'claimed') claimActionLabel = formatMessage(messages.status);
		else if (claimType == 'nonClaimed') claimActionLabel = formatMessage(messages.claimAction);

		return [
			{ data: formatMessage(messages.bookingId) },
			{ data: formatMessage(messages.ownerDetails) },
			{ data: formatMessage(messages.renterDetails) },
			{ data: formatMessage(messages.bookingInformation) },
			{ data: formatMessage(messages.securityDepositAmount) },
			{ data: formatMessage(messages.amountClaimedByOwner) },
			{ data: formatMessage(messages.securityDepositToHost) },
			{ data: formatMessage(messages.securityDepositToGuest) },
			{ data: formatMessage(messages.claimDetails) },
			{ data: claimActionLabel },
			{ data: formatMessage(messages.claimPayoutLabel) },
		]
	};

	claimStatus = (value) => {

		const { formatMessage } = this.props.intl;

		let payoutAction = false, payoutStatus;
		if (value.claimStatus == 'approved' && value.claimPayout > 0 && !value.isClaimPaidOut && (value.reservationState === 'cancelled' || value.reservationState === 'completed')) {
			payoutAction = true;
			payoutStatus = formatMessage(messages.readyTopay)
		}
		if (value.claimStatus == 'requested' || value.claimStatus == 'pending') {
			payoutAction = false;
			payoutStatus = formatMessage(messages.messageStatus5)
		}
		if (value.reservationState === 'expired' || value.reservationState === 'declined' || value.claimStatus == 'fullyRefunded') {
			payoutAction = false;
			payoutStatus = formatMessage(messages.close)
		}
		if (value.isClaimPaidOut && value.claimStatus == 'approved') {
			payoutAction = false;
			payoutStatus = formatMessage(messages.securityDepositClaimed)
		}
		if (!value.hostPayout && !value.isClaimPaidOut) {
			payoutAction = false;
			payoutStatus = formatMessage(messages.noPayoutMethod)
		}

		return payoutAction ? <a onClick={() => this.openClaimPayoutModal(value)}>{payoutStatus}</a> : payoutStatus

	}

	tbody = () => {
		const { getAllReservationAdmin: { getAllReservationAdmin } } = this.props;
		const { formatMessage } = this.props.intl;
		return getAllReservationAdmin?.reservationData.map(value => {
			let showRefund = false;
			if (value.reservationState === 'expired' || value.reservationState === 'cancelled' || value.reservationState === 'declined' || value.reservationState === 'completed') {
				showRefund = true;
			}
			return {
				id: value?.id,
				data: [
					{ data: value.id },
					{
						data: <>{value.hostData.firstName + ' - ' + decode(value.hostData.userData.email)}</>
					},
					{
						data: <>{value.guestData.firstName + ' - ' + decode(value.guestData.userData.email)}</>
					},
					{
						data: <Link to={"/siteadmin/viewreservation/" + value.id + '/security-deposit'} >
							<FormattedMessage {...messages.viewLabel} />
						</Link>
					},
					{
						data: <CurrencyConverter
							amount={value.securityDeposit}
							from={value.currency}
						/>
					},
					{
						data: <> {value.claimAmount ? <CurrencyConverter
							amount={value.claimAmount}
							from={value.currency}
						/> : '-'} </>
					},
					{
						data: <>{value.claimPayout > 0 && value.isClaimPaidOut ? <CurrencyConverter
							amount={value.claimPayout}
							from={value.currency}
						/> : '-'}</>
					},
					{
						data: <>{value.claimRefund > 0 ? <CurrencyConverter
							amount={value.claimRefund}
							from={value.currency}
						/> : '-'}</>
					},
					{
						data: <>{value.claimAmount ? <Link onClick={() => this.changeModalState(true, value.id)}>{formatMessage(messages.viewLabel)}</Link> : '-'}</>
					},
					{
						data: <>{
							showRefund && (value.claimStatus == 'pending' || value.claimStatus === 'requested') ? <a
								href="javascript:void(0)"
								onClick={() => this.openAdminClaimModal(value.id, value.currency)}
							>
								{formatMessage(messages.proceedToRefund)}
							</a> : (value.claimStatus == 'approved' || value.claimStatus == 'fullyRefunded') ? <span>{formatMessage(messages.claimRefunded)}</span> : <div>{formatMessage(messages.messageStatus5)}</div>
						}</>
					},
					{
						data: <>{this.claimStatus(value)}</>
					},
				]
			}
		})
	}

	render() {
		const { getAllReservationAdmin: { getAllReservationAdmin }, currencyRates } = this.props;
		const { claimedModal, reservationId, adminClaimModal, reservationCurrency, openClaimPayoutModal } = this.state;
		const { currentPage, searchList, claimType } = this.props;
		const { formatMessage } = this.props.intl;
		let modalInitialValues = {};
		if (claimedModal && getAllReservationAdmin && getAllReservationAdmin.reservationData) {
			let reservationData = getAllReservationAdmin.reservationData.find(item => item.id == reservationId)
			if (reservationData) {
				modalInitialValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to).toFixed(2);
				if (reservationData.claimStatus && reservationData.claimStatus != 'pending') {
					modalInitialValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to).toFixed(2);
					modalInitialValues.claimReason = reservationData.claimReason;
					modalInitialValues.claimImages = reservationData.claimImages;
				}
			}
		}

		let adminClaimModalValues = {}, claimedByHost = false;
		if (reservationId && adminClaimModal) {
			let reservationData = getAllReservationAdmin.reservationData.find(item => item.id == reservationId)
			if (reservationData) {
				claimedByHost = reservationData.claimStatus == 'requested' || reservationData.claimStatus == 'approved';
				convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to)
				adminClaimModalValues.securityDeposit = convert(currencyRates.base, currencyRates.rates, reservationData.securityDeposit, reservationData.currency, currencyRates.to);
				if (reservationData.claimStatus == 'requested') adminClaimModalValues.claimAmount = convert(currencyRates.base, currencyRates.rates, reservationData.claimAmount, reservationData.currency, currencyRates.to);
			}
		}

		return (
			<div className={cx(s.pagecontentWrapper)}>
				<h1 className={s.headerTitle}><FormattedMessage {...messages.manageSecurityDeposit} /></h1>
				{claimedModal && <HostClaimModal
					refetchData={this.refetchData}
					claimed
					reservationId={reservationId}
					show={claimedModal}
					currency={getAllReservationAdmin && getAllReservationAdmin.reservationData.currency}
					changeModalState={this.changeModalState}
					initialValues={modalInitialValues}
				/>}
				{
					adminClaimModal && <AdminClaimModal
						refetch={this.refetchData}
						show={adminClaimModal}
						claimedByHost={claimedByHost}
						closeModal={this.closeAdminClaimModal}
						initialValues={adminClaimModalValues}
						openHostModal={this.changeModalState}
						reservationId={reservationId}
						currency={reservationCurrency}
					/>
				}

				<ClaimPayoutModal
					refetch={this.refetchData}
					show={openClaimPayoutModal}
					closeModal={this.closeClaimPayoutModal}
				/>

				<div className={s.marginBottom}>
					<Button onClick={() => this.onFilter('all')} className={cx(cs.btnPrimaryBorder, { [s.active]: (claimType == 'all') }, s.mbFullWidth)}>
						{formatMessage(messages.claimAll)}
					</Button>
					<Button onClick={() => this.onFilter('claimed')} className={cx(cs.btnPrimaryBorder, { [s.active]: (claimType == 'claimed') }, s.marginLR, s.mbFullWidth)}>
						{formatMessage(messages.claimedReservation)}
					</Button>
					<Button onClick={() => this.onFilter('nonClaimed')} className={cx(cs.btnPrimaryBorder, { [s.active]: (claimType == 'nonClaimed') }, s.mbFullWidth)}>
						{formatMessage(messages.nonClaimedReservation)}
					</Button>
				</div>

				<CommonTable
					thead={this.thead}
					tbody={this.tbody}
					// title={formatMessage(messages.manageSecurityDeposit)}
					isExport
					exportLink={`/export-admin-data?type=security-deposit&search=${searchList}&filter=${claimType}`}
					isSearch
					onSearch={this.handleSearchChange}
				/>
				{
					getAllReservationAdmin && getAllReservationAdmin.reservationData && getAllReservationAdmin.reservationData.length > 0
					&& <div>
						<CustomPagination
							total={getAllReservationAdmin.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.panelReservation)}
						/>
					</div>
				}
			</div>
		);
	}

}

const mapState = (state) => ({
	completed: state.reservation.completed,
	loading: state.reservation.loading,
	currencyRates: state.currency
});

const mapDispatch = {
	initialize,
	destroy
};

export default compose(injectIntl,
	withStyles(s, cs),
	connect(mapState, mapDispatch),
	graphql(reservationsQuery, {
		name: 'getAllReservationAdmin',
		options: (props) => ({
			variables: {
				currentPage: props.currentPage,
				isClaimDetails: true,
				claimType: props.claimType,
				searchList: props.searchList
			},
			fetchPolicy: 'network-only',
		})
	})
)(ManageSecurityDeposit);