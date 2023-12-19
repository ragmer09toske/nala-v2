import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PerfectCarBlock.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import DiscoverBg from './slider1.jpg';

import history from '../../../core/history';


class PerfectCarBlock extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/s');
  }

  render() {
    const { title, staticInfo } = this.props;
    return (
      <div className={s.bannerSection}>
        <div className={s.DiscoverHost} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carBlockImage1})` }} />
        <div className={s.container}>
          <div className={s.InnerDiscover}>
            <div className={s.DiscoverTable}>
              <h2>{staticInfo && staticInfo.carBlockTitle1}</h2>
              <h1>{staticInfo && staticInfo.carBlockTitle2}</h1>
              <p>{staticInfo && staticInfo.carBlockContent1}</p>
              <div className={s.DiscoverBtn}>
                <Button className={cx(s.btn, s.btnPrimary)} onClick={this.handleClick}> <FormattedMessage {...messages.PerfectCarButton} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(PerfectCarBlock));
