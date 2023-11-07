// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListPlaceStep1.css';
import cx from 'classnames';
import PlaceMap from '../PlaceMap';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import Loader from '../Loader';

import messages from '../../locale/messages';
import validate from './validate';
import update from './update';
class Page6 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    locationMap: PropTypes.object,
    isMapTouched: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
  };

  renderPlaceMap = ({ input, label, meta: { touched, error }, lat, lng, isMapTouched, mapWarning, mapSuccess }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlaceMap
          {...input}
          lat={lat}
          lng={lng}
          isMapTouched={isMapTouched}
          mapWarning={mapWarning}
          mapSuccess={mapSuccess}
        />
      </div>
    )
  }

  render() {
    const { error, handleSubmit, previousPage, nextPage } = this.props;
    const { locationMap, isMapTouched, lat, lng, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = true;
    if (isMapTouched === true || locationMap != undefined) {
      isDisabled = false;
    }
    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step1HeadingNew)}
          landingContent={formatMessage(messages.stepPinText)}
        />
        <form onSubmit={handleSubmit}>
          {error && <strong>{formatMessage(error)}</strong>}
          <div className={s.landingMainContent}>
            <FormGroup className={s.formGroup}>
              {
                !lat && !lng && <Loader type={"text"} />
              }
              {
                lat && lng &&
                <Field
                  name="locationMap"
                  component={this.renderPlaceMap}
                  lat={lat}
                  lng={lng}
                  isMapTouched={isMapTouched}
                  mapWarning={formatMessage(messages.mapWarning)}
                  mapSuccess={formatMessage(messages.mapSuccess)}
                />
              }
            </FormGroup>
          </div>
          <FooterButton
            isDisabled={error || isDisabled}
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"features"}
            previousPagePath={"location"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    )
  }
}

Page6 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page6);


const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name
Page6 = connect(
  state => {
    const locationMap = selector(state, 'locationMap');
    const isMapTouched = selector(state, 'isMapTouched');
    const lat = selector(state, 'lat');
    const lng = selector(state, 'lng');
    return {
      locationMap,
      isMapTouched,
      lat,
      lng,
    }
  }
)(Page6);

export default injectIntl(withStyles(s)(Page6));
