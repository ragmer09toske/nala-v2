import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Button,
	Grid,
	Row,
	Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AvatarUpload.css';
import cs from '../../commonStyle.css';
import { graphql, gql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Component
import Avatar from '../../Avatar';
import DropZone from '../../Dashboard/DropZone';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';
import arrow from '/public/siteImages/whiteArrow.svg';

class AvatarUpload extends Component {
	static propTypes = {
		profilePhotoLoading: PropTypes.bool,
		guestPicture: PropTypes.string,
		guestDisplayName: PropTypes.string.isRequired,
		nextPage: PropTypes.any.isRequired,
		emailVerified: PropTypes.bool.isRequired,
		formatMessage: PropTypes.any,
	};

	static defaultProps = {
		profilePictureData: {
			loading: true
		},
		profilePhotoLoading: false
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { nextPage, emailVerified } = this.props;
		if (emailVerified) {
			nextPage('payment');
		} else {
			nextPage('verification');
		}
	}

	render() {
		const { profilePictureData: { loading, userAccount }, guestPicture, guestDisplayName, profilePhotoLoading } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<Grid>
				<Row>
					<div className={s.pageContainer}>
						<div className={s.activationStepPanel}>
							<div className={s.panelBody}>
								<h3 className={s.heading}>
									<span><FormattedMessage {...messages.addProfilePhoto} /></span>
								</h3>
								<Loader
									show={profilePhotoLoading}
									type={"page"}
								>
									<div className={cx(s.space4, s.spaceTop4)}>
										<div className={s.space2}>
											{
												loading ? 'Loading...' : <Avatar
													height={124}
													width={124}
													isUser
													title={guestDisplayName}
													className={cs.profileAvatarLink}
												/>
											}
										</div>
									</div>
								</Loader>
								<div className={cx(s.noPadding)}>
									<DropZone
										guestPicture={guestPicture}
										defaultMessage={formatMessage(messages.updatePhotoLabel)}
										className={'dashboardDropzone'}
										iconPosition={'dashboardUploadIcon'}
									/>

								</div>
								<div className={cx(s.textLead)}>
									<FormattedMessage {...messages.uploadInfo} />
								</div>
								<div>
								{
										guestPicture &&<Button
										className={cx(cs.btnPrimary)}
										onClick={this.handleClick}
									>
										<span className={cs.vtrMiddle}><FormattedMessage {...messages.continue} /></span>
										<img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
									</Button>
									}
								</div>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
}
const mapState = (state) => ({
	profilePhotoLoading: state.account.profilePhotoLoading
});

const mapDispatch = {
};

export default compose(
	injectIntl,
	withStyles(s, cs),
	connect(mapState, mapDispatch),
	graphql(gql`
		query {
			userAccount {
				picture
			}
		}
	  `, {
		name: 'profilePictureData',
		options: {
			ssr: false
		}
	}),
)(AvatarUpload);