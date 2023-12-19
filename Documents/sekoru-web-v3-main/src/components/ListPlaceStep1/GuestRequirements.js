import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';
import FooterButton from './FooterButton';

import updateStep3 from './updateStep3';
// Locale
import messages from '../../locale/messages';
class GuestRequirements extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      guestRequirements: [],
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { validlistingFields, valid, listingFields } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { guestRequirements, isDisabled } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <h3 className={cx(s.landingContentTitle, s.space5)}><FormattedMessage {...messages.guestRequirementsTitle} /></h3>
            <p className={cx(s.landingStep3, s.space3)}><span><FormattedMessage {...messages.guestRequirementsDescription} /></span></p>
            <form onSubmit={handleSubmit}>
              <ul className={cx('list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
                {
                  guestRequirements.map((item, key) => {
                    if (item.isEnable === "1") {
                      return (
                        <li key={key}>
                          <FontAwesome.FaCheck className={cx(s.checkIcon, 'checkIconRTL')} />
                          <span className={cx(s.landingStep3, s.space3)}>
                            {item.itemName}
                          </span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              <FooterButton
                isDisabled={isDisabled}
                nextPage={nextPage}
                previousPage={previousPage}
                nextPagePath={"local-laws"}
                previousPagePath={"review-how-renters-book"}
                formPage={formPage}
                step={step}
              />
            </form>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

GuestRequirements = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(GuestRequirements);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(GuestRequirements)));
