import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelWrapper.css';
import cx from 'classnames';
// Component
import HomeSlider from "../../../Home/HomeSlider";
// Locale
import messages from '../../../../locale/messages';
import ManageListingsQuery from './ManageListingsProfile.graphql';

class PanelWrapper extends Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
		formatMessage: PropTypes.any,
	};
	static defaultProps = {
		ManageListingsData: {
			ManageListingsProfile: [],
			loading: true
		}
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { ManageListingsData: { loading, ManageListingsProfile }, firstName } = this.props;
		return (
			<>
				{ManageListingsProfile && ManageListingsProfile.length > 0 && <>
					<div className={s.lineCss}></div>
					<h3 className={cx(s.sliderHeader,s.space2)}>{firstName}'s {ManageListingsProfile.length > 1 ? <FormattedMessage {...messages.cars} /> : <FormattedMessage {...messages.car} />}</h3>
					<div >
						{
							!loading && <HomeSlider
								data={ManageListingsProfile}
								fromPage={"viewProfile"}
								hideHeading={true}
							/>
						}
					</div> </>}
			</>
		);
	}
}

export default compose(
	injectIntl,
	withStyles(s),
	graphql(ManageListingsQuery, {
		name: 'ManageListingsData',
		options: (props) => ({
			variables: {
				userId: props.userId,
			},
			fetchPolicy: 'network-only',
		})
	}),
)(PanelWrapper);