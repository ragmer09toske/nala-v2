import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';

// Style
import {
	Button,
	Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import cs from '../../commonStyle.css';
// Component
import Link from '../../Link/Link';


// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Images
import stepIcon from '/public/AdminIcons/stepIcon.svg'
import expandUpIcon from '/public/AdminIcons/expandUpIcon.svg'
import expandDownIcon from '/public/AdminIcons/epandDownIcon.svg'

class CollapseButton extends Component {



	render() {
		const { buttonIcon, buttonLabel, menuActive, subMenuData, activeLocation, subMenuToggle, openClose, menu } = this.props;

		return (
			<li>
				<div className={cx({ [s.active]: activeLocation }, s.marginX)}>
					<Button
						bsStyle="link"
						className={cx(s.button, s.noPadding, s.buttonFlex, s.sideNavitem)}
						onClick={() => subMenuToggle(menu)}
					>
						<span><img src={buttonIcon} className={cx(s.sideNavIcon, s.marginRight10, s.sideNavIconPosition, "labelTextRTL")} alt={"icon"} /></span>
						<span className={cx(s.buttonFlexItemsInfo)}>{buttonLabel}</span>
						{
							menuActive && <span><img src={expandUpIcon} className={cx(s.navigationIcon, "navigationIconRtl")} alt={"expandUpIcon"} /></span>
						}

						{
							!menuActive && <span><img src={expandDownIcon} className={cx(s.navigationIcon, "navigationIconRtl")} alt={"expandDownIcon"} /></span>
						}
					</Button>
				</div>
				<Collapse in={menuActive} className={s.subMenu}>
					<ul>
						{
							subMenuData.map((item, index) => {
								return (
									<li className={cx({ [s.active]: item.activeLocation })}>
										<Link to={item.menuLocation} className={s.sideNavitem} onClick={() => openClose()}>
											<span><img src={item.icon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL", "sideNavIconRtl")} alt={item.iconAltText} /></span>
											<span>{item.menuName}</span>
										</Link>
									</li>
								)
							})
						}
					</ul>
				</Collapse>
			</li>
		)
	}
}

const mapState = (state) => ({

});

const mapDispatch = {

};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(CollapseButton)));