import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListNavigation.css';

// Locale
import TabBarStep from '../../ListPlaceStep1/TabBarStep';

class ListNavigation extends React.Component {

  static propTypes = {
    step: PropTypes.number.isRequired,
    formPage: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { step, formPage } = this.props;
    return (
      <div>
        <TabBarStep step={step} formPage={formPage} />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListNavigation));
