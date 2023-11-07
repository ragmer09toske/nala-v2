// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
	Button,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import SaveButton from '../../components/Header/List/SaveButton';
import Loader from '../Loader';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
import messages from '../../locale/messages';

class FooterButton extends Component {

	static propTypes = {
		previousPage: PropTypes.any,
		nextPage: PropTypes.any,
		nextPagePath: PropTypes.any,
		previousPagePath: PropTypes.any,
	};

	render() {
		const {
			previousPage, nextPage, updateListingMap,
			isDisabled, nextPagePath, previousPagePath,
			type, isExistingList, mapUpdateLoading, loading, isAvailable, skipLabel, formPage,
			step, className, footerClass, isFinish, isSaving, isBlocking
		} = this.props;
		const { formatMessage } = this.props.intl;

		return (

			<div className={cx(s.nextPosition, 'nextPositionRTL', footerClass)}>
				<div className={s.nextBackButton}>
					<SaveButton
						step={step}
						formPage={formPage}
						className={s.saveExit}
						isSaving={isSaving}
						isBlocking={isBlocking}
					/>
					<div className={cx(s.nextBackButton, 'btnSmallMb')}>
						<Button className={cx(s.btnPrimaryBorder, 'backBtnRTL')} onClick={() => previousPage(previousPagePath)}>
							<FormattedMessage {...messages.back} />
						</Button>

						{!type && <Button className={cx(s.btnPrimary)} disabled={isDisabled} onClick={() => nextPage(nextPagePath)}>
							{skipLabel ? (isAvailable ? <FormattedMessage {...messages.next} /> : <FormattedMessage {...messages.skip} />) : <FormattedMessage {...messages.next} />}
						</Button>}
						{
							type && type == "submit" && <Button className={cx(s.btnPrimary)} disabled={isDisabled} type="submit">
								{isFinish ? <FormattedMessage {...messages.finish} /> : <FormattedMessage {...messages.next} />}
							</Button>
						}
						{
							type && type != 'submit' && isExistingList && <div className={s.displayInlineBlock}>
								<Loader
									type={"button"}
									label={formatMessage(messages.next)}
									show={mapUpdateLoading}
									disabled={isDisabled}
									className={cx(s.btnPrimary, 'arButtonLoader')}
									handleClick={() => updateListingMap()}
								/>
							</div>
						}
						{
							type && type != 'submit' && !isExistingList && <div className={s.displayInlineBlock}>
								<Loader
									type={"button"}
									label={formatMessage(messages.next)}
									buttonType={"submit"}
									show={loading}
									disabled={isDisabled}
									className={cx(s.btnPrimary)}
								/>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	isExistingList: state.location.isExistingList,
	loading: state.loader.location,
	mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FooterButton)));