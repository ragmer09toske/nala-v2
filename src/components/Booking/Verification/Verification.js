import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
	Button,
	Grid,
	Row, FormGroup,
	Col,
	FormControl,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Verification.css';
import { loadAccount } from '../../../actions/account';

// Locale
import messages from '../../../locale/messages';
import refreshIcon from '/public/SiteIcons/Refresh.svg';
import Faq from '../../Receipt/question.svg';

class Verification extends Component {
	static propTypes = {
		guestEmail: PropTypes.string.isRequired,
		resendEmailVerification: PropTypes.any.isRequired,
		formatMessage: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	async handleClick() {
		const { nextPage, loadAccount, account } = this.props;
		await loadAccount();
		if (account?.verification?.isEmailConfirmed) {
			nextPage('payment');
		}
	}

	render() {
		const { guestEmail, resendEmailVerification } = this.props;
		const { formatMessage } = this.props.intl

		const toolTipText = formatMessage(messages.refreshToolTip);

		function LinkWithTooltip({ children, href, tooltip }) {
			return (
				<OverlayTrigger
					overlay={<Tooltip className={s.tooltip}>{tooltip}</Tooltip>}
					placement="top"
					delayShow={300}
					delayHide={150}
				>
					{children}
				</OverlayTrigger>
			);
		}

		return (
			<Grid>
				<Row>
					<div className={s.pageContainer}>
						<div className={s.activationStepPanel}>
							<div className={s.panelBody}>
								<h3 className={s.heading}><FormattedMessage {...messages.checkEmail} /></h3>
								<FormGroup className={s.formGroup}>
									<FormControl value={guestEmail} className={cx(s.formControlInput, s.textCenter)} disabled />
								</FormGroup>
								<div className={cx(s.textLead, s.space4)}>
									{`${formatMessage(messages.verificationInfo1)} ${formatMessage(messages.verificationInfo2)}`}
								</div>
								<Col xs={12} sm={12} md={12} lg={12}>
									<Button className={cx(s.button, s.btnPrimary)} onClick={resendEmailVerification}>
										<FormattedMessage {...messages.resendEmail} />
									</Button>
									<div className={s.specialPriceIcon}>
										<span className={s.iconSection}>
											<img src={refreshIcon} className={cx(s.refreshImage, 'refreshImageRTL')} onClick={() => this.handleClick()} />
										</span>
										<div className={cx(s.tltip, s.relativeSection, 'verifyTipRTL')}>
											{toolTipText}
										</div>
									</div>
								</Col>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data,
});

const mapDispatch = {
	loadAccount
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Verification)));