import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLayout.css';
import cx from 'classnames';
import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../siteadmin/AdminFooter';
import SideBar from '../siteadmin/SideBar';
import history from '../../core/history';

class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    let location;
    if (history.location) {
      location = history.location.pathname
    }
    return (
      <div className={cx('adminstyle')}>
        <div className={cx(s.adminLayout)}>
          <div>
            <SideBar location={location} />
          </div>
          <div className={cx(cx(s.adminRsContainer, 'adminRsContainerRTL'))}>
            <AdminHeader />
            <div className={s.adminPaddingTop}>
              {this.props.children}
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AdminLayout);