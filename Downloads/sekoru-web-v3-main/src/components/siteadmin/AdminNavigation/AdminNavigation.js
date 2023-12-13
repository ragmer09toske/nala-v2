import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Nav } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import cx from 'classnames';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import cs from '../../../components/commonStyle.css'
import s from './AdminNavigation.css';

// Internal Components
import NavLink from '../../NavLink';
import Logout from '../../Logout';
import HeaderModal from '../../HeaderModal';

import { adminLogout } from '../../../actions/siteadmin/logout';
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';
import messages from '../../../locale/messages';
//local
import languageIcon from '/public/AdminIcons/languageIcon.svg'
import goToHomeIcon from '/public/AdminIcons/gotoMainIcon.svg'
import checkUserStatusQuery from './getCheckUserStatus.graphql';
class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { openHeaderModal, currentLocale, adminLogout } = this.props;
    const { checkLoginUserExist: { userExistloading, getUserExists } } = this.props;
    if (!userExistloading && getUserExists) {
      if (getUserExists.status == 400) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          adminLogout();
          window.location.reload();
        }
      }
    }
    return (
      <Nav pullRight className={cx("adminHeaderNavRtl")}>
        <NavLink to="/" >
          <span className={cx(cs.marginRight8, "marginRight8", "marginRight8RTL", "siteAdminHeaderLink")}>
            <img src={goToHomeIcon} />
          </span>
          <FormattedMessage {...messages.GotoMainSite} />
        </NavLink>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
        >
          <span className={cx(cs.marginRight8, "marginRight8", "marginRight8RTL", "siteAdminHeaderLink")}>
            <img src={languageIcon}/>
          </span>
          <span>{formatLocale(currentLocale)}</span>
        </NavLink>
        <Logout url={'/admin-logout'} showIcon={true} />
        <HeaderModal />
      </Nav>
    );
  }

}

const mapState = state => ({
  currentLocale: state.intl.locale
});
const mapDispatch = {
  openHeaderModal,
  adminLogout
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(checkUserStatusQuery, {
    name: 'checkLoginUserExist',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  })
)(AdminNavigation);