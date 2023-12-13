import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListPlaceTips.css';
import {
  Grid,
  Row,
  Col } from 'react-bootstrap';

// Component
import ListPlaceStep1 from '../../components/ListPlaceStep1';


import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

class ListPlaceTips extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <Col xs={12} sm={5} md={5} lg={5} xsHidden>
        <div className={s.helpPanelContainer}>
          <div className={s.helpPanel}>
            <div className={s.helpPanelText}>
              <p>
                <span className={s.helpPanelTextTitle}><FormattedMessage {...messages.carType} /></span>
                <span><FormattedMessage {...messages.becomehostsidePanelOne} /></span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}><FormattedMessage {...messages.vehicleCategory} /></span>
                <span><FormattedMessage {...messages.becomehostsidePanelTwo} /></span>
              </p>
              <p>
                <span className={s.helpPanelTextTitle}><FormattedMessage {...messages.tabPricing} /></span>
                <span><FormattedMessage {...messages.becomehostsidePanelThree} /></span>
              </p>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default injectIntl(withStyles(s)(ListPlaceTips));

