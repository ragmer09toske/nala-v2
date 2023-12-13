import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyList.css';
import bt from '../../../components/commonStyle.css';
import NoDataView from '../../NoDataView/NoDataView';
import noDataIcon from '/public/SiteIcons/noPayoutMethod.svg'
import plusIcon from '/public/SiteIcons/lightPlusIcon.svg'

// Redirection
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class EmptyList extends Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  render() {
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(bt.commonBorderSection, 'whiteBgColor')}>
        <h5 className={cx(bt.commonTotalText, bt.fontWeightBold)}>{formatMessage(messages.payoutMethod)}</h5>
        <div className={s.noTransactionSectionSpace}>
          <NoDataView
            title={formatMessage(messages.addPayoutMethod)}
            siteTitle={siteName}
            content1={formatMessage(messages.paymentReleaseInfo1)}
            content2={formatMessage(messages.paymentReleaseInfo2)}
            noDataIcon={noDataIcon}
            noDataImgSize={bt.noDataImgSize}
            noDataIconSec={s.noDataIconSec}/>
          <div className={cx(bt.dFlex, bt.justifyCenter)}>
            <Link to={"/user/addpayout"} className={cx(bt.btnPrimary, bt.dFlex, bt.btnTextBrk, bt.btnMediumPadding)}>
              <img src={plusIcon} className={cx(bt.spaceRight1, 'iconSpaceLeftRTL')} alt='' />
              <FormattedMessage {...messages.addNewLabel} /></Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
});
const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EmptyList)));