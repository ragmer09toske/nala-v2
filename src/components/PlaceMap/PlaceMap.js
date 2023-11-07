// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux actions
import { change } from 'redux-form';

// Google Places Map Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";

import { GoogleMap, Circle, Marker } from "@react-google-maps/api";


// Assets
import mapPinIcon from '/public/SiteIcons/mapPin.svg';


// Constants
import { googleMapAPI } from '../../config';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PlaceMap.css';
import cx from 'classnames';

//Image
import successIcon from '/public/SiteIcons/greatSuccess.svg';
import dangerIcon from '/public/SiteIcons/information-button.svg';

const containerStyle = {
  width: '100%',
  height: '100%'
};

class PlaceMap extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    isMapTouched: PropTypes.bool,
    onChange: PropTypes.any,
    change: PropTypes.any,
    mapSuccess: PropTypes.string,
    mapWarning: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      isMapTouched: false,
      markers: null,
      success: false
    }
    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { lat, lng, isMapTouched } = this.props;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      isMapTouched: isMapTouched,
    });
  }

  geometryValue(value) {
    return value;
  }

  handleMarkerDragEnd(targetMarker) {
    const { isMapTouched } = this.state;
    const { onChange, change } = this.props;
    const center = {
      lat: targetMarker.latLng.lat(),
      lng: targetMarker.latLng.lng(),
      isMapTouched: true
    };
    this.setState({ center: center, isMapTouched: true });
    if (!isMapTouched) {
      this.setState({ success: true });
    }
    //onChange(this.geometryValue(center));
    change("ListPlaceStep1", "lat", center.lat);
    change("ListPlaceStep1", "lng", center.lng);
    change("ListPlaceStep1", "isMapTouched", center.isMapTouched);
  }

  renderWarning(message) {
    const { isMapTouched, success } = this.state;
    if (!isMapTouched) {
      return (
        <div className={cx(s.alertContainer, s.alertDanger)}>
          <img src={dangerIcon} className={cx(s.dangerIcon, 'dangerIconRTL')} />
          <span>{message}</span>
        </div>
      );
    }
    if (isMapTouched && success) {
      return (
        <div className={cx(s.alertContainer, s.alertSuccess)}>
          <img src={successIcon} className={cx(s.successIcon, 'dangerIconRTL')} />
          <span>{message}</span>
        </div>
      );
    }

  }

  handleOnLoad = (map) => {
    const { center } = this.state;
    const markers = [{
      position: new google.maps.LatLng(center.lat, center.lng)
    }];
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  render() {
    const { isMapTouched, center } = this.state;
    const { mapWarning, mapSuccess } = this.props;
    let message, markers;

    if (window.google && window.google.maps) {
      //markers = { position: new google.maps.LatLng(this.state.center.lat, this.state.center.lng) };      
    }

    if (!isMapTouched) {
      message = mapWarning;
    } else {
      message = mapSuccess;
    }
    return (
      <div style={{ height: 554 }} className={cx(s.mapSection, 'stepPlaceMap', s.tabViewMap)}>
        {this.renderWarning(message)}
        <ReactGoogleMapLoader
          params={{
            key: googleMapAPI, // Define your api key here
            libraries: "places,geometry,markedWithLabel"// To request multiple libraries, separate them with a comma
          }}
          render={googleMaps =>
            googleMaps && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={this.handleOnLoad}
                defaultZoom={14}
                center={center}
                options={{
                  backgroundColor: '',
                  scrollwheel: false,
                  maxZoom: 16,
                  minZoom: 11,
                  streetViewControl: false,
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                  },
                  mapTypeControl: false,
                  styles: [
                    {
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#ebe3cd"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#523735"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#f5f1e6"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#c9b2a6"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.land_parcel",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#dcd2be"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.land_parcel",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#ae9e90"
                        }
                      ]
                    },
                    {
                      "featureType": "landscape.natural",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dfd2ae"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dfd2ae"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#93817c"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "geometry.fill",
                      "stylers": [
                        {
                          "color": "#a5b076"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#447530"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#f5f1e6"
                        }
                      ]
                    },
                    {
                      "featureType": "road.arterial",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#fdfcf8"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#f8c967"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#e9bc62"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway.controlled_access",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#e98d58"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway.controlled_access",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#db8555"
                        }
                      ]
                    },
                    {
                      "featureType": "road.local",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#806b63"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.line",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dfd2ae"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.line",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#8f7d77"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.line",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#ebe3cd"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.station",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#dfd2ae"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "geometry.fill",
                      "stylers": [
                        {
                          "color": "#b9d3c2"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#92998d"
                        }
                      ]
                    }
                  ]
                }}
              >
                <Circle
                  center={center}
                  radius={212}
                  options={{
                    fillColor: '#090B1E1C',
                    strokeColor: '#090B1E',
                  }}
                />
                <Marker
                  position={new google.maps.LatLng(center.lat, center.lng)}
                  draggable={true}
                  onDragEnd={(event) => this.handleMarkerDragEnd(event)}
                  icon={{
                    url: mapPinIcon
                  }}
                />
              </GoogleMap>
            )}
        />

      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  change
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceMap));
