import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';
import { Nav, NavDropdown } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';

// Modals
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import ForgotPassword from '../ForgotPassword';
import HeaderModal from '../HeaderModal';
import NavLink from '../NavLink';

// Locale
import messages from '../../locale/messages';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { openHeaderModal } from '../../actions/modalActions';

// Helpers
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { formatLocale } from '../../helpers/formatLocale';

//Image
import currencyIcon from '/public/SiteIcons/currencyIcon.svg';
import currencyIconTwo from '/public/SiteIcons/currencyIconTwo.svg';

class NavigationBeforeLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  render() {
    const { className, openLoginModal, openSignupModal, openHeaderModal, homeHeaderOnly } = this.props;
    const { toCurrency, baseCurrency, currentLocale, openClose, layoutType, becomeHeader } = this.props;
    let displayCurrency = toCurrency ? toCurrency : baseCurrency;

    return (
      <div>
        <LoginModal />
        <SignupModal />
        <ForgotPassword />
        <HeaderModal />
        <Nav pullRight className='normalHeader'>
          {homeHeaderOnly &&
            <div className={cx(s.centerMenu, s.tabViewHidden, 'hidden-xs', 'hidden-md', 'hidden-sm')}>
              <NavLink to="/#" className={cx(s.centerLink, s.dot, 'headerDotRTL', 'dotHeaderRTL', (layoutType == 2 ? 'centerLink2' : ''), (layoutType == 2 ? 'dot2' : ''))}>
                <FormattedMessage {...messages.placesToStay} />
              </NavLink>
              <NavLink to="/why-become-owner" className={cx(s.centerLink, 'centerLinkRTL', (layoutType == 2 ? 'centerLink2' : ''))}>
                <FormattedMessage {...messages.becomeAHost} />
              </NavLink>
            </div>}
          <NavLink to="/" className={cx("hidden-lg", s.newMenuDesign, 'borderNoneMb')}>
            <FormattedMessage {...messages.home} />
          </NavLink>
          {!homeHeaderOnly && !becomeHeader &&
          <NavLink to="/why-become-owner" className={cx(s.nonBreakPointScreen, 'hidden-xs', 'hidden-md', s.listCarCss, 'listCarCssRTL')}>
            <FormattedMessage {...messages.listyourCar} />
          </NavLink>
          }
          {
          layoutType != 2 &&
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx('hidden-xs', 'hidden-md', s.nonBreakPointScreen)}
          >
            {homeHeaderOnly &&
              <img src={currencyIcon} />
            }
            {!homeHeaderOnly &&
              <img src={currencyIconTwo} />
            }
          </NavLink>
        }
        {
          layoutType && layoutType == 2 && <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx('hidden-xs', 'hidden-md', s.nonBreakPointScreen)}
          >
            <img src={currencyIconTwo} />
          </NavLink>
        }
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx(s.breakPointScreen, "hidden-lg")}
          >
            <FormattedMessage {...messages.languageCurrency} />
          </NavLink>
          <NavLink to="#" noLink onClick={openLoginModal} className={cx(s.breakPointScreen, "hidden-lg")}>
            <FormattedMessage {...messages.login} />
          </NavLink>
          <NavLink to="#" noLink onClick={openSignupModal} className={cx(s.breakPointScreen, "hidden-lg")}>
            <FormattedMessage {...messages.signup} />
          </NavLink>
          <NavLink to="/help" className={cx(s.breakPointScreen, "hidden-lg")}>
            <FormattedMessage {...messages.help} />
          </NavLink>
          {/* <NavLink
            noLink
            onClick={(e) => openHeaderModal('currencyModal')}
            className={cx(s.breakPointScreen)}
          >
            {showCurrencySymbol(displayCurrency, currentLocale) + displayCurrency}
          </NavLink> */}
          <NavDropdown
            className={cx('hidden-xs', s.nonBreakPointScreen)} eventKey={3} title={
              <DropDownMenu homeHeaderOnly={homeHeaderOnly} />
            } noCaret id="basic-nav-dropdown"
          >
            <NavLink to="#" noLink onClick={openLoginModal} >
              <FormattedMessage {...messages.login} />
            </NavLink>
            <NavLink to="#" noLink onClick={openSignupModal}>
              <FormattedMessage {...messages.signup} />
            </NavLink>
            <NavLink to="/help">
              <FormattedMessage {...messages.help} />
            </NavLink>
          </NavDropdown>
        </Nav>
      </div>
    );
  }

}

const mapState = state => ({
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
  layoutType: state.siteSettings.data.homePageType
});
const mapDispatch = {
  openHeaderModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NavigationBeforeLogin)));
