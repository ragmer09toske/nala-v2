// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import cx from 'classnames';
import {
  Navbar,
} from 'react-bootstrap';

// Internal Components
import Link from '../Link';
import Navigation from '../Navigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';
import HeaderLocationSearch from './HeaderLocationSearch';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

class HomeHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: [
      '/',
      '/home'
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      load: false,
      isOpen: false,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      load: true
    });
    this.handleDisableSearchPages();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.handleDisableSearchPages();
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if (showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location = history.location ? history.location.pathname : null;
    let searchHide = false;
    if (location && searchDisablePages.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = (searchHide) ? true : false;
    }

    this.setState({
      searchHide
    })
  }
  async openMenu() {
    this.setState({
      isOpen: true,
    })
    document.body.classList.add('headerModalOpen');
  }

  async openClose() {

    this.setState({
      isOpen: false,
    })
    document.body.classList.remove('headerModalOpen');
  }

  render() {
    const { siteSettings, borderLess, showMenu, toggleOpen, layoutType } = this.props;
    const { searchHide, load } = this.state;
    let borderClass, headerDesignClass;
    let location;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }

    if (layoutType && (layoutType == 1 || layoutType == 3 || layoutType == 4)) {
      headerDesignClass = 'headerNewDesign';
    }

    if (history.location) {
      location = history.location.pathname;
    }

    return (
      <div className={headerDesignClass}>
        <div className={s.root}>
          <Toaster />
          <LoadingBar />
          <Navbar className={cx(s.rentAllHeader, 'rentAllHeader', borderClass, s.headerFlexContainer, { [s.fixedHeader]: location === '/s' }, { ['homeHeader']: location === '/' || location === '/home' })}
            expanded={showMenu} onToggle={this.handleMenu}>
            <div className={cx(s.container, s.headerFlexBox)}>
              <Navbar.Header className={cx('logoPadding', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                <Navbar.Brand className={cx(s.homeLogo, 'navBrandRTL')}>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                </Navbar.Brand>
              </Navbar.Header>
              <div onClick={() => this.openMenu()}>
                <div className={'closebtnHidden'}>
                  <DropDownMenu homeHeaderOnly={true} />
                </div>
              </div>
              <div className={cx(`${(this.state.isOpen === true) ? s.menuOpen : s.menuClose}`, s.mobileMenu)}>
                <div className={cx(s.rightMenuClose, 'closebtnHidden')}>
                  <div className={s.closeButtonPosition}>
                    <div className={cx(s.closeColor, 'closeColorRTL')} onClick={() => this.openClose()} >
                      ×
                    </div>
                  </div>
                </div>
                {/* {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                } */}
                <div onClick={() => this.openClose()}>
                  <Navigation openClose={this.state.isOpen} homeHeaderOnly={true} />
                </div>
              </div>
            </div>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  layoutType: state.siteSettings.data.homePageType,
  showMenu: state.toggle.showMenu
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HomeHeader)));