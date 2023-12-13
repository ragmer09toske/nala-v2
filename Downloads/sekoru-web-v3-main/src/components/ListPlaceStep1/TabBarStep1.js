// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, formPage } = this.props;
    let pathname = formPage;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
           { [s.active]: pathname === "car" })} title={formatMessage(messages.tabPlaceType)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("car")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabPlaceType} />
          </a>
        </div>
        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "map" })} title={formatMessage(messages.location)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("map")} href="javascript:void(0);">
            <FormattedMessage {...messages.location} />
          </a>
        </div>
        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "features" })} title={formatMessage(messages.carFeatures)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("features")} href="javascript:void(0);">
            <FormattedMessage {...messages.carFeatures} />
          </a>
        </div>
        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div >
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep1));

