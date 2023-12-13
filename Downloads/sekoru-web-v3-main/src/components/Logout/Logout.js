import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';

import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './NavigationAfterLogin.css';
import { Button } from 'react-bootstrap';
import logoutIcon from '/public/AdminIcons/logoutIcon.svg'
// Locale
import messages from '../../locale/messages';
import cx from 'classnames';
import cs from '../../components/commonStyle.css'
class Logout extends React.Component {

  static propTypes = {
  };

  render() {
    const { className, showIcon, url } = this.props;
    return (
      <li className={className}>
        <form action={url ? url : "/logout"} method="post">
          <Button type="submit" bsStyle="link">
            {showIcon && <span className={cx(cs.marginRight8, "marginRight8", "marginRight8RTL")}>
              <img src={logoutIcon} />
            </span>}
            <FormattedMessage {...messages.logout} />
          </Button>
        </form>
      </li>
    );
  }

}

export default injectIntl(withStyles(cs)(Logout));
