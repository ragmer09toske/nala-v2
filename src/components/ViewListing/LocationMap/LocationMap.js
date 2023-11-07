import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import cx from 'classnames';
import cs from '../../../components/commonStyle.css';

// Redux
import { connect } from 'react-redux';

// Google Places Map Component
import ReactGoogleMapLoader from "react-google-maps-loader";
import { GoogleMap, Circle } from "@react-google-maps/api";

// Constants
import { googleMapAPI } from '../../../config';
import { COMMON_COLOR } from '../../../constants/index';

// Locale
import messages from '../../../locale/messages';

const containerStyle = {
  width: '100%',
  height: '100%'
};
class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
    }
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      smallDevice: false
    });
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
    const { center } = this.state;
    const { data } = this.props;
    let displayName = data.user.profile.displayName;

    return (
      <>
        <div className={'viewListingMap'}>
          <h4 className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3)}><FormattedMessage {...messages.neighborhood} /></h4>
          <h5 className={cx(cs.commonContentText, cs.paddingBottom2, cs.fontWeightNormal)}>
            {displayName}{' '}<FormattedMessage {...messages.propertyLocated} />{' '}{data.city}, {data.state}, {data.country}
          </h5>
          <div style={{ height: 452 }}>
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: "places,geometry"// To request multiple libraries, separate them with a comma
              }}
              render={googleMaps =>
                googleMaps && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    defaultZoom={10}
                    center={center}
                    onLoad={this.handleOnLoad}
                    clickableIcons={false}
                    options={{
                      backgroundColor: '',
                      scrollwheel: false,
                      maxZoom: 16,
                      minZoom: 11,
                      streetViewControl: false,
                      zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP
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
                      radius={200}
                      options={{
                        fillColor: COMMON_COLOR,
                        strokeColor: COMMON_COLOR,
                      }}
                    />
                  </GoogleMap>
                )}
            />
          </div>
          <p className={cx(cs.commonContentText, cs.paddingTop2)}>
            <span className={cs.fontWeightBold}><FormattedMessage {...messages.noteLabel} /></span>:{' '}<FormattedMessage {...messages.neighborhoodInfo} />
          </p>
        </div>
        <hr className={cs.listingHorizoltalLine} />
      </>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(LocationMap)));