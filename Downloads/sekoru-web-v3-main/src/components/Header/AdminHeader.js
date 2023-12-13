// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import cx from 'classnames';
import {
  Navbar,
} from 'react-bootstrap';

// Internal Components
import AdminNavigation from '../siteadmin/AdminNavigation';


// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';

class AdminHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool
  };

  static defaultProps = {
    borderLess: false
  }

  render() {
    const { siteSettings, borderLess } = this.props;
    let borderClass;
    if (borderLess) {
      borderClass = s.rentAllHeaderBorderLess;
    }
    return (
      <div className={s.adminRoot}>
        <Toaster />
        <LoadingBar />
        <Navbar fluid className={cx(s.rentAllHeaderAdmin, 'rentAllCarSiteAdminHeader', 'rentAllAdminHeader', 'rentallAdminHeaderNoBorder', 'visibleWebView')} collapseOnSelect>
          {/* <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs')}>
                <Logo link={"/siteadmin"} className={cx(s.brandAdmin, s.brandImg)} />
              </Navbar.Brand>
            </Navbar.Header> */}
          <Navbar.Collapse>
            <AdminNavigation />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminHeader));