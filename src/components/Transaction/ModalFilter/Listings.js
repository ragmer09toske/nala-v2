import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FormControl, Button, FormGroup } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalFilter.css';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';

// Locale
import messages from '../../../locale/messages';

//Actions
import { onChangeListingFilter } from '../../../actions/Listing/onChangeListing';
import { closeTransactionModal } from '../../../actions/modalActions';

class Listings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listId: null,
			payoutId: null

		}

	}
	componentDidMount() {
		const { payoutId, listId } = this.props;
		this.setState({ payoutId: payoutId ? payoutId : '0', listId: listId ? listId : '0' })
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { payoutId, listId } = nextProps;
		this.setState({ payoutId: payoutId ? payoutId : '0', listId: listId ? listId : '0' })
	}

	handleChange = (e) => {
		const { onChangeListingFilter, payoutId, listId } = this.props;
		if (e.target.name == 'listId') {
			onChangeListingFilter({ listId: e.target.value, payoutId });
		} else {
			onChangeListingFilter({ payoutId: e.target.value, listId });
		}

	}


	handleSubmit = async () => {
		const { handleResults, closeTransactionModal, listId, mode, payoutId } = this.props;
		await handleResults({ mode, listId, payoutId });
		await closeTransactionModal();
	}

	handleClear = async () => {
		const { onChangeListingFilter, handleResults, closeTransactionModal, mode } = this.props;
		await onChangeListingFilter({ listId: null, payoutId: null });
	}

	render() {
		const { manageListingTransaction: { ManageListingTransaction }, getPayouts: { getPayouts } } = this.props;
		const { listId, payoutId } = this.state;
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<FormGroup className={bt.space4}>
					<label className={cx(bt.commonLabelText, 'textWhite')}><FormattedMessage {...messages.filterByPayout} /></label>
					<FormControl
						componentClass="select"
						name='payoutId'
						className={cx(bt.commonControlSelect, s.commonInput, 'transactionSelectRTL')}
						onChange={this.handleChange}
						value={payoutId}
					>
						<option value="0">{formatMessage(messages.allPayoutMethod)}</option>
						{
							getPayouts && getPayouts.map((item, index) => {
								if (item.paymentMethod.id === 2) {
									return (
										<option
											value={item.id}
											key={index}
										>
											******{item.last4Digits}
										</option>
									)
								} else {
									return (
										<option
											value={item.id}
											key={index}
										>
											{item.payEmail}
										</option>
									)
								}

							})

						}
					</FormControl>
				</FormGroup>
				<FormGroup className={bt.space4}>
					<label className={cx(bt.commonLabelText, 'textWhite')}><FormattedMessage {...messages.filterByCars} /></label>
					<FormControl name='listId' componentClass="select" className={cx(bt.commonControlSelect, s.commonInput, 'transactionSelectRTL')} onChange={this.handleChange} value={listId}>
						<option value="0">{formatMessage(messages.allCars)}</option>
						{
							ManageListingTransaction && ManageListingTransaction.map((item, index) => {
								return (
									<option value={item.id} key={index}>{item.title}</option>
								)
							})

						}
					</FormControl>
				</FormGroup>
				<div className={cx(bt.textAlignRight, s.paddintTop, s.filterBtnContainer, 'filterBtnContainerRTL')}>
					<a className={cx(s.cancelBtn, 'modalcancelBtnRTL')} onClick={() => this.handleClear()}> {formatMessage(messages.clear)}</a>
					<Button className={cx(bt.btnSecondaryFull, s.applyBtn)} onClick={() => this.handleSubmit()}>
						<FormattedMessage {...messages.apply} />
					</Button>
				</div>

			</div>
		);
	}
}
const mapState = (state) => ({
	listId: state.onChangeListing.listId,
	payoutId: state.onChangeListing.payoutId,
});

const mapDispatch = {
	onChangeListingFilter,
	closeTransactionModal
};

export default compose(
	connect(mapState, mapDispatch),
	injectIntl,
	withStyles(s, bt),
	graphql(gql`
    	{
		    ManageListingTransaction {
		        id
                title
                isReady
            }
		}
    `,
		{
			name: 'manageListingTransaction',
			options: {
				ssr: false
			}
		}),
	graphql(gql`
    	query getPayouts {
		  getPayouts {
		    id
		    methodId
		    paymentMethod{
		      id
		      name
		    }
		    userId
		    payEmail
		    address1
		    address2
		    city
		    state
		    country
		    zipcode
		    currency
		    default
		    createdAt
            status
            last4Digits
		  }
		}
    `,
		{
			name: 'getPayouts',
			options: {
				ssr: false
			}
		}),
)(Listings);