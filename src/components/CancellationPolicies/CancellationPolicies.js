import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

// Component
import Flexible from './Flexible';
import Moderate from './Moderate';
import Strict from './Strict';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history'

class CancellationPolicy extends React.Component {

  static propTypes = {
    policyType: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleSelect = (key) => {
    let policy = key === 1 ? 'Flexible' : (key === 2 ? 'Moderate' : 'Strict')
    history.push('/cancellation-policies/' + policy)
  }

  render() {
    const { policyType, siteName } = this.props;
    let policy = (policyType != 'Flexible' && policyType != 'Moderate' && policyType != 'Strict') ? 'Flexible' : policyType;
    return (
      <Grid>
        <Row className={s.landingContainer}>
          <Col lg={12} md={12} sm={12}>
            <h1 className={cx(s.commonTitleText, s.spaceBottom1, s.pageTitle, s.fontWeightBold)}>
              <FormattedMessage {...messages.cancellationPolicies} /></h1>
            <p className={s.spaceBottom6}>
              {siteName}{' '}<FormattedMessage {...messages.allowOwner} />
            </p>
            <div className={cx(cx(s.cancellationBg, 'cancellationBg', 'tabBarView', 'tabBarViewRTL'))}>
              <Tabs defaultActiveKey={policy === "Flexible" ? 1 : (policy === "Moderate" ? 2 : 3)} id="uncontrolled-tab-example" onSelect={(e) => this.handleSelect(e)} >
                <Tab eventKey={1} title={<FormattedMessage {...messages.flexible} />}>
                  <Flexible siteName={siteName} />
                </Tab>
                <Tab eventKey={2} title={<FormattedMessage {...messages.moderate} />}>
                  <Moderate siteName={siteName} />
                </Tab>
                <Tab eventKey={3} title={<FormattedMessage {...messages.strict} />}>
                  <Strict siteName={siteName} />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CancellationPolicy)));
