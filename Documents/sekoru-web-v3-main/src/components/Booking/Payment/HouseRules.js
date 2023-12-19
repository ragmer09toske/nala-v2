import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../../commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

//Imgae
import tickIcon from '/public/SiteIcons/rulesIcon.svg';

class HouseRules extends Component {
  static propTypes = {
    houseRules: PropTypes.array.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { hostDisplayName, houseRules } = this.props;

    return (
      <>
        <h4 className={cx(s.titleText, cs.paddingBottom2)}>
          3. <FormattedMessage {...messages.readText} /> {hostDisplayName}'s <FormattedMessage {...messages.carRules} />
        </h4>
        <p className={cx(cs.commonContentText, cs.paddingBottom2)}><FormattedMessage {...messages.readText} /> {hostDisplayName}'s <FormattedMessage {...messages.rulesDes} /></p>
        {
          houseRules.map((item, index) => {
            if (item.listsettings.isEnable === "1") {
              return (
                <h5 className={cx(s.houseRules, cs.paddingTop2, cs.commonContentText, cs.fontWeightNormal)} key={index}>
                  <img src={tickIcon} className={'commonIconSpace'} />
                  <span>{item.listsettings.itemName}</span>
                </h5>
              )
            }
          })
        }
      </>
    );
  }
}

export default injectIntl(withStyles(s, cs)(HouseRules));

