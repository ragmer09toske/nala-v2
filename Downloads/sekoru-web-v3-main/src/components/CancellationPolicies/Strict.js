import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import s from './CancellationPolicies.css';

// Locale
import messages from '../../locale/messages';
class Strict extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.spaceTop3}>
        <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.strictContentOne} /></p>
        <p className={cx(s.commonContentText, s.spaceBottom4)}><FormattedMessage {...messages.strictContentTwo} /></p>
        <div>
          <div className={cx(s.cancelCard, s.cancelCardOne, s.spaceBottom3)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.strictBeforeSevenDay} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.strictBeforeSevenDayContentOne} /></p>
            <p className={cx(s.commonContentText)}><FormattedMessage {...messages.strictBeforeSevenDayContentTwo} /></p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardTwo, s.spaceBottom3)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.cancellationCheckIn} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.strictCheckInContentOne} /></p>
            <p className={cx(s.commonContentText)}><FormattedMessage {...messages.strictCheckInContentTwo} /></p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardThree)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.cancellationCheckOut} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.strictCheckOutContentOne} /></p>
          </div>
        </div>
        <hr className={s.horizontalLine} />
        <div className={s.cancelDescSec}>
          <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}>
            <FormattedMessage {...messages.cancellationDescription} />
          </h4>
          <ul className={cx(s.descListSpaceLeft, 'descListSpaceRightRTL')}>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct1} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.theWord} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct2} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct3} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct4} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct5} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct6} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>{siteName}{' '}
              <FormattedMessage {...messages.strct7} /></li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct8} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct9} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.strct10} />
            </li>
            <li className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.strct11} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(Strict));