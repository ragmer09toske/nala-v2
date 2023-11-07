import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SeeAll.css';
import cs from '../../../components/commonStyle.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import history from '../../../core/history';
//
import arrowIcon from '/public/SiteIcons/viewAllArrow.svg';

class SeeAll extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/s');
  }

  render() {
    return (
      <div className={cx(s.seeAllContainer)}>
        <Button className={cx(s.seeAllBtnnew, cs.fontWeightMedium)} onClick={() => this.handleClick()}>
          <span className={cs.vtrMiddle}><FormattedMessage {...messages.viewAllText} /></span>
          <img src={arrowIcon} className={'viewArrowLeft'} />
        </Button>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, cs)(SeeAll));