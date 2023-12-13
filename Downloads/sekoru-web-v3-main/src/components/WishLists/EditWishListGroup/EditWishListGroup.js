// General
import React from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

import { openAddWishListGroupModal, closeWishListModal } from '../../../actions/WishList/modalActions';
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';

// GraphQL
import getWishListGroupQuery from './getWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
	Grid,
	Button,
	Row,
	Col,
} from 'react-bootstrap';
import s from './EditWishListGroup.css';
import cs from '../../../components/commonStyle.css';
import Confirm from 'react-confirm-bootstrap';

// Components
import Loader from '../../../components/Loader';
import Link from '../../Link';
import WishListGroupModal from '../WishListGroupModal';
import NotFound from '../../../routes/notFound/NotFound';
import ListingItem from '../ListingItem'
//Images
import goListIcon from '../../../../public/AdminIcons/whistListGoIcon.svg';
import editIcon from '../../../../public/AdminIcons/whistListEditIcon.svg';
import deleteIcon from '../../../../public/AdminIcons/whistListDeleteIcon.svg';
import noImage from '../../../../public/siteImages/noWishList.svg';

class EditWishListComponent extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			loading: PropTypes.bool,
			getWishListGroup: PropTypes.any
		}),
	};

	static defaultProps = {
		data: {
			loading: true
		},
	}

	constructor(props) {
		super(props);
		this.state = {
			listingData: [],
			actionType: ''
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		history.push('/siteadmin/popularlocation/add')
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { data: { loading, getWishListGroup } } = nextProps;
		let listingData = [];
		if (getWishListGroup?.wishLists && getWishListGroup?.wishLists.length > 0) {
			getWishListGroup?.wishLists.map((item) => {
				if (item.listData) listingData.push(item.listData)
			})
		}
		this.setState({ listingData });
	}

	openEditWishListModal = (initialValues, actionType) => {
		this.setState({ actionType })
		const { openAddWishListGroupModal } = this.props;
		openAddWishListGroupModal(initialValues, 'EditWishListGroupForm')
		var root = document.getElementsByTagName('html')[0];
		root.classList.add('scrollHidden');
	}

	render() {
		const { profileId, wishListId, wishListLoading } = this.props;
		const { data: { loading, getWishListGroup } } = this.props;
		const { formatMessage } = this.props.intl;
		const { openAddWishListGroupModal, deleteWishListGroup } = this.props;
		const { listingData, actionType } = this.state;

		let initialValues = {};

		if (getWishListGroup && getWishListGroup.id) {
			initialValues = {
				id: getWishListGroup.id,
				name: getWishListGroup.name,
				isPublic: getWishListGroup.isPublic,
				userId: getWishListGroup.userId
			};
		}

		if (getWishListGroup === null) {
			return <NotFound />
		}

		return (
			<div>
				<WishListGroupModal actionType={actionType} wishListGroupId={getWishListGroup?.id} />
				<Grid fluid className={cs.commonContainerList}>
					<Row>
						{
							(loading || wishListLoading) && <Col xs={12} sm={12} md={12} lg={12}>
								<Loader type="text" />
							</Col>
						}
						{
							!loading && getWishListGroup && !wishListLoading && <Col xs={12} sm={12} md={12} lg={12}>
								<div className={cx(cs.dFlexContainer, cs.spaceBottom5, s.flexWrapMb)}>
									<Link to={"/wishlists"} className={cx(cs.btnPrimaryBorder, cs.btnlarge)}>
										<img src={goListIcon} className={cx('commonIconSpace', 'goArrowRTL')} />
										<span className={'vtrMiddle'}>{formatMessage(messages.goToAllLists)}</span>
									</Link>
									<div className={cx(cs.dFlexContainer)}>
										<Button className={cx(cs.btnPrimary, cs.btnlarge, s.editBtnMargin)}
											onClick={() => this.openEditWishListModal(initialValues, 'edit')}>
											<img src={editIcon} className={cx('commonIconSpace', s.iconWidth)} />
											<span className={'vtrMiddle'}><FormattedMessage {...messages.editLabel} /></span>
										</Button>
										<div className={'deleteWishListModel'}>
											<Button className={cx(cs.btnPrimary, cs.btnlarge)}
												onClick={() => this.openEditWishListModal(initialValues, 'delete')}>
												<img src={deleteIcon} className={cx('commonIconSpace', s.iconDeleteWidth)} />
												<span className={'vtrMiddle'}><FormattedMessage {...messages.delete} /></span>
											</Button>
										</div>
									</div>
								</div>
								<h2 className={cx(cs.commonTitleText, cs.fontWeightBold, cs.paddingBottom4)}>
									{
										getWishListGroup.name
									}
								</h2>
								{
									!loading && getWishListGroup && !wishListLoading && <div className={s.listGrid}>
										{listingData && listingData.length > 0 && <ListingItem data={listingData} fromPage={'whistList'} isEditWishList />}
									</div>
								}
								{
									listingData?.length == 0 &&
									<div className={s.noWishList}>
										<img src={noImage} />
										<h6 className={cx(cs.commonMediumText, cs.paddingBottom5, cs.paddingTop5)}>{formatMessage(messages.noWishlistsHomes)}</h6>
										<Link to={"/s"} className={cx(cs.btnPrimary, s.btnlarge)}>
											<span className={'vtrMiddle'}>{formatMessage(messages.startExplore)}</span>
										</Link>
									</div>
								}
							</Col>
						}
					</Row>
				</Grid>
			</div>
		)
	}
}

const mapState = (state) => ({
	wishListLoading: state.loader.wishListLoading
});

const mapDispatch = {
	openAddWishListGroupModal,
	deleteWishListGroup,
	closeWishListModal
};

export default compose(
	injectIntl,
	withStyles(s, cs),
	connect(mapState, mapDispatch),
	graphql(getWishListGroupQuery,
		{
			options: (props) => ({
				variables: {
					profileId: props.profileId,
					id: props.wishListId
				},
				fetchPolicy: 'network-only',
			})
		}
	)
)(EditWishListComponent);