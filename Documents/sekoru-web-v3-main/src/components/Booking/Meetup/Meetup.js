import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
	Button,
	Grid,
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Meetup.css';
import cs from '../../../components/commonStyle.css';

// Component
import Avatar from '../../Avatar';

// Locale
import messages from '../../../locale/messages';

//Images
import arrow from '/public/siteImages/whiteArrow.svg';
import streeing from '/public/siteImages/steering.svg';

class Meetup extends Component {
	static propTypes = {
		hostDisplayName: PropTypes.string.isRequired,
		hostPicture: PropTypes.string,
		guestDisplayName: PropTypes.string,
		guestPicture: PropTypes.string,
		nextPage: PropTypes.any.isRequired,
		emailVerified: PropTypes.bool.isRequired,
		formatMessage: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { nextPage, emailVerified, guestPicture } = this.props;
		if (guestPicture === null) {
			nextPage('avatar');
		} else if (!emailVerified) {
			nextPage('verification');
		} else {
			nextPage('payment');
		}
	}

	render() {
		const { hostDisplayName, hostPicture, guestDisplayName, guestPicture } = this.props;

		return (
			<Grid fluid>
				<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
						<div className={s.activationStepPanel}>
							<h2 className={cx(cs.commonTitleText, cs.paddingBottom6, cs.fontWeightBold)}><FormattedMessage {...messages.meetupTitle} /> {hostDisplayName}</h2>
							<div className={cx(s.spaceTop5)}>
								<div className={s.displayFlex}>
									<div className={cs.positionRelative}>
										<Avatar
											source={hostPicture}
											title={hostDisplayName}
											className={cx(s.profileImage, cs.displayinlineBlock, s.mediaRound, cs.profileAvatarLink)}
										/>
										<Avatar
											isUser
											title={guestDisplayName}
											className={cx(s.profileImage, cs.displayinlineBlock, s.mediaRound, cs.profileAvatarLink)}
										/>
										<img
											src={streeing}
											className={cx(s.logoImage, s.mediaPhoto, s.highlightedIcon, 'RTLmeetUPStreeingIcon')}
										/>
									</div>
								</div>
								<p className={cx(cs.commonContentText, cs.paddingBottom4, cs.paddingTop6)}>
									<FormattedMessage {...messages.meetupInfo1} /> <FormattedMessage {...messages.meetupInfo2} />
								</p>
								<Button className={cs.btnPrimary} onClick={this.handleClick}>
									<span className={cs.vtrMiddle}><FormattedMessage {...messages.next} /></span>
									<img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default injectIntl(withStyles(s, cs)(Meetup));