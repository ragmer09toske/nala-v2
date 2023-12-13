import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class Moderate extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.spaceTop3}>
        <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.moderateContentOne} /></p>
        <p className={cx(s.commonContentText, s.spaceBottom4)}><FormattedMessage {...messages.moderateContentTwo} /></p>
        <div>
          <div className={cx(s.cancelCard, s.cancelCardOne, s.spaceBottom3)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.moderateBeforeFiveDay} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.moderateBeforeFiveDayContentOne} /></p>
            <p className={cx(s.commonContentText)}><FormattedMessage {...messages.moderateBeforeFiveDayContentTwo} /></p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardTwo, s.spaceBottom3)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.cancellationCheckIn} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.moderateCheckInContentOne} /></p>
            <p className={cx(s.commonContentText)}><FormattedMessage {...messages.moderateCheckInContentTwo} /></p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardThree)}>
            <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.cancellationCheckOut} /></h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}><FormattedMessage {...messages.moderateCheckOutContentOne} /></p>
          </div>
        </div>
        <hr className={s.horizontalLine} />
        <div className={s.cancelDescSec}>
          <h4 className={cx(s.commonContentText, s.fontWeightMedium, s.spaceBottom3)}><FormattedMessage {...messages.cancellationDescription} />
          </h4>
          <ul className={cx(s.descListSpaceLeft, 'descListSpaceRightRTL')}>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.mode1} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.theWord} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode2} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode3} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.mode4} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.mode5} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode6} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>{siteName}{' '}
              <FormattedMessage {...messages.mode7} /></li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.mode8} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.mode9} />
              {' '}{siteName}{' '}
              <FormattedMessage {...messages.mode10} />
            </li>
            <li className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.mode11} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(Moderate));