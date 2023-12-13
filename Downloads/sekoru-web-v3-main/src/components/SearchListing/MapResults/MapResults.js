import React from 'react';
import PropTypes from 'prop-types';
import { formValueSelector, change, submit as submitForm, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// Google Places Map Component
import { GoogleMap, InfoBox, Marker, OverlayView } from "@react-google-maps/api";

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapResults.css';
import cx from 'classnames';
import cs from '../../commonStyle.css';

// Component
import MapListingItem from '../MapListingItem';
import RedoSearch from '../RedoSearch';
import CustomOverlayView from './CustomOverlayView';
import CurrencyConverter from '../../CurrencyConverter';
import ExpandToggle from '../ExpandToggle/ExpandToggle';

// Actions
import { setPersonalizedValues } from '../../../actions/personalized';
import submit from '../SearchForm/submit';

// Assets
import mapPinIcon from './map-pin.png';
import { convert } from '../../../helpers/currencyConvertion';

const refs = {};
const containerStyle = {
  width: '100%',
  height: '100%'
};

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height + 8),
});

class MapResults extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      personCapacity: PropTypes.number,
      dates: PropTypes.string
    }),
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string,
      defaultLocation: PropTypes.string,
      defaultLat: PropTypes.number,
      defaultLng: PropTypes.number
    }).isRequired,
    chosenLat: PropTypes.number,
    chosenLng: PropTypes.number,
    total: PropTypes.number,
    results: PropTypes.array,
    personalized: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    change: PropTypes.any,
    submitForm: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      bounds: {},
      searchByMapResults: false,
      isMapDrag: false,
      isMapZoom: false,
    };
    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleFitBounds = this.handleFitBounds.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.handleZoomChanged = this.handleZoomChanged.bind(this);
    this.handleMapTouch = this.handleMapTouch.bind(this);
    this.handleMapUnTouch = this.handleMapUnTouch.bind(this);
    this.getMarkerIcon = this.getMarkerIcon.bind(this);
    this.generateIcon = this.generateIcon.bind(this);
  }

  componentDidMount() {
    const { results, initialFilter, searchSettings, personalized, markerHighlight } = this.props;
    const { center, hover } = this.state;
    var bounds = new google.maps.LatLngBounds();


    let southWest, northEast;
    if (initialFilter && initialFilter.lat && initialFilter.lng) {
      southWest = new google.maps.LatLng(initialFilter.sw_lat, initialFilter.sw_lng);
      northEast = new google.maps.LatLng(initialFilter.ne_lat, initialFilter.ne_lng);
      bounds.extend(southWest);
      bounds.extend(northEast);
    }


    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        data["lat"] = item.lat;
        data["lng"] = item.lng;
        data["position"] = new google.maps.LatLng(item.lat, item.lng);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        data["carType"] = item.settingsData && item.settingsData[0] && item.settingsData[0].listsettings && item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['hovered'] = hover;
        data['transmission'] = item.transmission;
        positions.push(data);
        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      })
      this.setState({ markers: positions, bounds });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { results, personalized, initialFilter, searchByMapValue, markerHighlight } = nextProps;
    const { center, searchByMapResults } = this.state;
    let { hover } = this.state;
    var bounds = new google.maps.LatLngBounds();

    this.setState({
      searchByMapResults: searchByMapValue
    });

    let southWest, northEast;
    if (initialFilter && initialFilter.lat && initialFilter.lng) {
      southWest = new google.maps.LatLng(initialFilter.sw_lat, initialFilter.sw_lng);
      northEast = new google.maps.LatLng(initialFilter.ne_lat, initialFilter.ne_lng);
      bounds.extend(southWest);
      bounds.extend(northEast);
    }

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        if (markerHighlight) {
          hover = markerHighlight.id == item.id ? true : false;
        }
        let position = new google.maps.LatLng(item.lat, item.lng);
        data["lat"] = item.lat;
        data["lng"] = item.lng;
        data["position"] = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(position);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        data["carType"] = item.settingsData && item.settingsData[0] && item.settingsData[0].listsettings && item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        data['hovered'] = hover;
        data['transmission'] = item.transmission;
        positions.push(data);
      });
      this.setState({
        markers: positions,
        bounds
      });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        // let centerValue = {
        //   lat: personalized.lat,
        //   lng: personalized.lng
        // };
        // defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        // bounds.extend(defaultCordinates);
        // this.setState({ bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ bounds, center: centerValue });
        }
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ bounds });
        }
      }
      this.setState({ markers: [] });
    }
  }

  componentWillUnmount() {
    const { change } = this.props;
    change('initialLoad', true);
  }

  async handleFitBounds(map) {
    const { bounds, markers, searchByMapResults, isMapDrag } = this.state;
    const { initialLoad, initialFilter, searchListing, results, searchByMapValue, personalized } = this.props;
    let southWest, northEast, initialBounds, boundsData, new_bounds;
    if (results && results.length > 0) {
      boundsData = bounds;
    } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
      new_bounds = new google.maps.LatLngBounds();
      southWest = new google.maps.LatLng(initialFilter.sw_lat, initialFilter.sw_lng);
      northEast = new google.maps.LatLng(initialFilter.ne_lat, initialFilter.ne_lng);
      new_bounds.extend(southWest);
      new_bounds.extend(northEast);
      boundsData = new_bounds;
    } else if (personalized && personalized.southWest && personalized.northEast) {
      new_bounds = new google.maps.LatLngBounds();
      new_bounds.extend(personalized.southWest);
      new_bounds.extend(personalized.northEast);
      boundsData = new_bounds;
    } else {
      new_bounds = new google.maps.LatLngBounds();
      southWest = new google.maps.LatLng(9.854550803628602, 80.12749270688475);
      northEast = new google.maps.LatLng(46.588831619427665, -120.63917188786621);
      new_bounds.extend(southWest);
      new_bounds.extend(northEast);
      boundsData = new_bounds;
    }
    // boundsData = results && results.length > 0 ? bounds : new_bounds;

    if (map && initialLoad && Object.keys(boundsData).length > 0) {
      //setCenter
      map.fitBounds(boundsData)
    }
    refs.map = map;
  }

  handleBoundsChanged() {
    let center = new google.maps.getCenter();
  }

  onMapClick() {
    const { markers } = this.state;
    if (markers.length > 0) {
      /*this.setState({
        markers: markers.map(marker => {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon2
          };
          return marker;
        })
      });*/
    }
  }

  getCenter(e) {
    let center, lat, lng, northEast, southWest;
    if (refs && refs.map) {
      center = refs.map.getCenter();
      lat = center.lat();
      lng = center.lng();
    }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
            icon: mapPinIcon,
            hovered: true
          };
        } else {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
      center: {
        lat: targetMarker.lat,
        lng: targetMarker.lng
      },
      bounds: null
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
    });
  }

  getMarkerIcon(marker) {
    const svg = this.generateIcon(marker);

    return 'data:image/svg+xml;base64,' + window.btoa(svg);
  }

  generateIcon(marker) {

    const { rates, base, toCurrency } = this.props;
    const currentCurrency = toCurrency || base;
    const convertedAmount = convert(base, rates, marker?.basePrice, marker?.currency, currentCurrency);
    const count = convertedAmount?.toString().length || 0;

    let opts = {
      fontSize: '10px',
      fontColor: 'transparent',
      strokeColor: 'transparent',
      strokeWeight: 0,
      path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
      fillColor: 'transparent',
      width: (68 + (count > 3 ? 4 * count : 0))
    };


    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="38" viewBox="-24 -48 48 48">
        <defs>
        </defs>
        <path class="marker-icon" stroke="${opts.strokeColor}" stroke-width="${opts.strokeColor}" fill="${opts.fillColor}" 
          d="${opts.path}" />
      </svg>
    `;
  }

  async handleOnDragStart() {
    const { change, submitForm } = this.props;
    this.setState({
      isMapDrag: true
    });
    await change('initialLoad', false);
  }

  async handleMapTouch() {
    const { change, submitForm } = this.props;
  }

  async handleMapUnTouch() {
    const { change, submitForm } = this.props;
  }

  async handleZoomChanged() {
    const { change, submitForm, searchByMapValue, handleSubmit, initialLoad } = this.props;
    const { isMapDrag, isMapZoom } = this.state;
    if (refs && refs.map && isMapZoom === false) {
      this.setState({
        isMapZoom: !isMapZoom
      });
    }

    let center, lat, lng, bounds, northEast, southWest, zoom;
    let new_sw, new_ne, new_bounds;
    if (refs && refs.map && isMapZoom) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast();
      southWest = bounds.getSouthWest();
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);

      if (searchByMapValue && !initialLoad) {
        await change('initialLoad', false);
        await change('lat', lat);
        await change('lng', lng);
        await change('sw_lat', southWest.lat());
        await change('sw_lng', southWest.lng());
        await change('ne_lat', northEast.lat());
        await change('ne_lng', northEast.lng());
        await change('zoomLevel', zoom);
        await change('currentPage', 1);
        await handleSubmit();
      }
    }
  }

  async handleOnDragEnd() {
    const { change, submitForm, searchByMapValue, setPersonalizedValues, handleSubmit } = this.props;
    const { isMapDrag } = this.state;
    let center, lat, lng, bounds, northEast, southWest;
    let new_sw, new_ne, new_bounds, zoom;

    if (refs && refs.map && isMapDrag) {
      center = refs.map.getCenter();
      zoom = refs.map.getZoom();
      lat = center.lat();
      lng = center.lng();
      bounds = refs.map.getBounds();
      northEast = bounds.getNorthEast(); // Max
      southWest = bounds.getSouthWest(); // Min
      new_sw = new google.maps.LatLng(southWest.lat(), southWest.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);


      if (searchByMapValue) {
        await change('initialLoad', false);
        await change('lat', lat);
        await change('lng', lng);
        await setPersonalizedValues({ name: 'lat', value: Number(lat) });
        await setPersonalizedValues({ name: 'lng', value: Number(lng) });
        await setPersonalizedValues({ name: 'southWest', value: new_sw });
        await setPersonalizedValues({ name: 'northEast', value: new_ne });
        await change('sw_lat', southWest.lat());
        await change('sw_lng', southWest.lng());
        await change('ne_lat', northEast.lat());
        await change('ne_lng', northEast.lng());
        await change('zoomLevel', zoom);
        await change('currentPage', 1);
        // await submitForm('SearchForm');
        await handleSubmit();
      }
    }
  }

  render() {
    const { center, markers } = this.state;
    return (
      <div className={cx(s.mapCanvas)}>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          defaultZoom={12}
          onLoad={this.handleFitBounds}
          onClick={this.onMapClick}
          onDragStart={this.handleOnDragStart}
          onDragEnd={this.handleOnDragEnd}
          onZoomChanged={() => this.handleZoomChanged()}
          onMouseOver={this.handleMapTouch}
          onMouseOut={this.handleMapUnTouch}
          onBoundsChanged={this.handleFitBounds(refs.map)}
          clickableIcons={false}
          onCenterChanged={(e) => this.getCenter(e)}
          options={{
            minZoom: 2,
            maxZoom: 18,
            mapTypeControl: false,
            streetViewControl: false,
            navigationControl: false,
            backgroundColor: '',
            streetViewControl: false,
            zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
            },
            draggable: true,
            fullscreenControl: false,
            styles: [
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                  color: '#a4ddf5'
                }]
              },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              }
            ]
          }}
        >
          {
            markers.map((marker, key) => {
              let icon = this.getMarkerIcon(marker);
              let pixelOffset = new google.maps.Size(-140, 0);

              return (
                <div key={key}>
                  <Marker
                    position={marker.position}
                    clickable={true}
                    icon={{
                      url: icon,
                      scale: 5,
                    }}
                    onClick={() => this.handleMarkerClick(marker)}
                    key={"key" + key}
                    zIndex={100 + key}
                  >
                    {
                      !marker.showInfo && <CustomOverlayView
                        position={{ lat: marker.lat, lng: marker.lng }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        getPixelPositionOffset={getPixelPositionOffset}
                      >
                        <div className={cx(s.customMarkerContainer, { [s.hoveredMarker]: marker.hovered == true })}>
                          <div className={s.customMarkerPointBorder}></div>
                          <div className={cx(s.customMarkerContent, cs.commonMediumText)}>
                            <CurrencyConverter
                              amount={marker.basePrice}
                              from={marker.currency}
                            />
                          </div>
                          <div className={s.customMarkerPoint}></div>
                        </div>
                      </CustomOverlayView>
                    }
                    {
                      marker.showInfo && <InfoBox
                        onCloseClick={() => {
                          this.handleMarkerClose(marker)
                        }}
                        options={{
                          closeBoxURL: ``,
                          alignBottom: true,
                          boxStyle: {
                            width: "333px",
                            paddingTop: '50px',
                            paddingBottom: '5px',
                            minHeight: "145px",
                            maxWidth: "333px",
                            overflow: "hidden"
                          },
                          pixelOffset: pixelOffset,
                          enableEventPropagation: true,
                        }}
                        position={marker.position}
                        zIndex={330}
                      >
                        <div>
                          <MapListingItem
                            id={marker.id}
                            basePrice={marker.basePrice}
                            currency={marker.currency}
                            title={marker.title}
                            beds={marker.beds}
                            personCapacity={marker.personCapacity}
                            carType={marker.carType}
                            coverPhoto={marker.coverPhoto}
                            listPhotos={marker.listPhotos}
                            bookingType={marker.bookingType}
                            reviewsCount={marker.reviewsCount}
                            reviewsStarRating={marker.reviewsStarRating}
                            wishListStatus={marker.wishListStatus}
                            isListOwner={marker.isListOwner}
                            onCloseClick={() => { this.handleMarkerClose(marker) }}
                            transmission={marker.transmission}
                          />
                        </div>
                      </InfoBox>
                    }
                  </Marker>
                </div>
              )
            })
          }
        </GoogleMap>

        <div className={s.displayNoneResponsive}>
          <RedoSearch />
        </div>
        <div>
          <ExpandToggle />
        </div>
      </div>
    );
  }
}

MapResults = reduxForm({
  form: 'SearchForm', // a unique name for this form	
  onSubmit: submit,
  destroyOnUnmount: false,
})(MapResults);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  total: state.search.count,
  personalized: state.personalized,
  searchByMapValue: selector(state, 'searchByMap'),
  initialLoad: selector(state, 'initialLoad'),
  markerHighlight: selector(state, 'markerHighlight'),
  base: state.currency.base,
  toCurrency: state.currency.to,
  rates: state.currency.rates,
});

const mapDispatch = {
  change,
  submitForm,
  setPersonalizedValues
};

export default withStyles(s)(connect(mapState, mapDispatch)(MapResults));
