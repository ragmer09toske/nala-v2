import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Google Places Suggest Component
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';

// Redux  Action
import { setPersonalizedValues } from '../../actions/personalized';

// Redux actions
import { getLocationData } from '../../actions/getLocation';

// Constants
import { googleMapAPI } from '../../config';

class PlaceSuggest extends Component {

  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    setPersonalizedValues: PropTypes.any,
    googleMaps: PropTypes.object,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      geography: PropTypes.string
    })
  };

  static defaultProps = {
    personalized: {
      location: null
    }
  }

  constructor(props) {
    super(props);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  onSuggestSelect(data) {
    return data ? this.props.getLocationData(data.description) : '';
  }

  render() {
    const { label, className, containerClassName, personalized } = this.props;

    return (
      <div>
        <ReactGoogleMapLoader
          params={{
            key: googleMapAPI, // Define your api key here
            libraries: "places", // To request multiple libraries, separate them with a comma
          }}
          render={googleMaps =>
            googleMaps && (
              <Geosuggest
                ref={el => this._geoSuggest = el}
                placeholder={label}
                inputClassName={className}
                className={containerClassName}
                initialValue={personalized.location}
                // onChange={this.onChange}
                onSuggestSelect={this.onSuggestSelect}
                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}
                }
                autoComplete='off'
              />
            )}
        />
      </div>
    )
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  setPersonalizedValues,
  getLocationData
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceSuggest));