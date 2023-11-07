// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListPlaceStep1.css';
import cs from '../../components/commonStyle.css';
import cx from 'classnames';
import Logo from '../Logo';
//Image
import footerImage from '/public/siteImages/stepFooter.svg';

class SidePanel extends Component {

	static propTypes = {
		title: PropTypes.any,
		landingContent: PropTypes.any,
	};

	render() {
		const { title, landingContent } = this.props;
		return (
			<div>
			<div className={cx(s.leftBg, 'leftBgRTL')} />
				<div className={s.titleWidth}>
					<Logo link={"/"} className={cx(s.brandImg)} />
					<h2 className={cx(cs.spaceBottom2, s.stepSizeCss, cs.fontWeightNormal)}>{title}</h2>
					<h3 className={cx(cs.commonTitleText, cs.fontWeightBold)}>{landingContent}</h3>
					<img src={footerImage} className={cx(s.stepFooterImage, 'stepFooterImageRTL')} />
				</div>
			</div>
		)
	}
}


export default withStyles(s, cs)(SidePanel);