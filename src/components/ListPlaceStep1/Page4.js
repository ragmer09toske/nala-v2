// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Internal Component
import IncrementButton from '../IncrementButton';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import update from './update';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Page4 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    bathrooms: PropTypes.number,
    isExistingList: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      bathrooms: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bathroomType: []
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        bathrooms: listingFields.bathrooms[0],
        bathroomType: listingFields.bathroomType,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        bathrooms: listingFields.bathrooms[0],
        bathroomType: listingFields.bathroomType,
      });
    }
  }

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const { isExistingList } = this.props;
    const { bathrooms, bathroomType } = this.state;
    let path = isExistingList ? "map" : "location";

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, 'arrowPosition')}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.howManyBathrooms} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field
                      name="bathrooms"
                      type="text"
                      component={IncrementButton}
                      labelSingluar={bathrooms.itemName}
                      labelPlural={bathrooms.otherItemName}
                      maxValue={bathrooms.endValue}
                      minValue={bathrooms.startValue}
                      incrementBy={0.5}
                    />
                  </FormGroup>
                  <FormGroup className={s.formGroup}>
                    <Field name="bathroomType" component={CommonFormComponent} inputClass={cx(s.formControlSelect, s.jumboSelect)} >
                      {
                        bathroomType.map((value, key) => {
                          return (
                            value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                          )
                        })
                      }
                    </Field>
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, 'floatRightRTL')} onClick={() => previousPage("bedrooms")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, 'floatLeftRTL')} onClick={() => nextPage(path)}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    )
  }
}

Page4 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page4);

const mapState = (state) => ({
  isExistingList: state.location.isExistingList,
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page4)));
