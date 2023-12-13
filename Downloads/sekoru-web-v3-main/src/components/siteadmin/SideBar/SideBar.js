import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import cs from '../../commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
// Component
import Link from '../../Link';
import CollapseButton from './CollapseButton';
import Logo from '../../../components/Logo';
// Translation
import history from '../../../core/history';
import messages from '../../../locale/messages';
import { adminLogout } from '../../../actions/siteadmin/logout';
import { openHeaderModal } from '../../../actions/modalActions';
//local
import { formatLocale } from '../../../helpers/formatLocale';
import { validatePrivilege } from '../../../helpers/adminPrivileges';
import { getAdminSideMenu } from '../../../helpers/getAdminSideMenu';
//Images
import logoutIcon from '/public/AdminIcons/ce2b5b26.svg';
import languageIcon from '/public/languageIcon.svg';
import manageAdminsIcon from '/public/AdminIcons/manageAdmin.svg'
import AdminReviewsIcon from '/public/AdminIcons/adminReviews.svg'
import homePageSettingsIcon from '/public/AdminIcons/homePageSettings.svg'
import ownerPageIcon from '/public/AdminIcons/ownerPage.svg'
import stepIcon from '/public/AdminIcons/stepIcon.svg'
import waveHandIcon from '/public/AdminIcons/welcomeHand.png'
import dashBoardIcon from '/public/AdminIcons/dashboardIcon.svg'

class SideBar extends Component {

	static defaultProps = {
		isSuperAdmin: false,
		privileges: []
	};

	constructor(props) {
		super(props);
		this.state = {
			step1: false,
			step3: false,
			home: false,
			whyHost: false,
			location: '',
			subAdmin: false,
		};
		this.openMenu = this.openMenu.bind(this);
		this.openClose = this.openClose.bind(this);
		this.subMenuToggle = this.subMenuToggle.bind(this);
	}

	componentDidMount() {
		this.setState({
			location: history.location.pathname
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { location } = this.props;
		if (prevState.location !== location) {
			this.setState({
				location
			})
		}
	}

	openMenu() {
		this.setState({
			isOpen: 1,
		})
	}
	openClose() {
		this.setState({
			isOpen: 0,
		})
	}

	subMenuToggle(fieldName) {
		this.setState({
			[fieldName]: !this.state[fieldName],
		})
	}

	render() {
		const { adminLogout } = this.props;
		const { openHeaderModal, currentLocale, isSuperAdmin, privileges } = this.props;
		const { formatMessage } = this.props.intl;
		const { location } = this.state;

		const reviewManagementArray = ['/siteadmin/reviews', '/siteadmin/reviews/edit-review/', '/siteadmin/write-reviews', '/siteadmin/edit-review/'];
		const homePageArray = ['/siteadmin/home/caption', '/siteadmin/home/banner', '/siteadmin/home/footer-block', '/siteadmin/popularlocation', '/siteadmin/home/static-info-block', '/siteadmin/home/home-banner', '/siteadmin/home/whychoose-section', '/siteadmin/home/mobileapps-section', '/siteadmin/popularlocation/add', '/siteadmin/home/find-your-car'];
		const whyBecomeHostPageArray = ['/siteadmin/whyHost/Block1', '/siteadmin/whyHost/Block2', '/siteadmin/whyHost/Block3',
			'/siteadmin/whyHost/Block4', '/siteadmin/whyHost/Block5', '/siteadmin/whyHost/Block6', '/siteadmin/whyHost/Block7', '/siteadmin/whyHost/review', '/siteadmin/whyHost/review/add'];
		const listSettingStep1 = ['/siteadmin/listsettings/1', '/siteadmin/listsettings/20', '/siteadmin/listsettings/3', '/siteadmin/listsettings/4',
			'/siteadmin/listsettings/10', '/siteadmin/listsettings/21'];
		const listSettingStep3 = ['/siteadmin/listsettings/13', '/siteadmin/listsettings/14', '/siteadmin/listsettings/15', '/siteadmin/listsettings/16',
			'/siteadmin/listsettings/18', '/siteadmin/listsettings/19'];
		const adminManagementArray = ['/siteadmin/admin-users', '/siteadmin/admin-roles'];

		const { sideMenuData1, sideMenuData2, sideMenuData3, sideMenuData4, sideMenuData5, sideMenuData6, sideMenuData7, sideMenuData8 } = getAdminSideMenu(formatMessage, location);

		return (
			<div className='adminCollapse'>
				<div className={cx(s.mobileHeader)}>
					<div onClick={() => this.openMenu()}>
						<div className={cx("hamburger")}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</div>
					</div>
					<div>
						<Link to={''} onClick={() => adminLogout()} className={cx(s.logoutIconMobile)}>
							<div className={cx(s.logoutIcon, 'logoutIconRTL')}><img src={logoutIcon} /></div>
						</Link>
					</div>
				</div>
				<div className={cx({ [s.menuOpen]: this.state.isOpen == 1 },{ ["menuOpenRtl"]: this.state.isOpen == 1 }, s.sidebarContainer, "sidebarContainerRtl")}>
					<div className={cx({ [s.menuClose]: this.state.isOpen == 0 })}>
						<div className={cx(s.closeColor, 'closeColorMbRTL')} onClick={() => this.openClose()} >
							×
						</div>
					</div>
					<div className={cx(s.sidebarNavParent, "hidden-print")}>
						<div className={cx(s.sideBarWelcome)}>
							<Logo />
							<div className={s.welcomeHeadingContainer}>
								<h3 className={cx(cs.spaceTop1, cs.noMarginBottom, s.welcomeHeading)}>
									<span className={cx(s.waveHandMarginRight, 'waveHandMarginRightRTL')}>
										<img src={waveHandIcon} className={cx(s.waveHand)} />
									</span>
									<span><FormattedMessage {...messages.welcomeAdmin} /></span>
								</h3>
							</div>
						</div>
						<ul className={s.sidebarNav}>
							<li className={s.tabViewSection}>
								<Link className={cx(s.sideNavitem)} onClick={(e) => openHeaderModal('languageModal')}>
									<span><img src={languageIcon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} /></span>
									<span>{formatLocale(currentLocale)}</span>
								</Link>
							</li>
							<li className={cx({ [s.active]: location == '/siteadmin' })}>
								<Link to={'/siteadmin'} className={s.sideNavitem} onClick={() => this.openClose()}>
									<span><img src={dashBoardIcon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} alt={"dashboardIcon"} /></span>
									<span><FormattedMessage {...messages.dashboard} /></span>
								</Link>
							</li>

							{
								sideMenuData1.map((item, index) => {
									if (item.isValidatePrivilege) {
										return (
											validatePrivilege(item.privilegeId, privileges) && <li className={cx({ [s.active]: item.activeLocation })}>
												<Link to={item.menuLocation} className={s.sideNavitem} onClick={() => this.openClose()}>
													<span><img src={item.icon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} alt={item.iconAltText} /></span>
													<span>{item.menuName}</span>
												</Link>
											</li>
										)
									} else if ((item.isSuperAdmin && isSuperAdmin)) {
										return (
											<li className={cx({ [s.active]: item.activeLocation })}>
												<Link to={item.menuLocation} className={s.sideNavitem} onClick={() => this.openClose()}>
													<span><img src={item.icon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} alt={item.iconAltText} /></span>
													<span>{item.menuName}</span>
												</Link>
											</li>)
									}
								})
							}
							{
								isSuperAdmin && <CollapseButton
									buttonIcon={manageAdminsIcon}
									buttonLabel={formatMessage(messages.manageAdmin)}
									menuActive={this.state.subAdmin}
									subMenuData={sideMenuData2}
									activeLocation={adminManagementArray.includes(location)}
									subMenuToggle={this.subMenuToggle}
									openClose={this.openClose}
									menu={'subAdmin'}
								/>
							}
							{validatePrivilege(6, privileges) && <CollapseButton
								buttonIcon={AdminReviewsIcon}
								buttonLabel={formatMessage(messages.adminReviews)}
								menuActive={this.state.adminReview}
								subMenuData={sideMenuData4}
								activeLocation={reviewManagementArray.includes(location) || location.startsWith('/siteadmin/edit-review/')}
								subMenuToggle={this.subMenuToggle}
								openClose={this.openClose}
								menu={'adminReview'}

							/>
							}
							{
								sideMenuData3.map((item, index) => {
									if (item.isValidatePrivilege) {
										return (
											validatePrivilege(item.privilegeId, privileges) && <li className={cx({ [s.active]: item.activeLocation })}>
												<Link to={item.menuLocation} className={s.sideNavitem} onClick={() => this.openClose()}>
													<span><img src={item.icon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} alt={item.iconAltText} /></span>
													<span>{item.menuName}</span>
												</Link>
											</li>
										)
									} else if (item.isSuperAdmin && isSuperAdmin) {
										return (
											<li className={cx({ [s.active]: item.activeLocation })}>
												<Link to={item.menuLocation} className={s.sideNavitem} onClick={() => this.openClose()}>
													<span><img src={item.icon} className={cx(s.sideNavIcon, s.marginRight10, "labelTextRTL")} alt={item.iconAltText} /></span>
													<span>{item.menuName}</span>
												</Link>
											</li>)
									}
								})
							}
							{validatePrivilege(15, privileges) && <CollapseButton
								buttonIcon={homePageSettingsIcon}
								buttonLabel={formatMessage(messages.homePageSettings)}
								menuActive={this.state.home}
								subMenuData={sideMenuData5}
								activeLocation={(location.startsWith('/siteadmin/edit/popularlocation') || homePageArray.includes(location))}
								subMenuToggle={this.subMenuToggle}
								openClose={this.openClose}
								menu={'home'}
							/>}
							{validatePrivilege(16, privileges) && <CollapseButton
								buttonIcon={ownerPageIcon}
								buttonLabel={formatMessage(messages.whyBecomeOwnerPage)}
								menuActive={this.state.whyHost}
								subMenuData={sideMenuData6}
								activeLocation={whyBecomeHostPageArray.includes(location) || location.startsWith('/siteadmin/whyHost/review/edit/')}
								subMenuToggle={this.subMenuToggle}
								openClose={this.openClose}
								menu={'whyHost'}
							/>}
							{validatePrivilege(17, privileges) &&
								<CollapseButton
									buttonIcon={stepIcon}
									buttonLabel={formatMessage(messages.carSettingsForStep) + '1'}
									menuActive={this.state.step1}
									subMenuData={sideMenuData7}
									activeLocation={listSettingStep1.includes(location)}
									subMenuToggle={this.subMenuToggle}
									openClose={this.openClose}
									menu={'step1'}
								/>}
							{validatePrivilege(17, privileges) && <CollapseButton
								buttonIcon={stepIcon}
								buttonLabel={formatMessage(messages.carSettingsForStep) + '3'}
								menuActive={this.state.step3}
								subMenuData={sideMenuData8}
								activeLocation={listSettingStep3.includes(location)}
								subMenuToggle={this.subMenuToggle}
								openClose={this.openClose}
								menu={'step3'}
							/>}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	currentLocale: state.intl.locale,
	isSuperAdmin: state.runtime.isSuperAdmin,
	privileges: state.account.privileges && state.account.privileges.privileges && state.account.privileges.privileges,
});

const mapDispatch = {
	adminLogout,
	openHeaderModal
};
export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SideBar)));