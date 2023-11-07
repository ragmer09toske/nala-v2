
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, Form, reduxForm } from 'redux-form';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchHeader.css';
import cx from 'classnames';
// Locale
import messages from '../../../locale/messages';

// Components
import Dates from '../Filters/Dates';
import HomeType from '../Filters/HomeType';
import Price from '../Filters/Price';
import InstantBook from '../Filters/InstantBook';
import MoreFilters from '../Filters/MoreFilters';
import ShowMap from '../Filters/ShowMap';
import PlacesSuggest from '../PlacesSuggest';

//Image
import carTypeIcon from '/public/SiteIcons/car.svg';
import priceIcon from '/public/SiteIcons/priceIcon.svg';
import instantIcon from '/public/SiteIcons/instantIcon.svg';
import moreIcon from '/public/SiteIcons/moreIcon.svg';
import calendarIcon from '/public/SiteIcons/filterCalIcon.svg';
import { connect } from 'react-redux';
import history from '../../../core/history';



class SearchHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        homeType: false,
        price: false,
        instantBook: false,
        moreFilters: false
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false,
      tabletDevice: false
    };

    this.handleTabToggle = this.handleTabToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : false;
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : false;
    let tabletDevice = isBrowser ? window.matchMedia('(max-width: 1024px)').matches : false;
    this.setState({ smallDevice, verySmallDevice, tabletDevice });
  }

  handleTabToggle(currentTab, isExpand) {
    const { showForm, showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  }

  handleClick = () => {
    const { personalized } = this.props;
    let updatedURI, uri = '/s?';
    if (personalized.location) {
      uri = uri + '&address=' + personalized.location;
    }
    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }

  renderPlacesSuggest = ({ input, label }) => {
    return (
      <PlacesSuggest
        label={label}
        handleSubmit={this.handleClick}
      />
    )
  }

  render() {
    const { searchSettings } = this.props;
    const { formatMessage } = this.props.intl;
    const { tabs, overlay, smallDevice, verySmallDevice, tabletDevice } = this.state;

    return (
      <div>
        <div className={cx(s.searchHeaderContainerBox, { [s.fullResponsiveContainer]: (tabs.dates == true || tabs.moreFilters == true) })}>
          <div className={s.searchHeaderContainer}>
            {(verySmallDevice) && <Form>
              <Field
                name="placeSuggest"
                component={this.renderPlacesSuggest}
                autoComplete='off'
                label={formatMessage(messages.yourLocationLabelDesc)}
              />
            </Form>
            }
            <div className={s.searchHeaderFlex}>
              <Dates
                className={cx(s.filterButtonContainer, 'hidden-lg', 'hidden-md', "searchPageDataBtn", 'filterButtonContainerRTL')}
                handleTabToggle={this.handleTabToggle}
                isExpand={tabs.dates}
                smallDevice={smallDevice}
                verySmallDevice={verySmallDevice}
                filterIcon={calendarIcon}
              />
              <HomeType
                className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection, 'filterButtonContainerRTL')}
                handleTabToggle={this.handleTabToggle}
                isExpand={tabs.homeType}
                filterIcon={carTypeIcon}
              />
              <Price
                className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection, 'filterButtonContainerRTL')}
                handleTabToggle={this.handleTabToggle}
                searchSettings={searchSettings}
                isExpand={tabs.price}
                filterIcon={priceIcon}
              />
              <InstantBook
                className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection, 'filterButtonContainerRTL')}
                handleTabToggle={this.handleTabToggle}
                isExpand={tabs.instantBook}
                filterIcon={instantIcon}
              />
              <MoreFilters
                className={cx(s.filterButtonContainer, 'filterButtonContainerRTL')}
                handleTabToggle={this.handleTabToggle}
                isExpand={tabs.moreFilters}
                searchSettings={searchSettings}
                smallDevice={smallDevice}
                filterIcon={moreIcon}
                tabletDevice={tabletDevice}
                verySmallDevice={verySmallDevice}
              />
            </div>
            <ShowMap
              className={cx(s.filterButtonContainer, 'pull-right', 'hidden-xs', s.hideTabletSection, 'filterButtonContainerRTL')}
              handleTabToggle={this.handleTabToggle} />
          </div>

        </div>
        {/* {
          overlay && <div className={s.searchFilterPopoverOverlay} onClick={this.handleTabToggle}></div>
        } */}

      </div>
    );
  }
}

SearchHeader = reduxForm({
  form: 'LocationSearchForm', // a unique name for this form
  destroyOnUnmount: false,
})(SearchHeader);

const mapState = (state) => ({
  personalized: state.personalized,
});

const mapDispatch = {
};


export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SearchHeader)));