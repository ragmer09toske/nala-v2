import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import cs from '../../components/commonStyle.css';
import s from './VerifiedInfo.css';

//Images
import tickIcon from '/public/siteImages/verifyTick.png';

class AccountItem extends Component {

  static propTypes = {
    itemName: PropTypes.string.isRequired
  };

  render() {
    const { itemName } = this.props;
    return (
      <div className={s.displayFlex}>
        <h4 className={cx(cs.commonMediumText, cs.fontWeightNormal)}>
          {itemName}
        </h4>
        <img src={tickIcon} className={s.tickIcon} />
      </div>
    );
  }
}

export default withStyles(s, cs)(AccountItem);