import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialLogin.css';
import cs from '../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

//Images
import googleIcon from '/public/SiteIcons/googleIcon.svg';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string
  };

  handleClick(event) {
    const { isAdmin } = this.props;
    console.log(isAdmin, 'isAdminnn')
    if (isAdmin) {
      toastr.error('Error!', "You are logged in as admin, you can't perform this action!");
      event.preventDefault();
    }
  }

  render() {
    const { refer } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (
      <div className={cx(s.displayFlex, s.center)}>
        {/* <a className={cx(s.displayFlex, cs.siteTextColor, cs.commonMediumText, s.marginRight, cs.textDecorationNone, 'socialLoginMarginRightRTL')} href={FbURL}>
          <img src={faceBookIcon} className={'commonIconSpace'} />
          <FormattedMessage {...messages.facebook} />
        </a> */}
        <a className={cx(s.displayFlex, cs.siteTextColor, cs.commonMediumText, cs.textDecorationNone)} onClick={(event) => this.handleClick(event)} href={GoogleURL}>
          <img src={googleIcon} className={'iconGap'}/>
          <FormattedMessage {...messages.google} />
        </a>
      </div>
    );
  }
}

const mapState = state => ({
  isAdmin: state.runtime && state.runtime.isAdminAuthenticated,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SocialLogin)));