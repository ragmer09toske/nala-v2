
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreFilters.css';
import {
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { reduxForm, formValueSelector, change, submit as submitForm, getFormValues } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';

// Submit
import submit from '../../SearchForm/submit';

// Internal Components
import CheckboxListItems from './CheckboxListItems';
import HomeType from './HomeType/HomeType';
import Price from './Price';
import InstantBook from './InstantBook';
import VehicleMakes from './VehicleMakes';
import Transmission from './Transmission';

class MoreFilters extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
      carFeatures: [],
      spaces: [],
      carRules: [],
      make: []
    },
    homeType: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { isExpand } = this.props;
    document.addEventListener('mousedown', this.handleClickOutside);
    if (isExpand) {
      document.querySelector('body').setAttribute('style', 'overflow: hidden');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.querySelector('body').removeAttribute('style');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isExpand } = nextProps;
    // if (isExpand) {
    //   document.querySelector('body').setAttribute('style', 'overflow: hidden');
    // } else {
    //   document.querySelector('body').removeAttribute('style');
    // }
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand, handleSubmit } = this.props;
    const { change, submitForm } = this.props;
    await change('currentPage', 1);
    await handleSubmit();
    handleTabToggle('moreFilters', !isExpand)
  }

  async handleReset() {
    const { className, handleTabToggle, isExpand, smallDevice, verySmallDevice, tabletDevice } = this.props;
    const { change } = this.props;
    handleTabToggle('moreFilters', isExpand)
    await change('make', null);
    await change('transmission', null);
    await change('amenities', []);
    await change('houseRules', []);
    if (smallDevice || tabletDevice) {
      await change('roomType', []);
      await change('priceRange', null);
      await change('priceRangeLabel', null);
      await change('bookingType', null);
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  async handleClickOutside(event) {
    const { className, handleTabToggle, isExpand, handleSubmit } = this.props;
    const { change, submitForm } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change('currentPage', 1);
      await handleSubmit();
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('moreFilters', !isExpand);
      }
    }
  }

  render() {
    const { className, handleTabToggle, isExpand, formValues, searchSettings, filterIcon } = this.props;
    const { fieldsSettingsData: { carFeatures, make, carRules }, smallDevice, verySmallDevice, tabletDevice } = this.props;
    const { formatMessage } = this.props.intl;

    let isActive = false, isActiveMoreFilter = false;

    if (formValues && (formValues.make || formValues.transmission == "Automatic" || formValues.bathrooms
      || (formValues.amenities && formValues.amenities.length) || (formValues.spaces && formValues.spaces.length)
      || (formValues.houseRules && formValues.houseRules.length))) {
      isActiveMoreFilter = true;
      isActive = true;
    }

    if ((smallDevice || verySmallDevice || tabletDevice) && formValues && ((formValues.bookingType) || (formValues.priceRange) || (formValues.roomType && formValues.roomType.length))) {
      isActive = true;
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || isActive == true) }, s.btn, s.btnFontsize, 'hidden-md hidden-lg')}
            onClick={() => { handleTabToggle('moreFilters', !isExpand) }}>
            <img src={filterIcon} className={cx('searchHeaderIcon', 'searchHeaderIconWidth')} />
            <FormattedMessage {...messages.filter} />
          </Button>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || isActiveMoreFilter == true) }, s.btn, s.btnFontsize, 'hidden-xs hidden-sm')}
            onClick={() => { handleTabToggle('moreFilters', !isExpand) }}>
            <img src={filterIcon} className={cx('searchHeaderIcon', 'searchHeaderIconWidth')} />
            <span className={cx('hidden-md hidden-lg')}>
              <FormattedMessage {...messages.filter} />
            </span>
            <FormattedMessage {...messages.moreFilters} />
          </Button>
        </div>
        <Modal show={isExpand} animation={false} onHide={this.handleSubmit} className={cx('moreFilterModal', 'moreModal')}>
          <div ref={this.setWrapperRef}>
            <Modal.Header closeButton>
              <FormattedMessage {...messages.moreFilters} />
            </Modal.Header>
            <Modal.Body>
              <div className={cx(s.filterSection, 'filterSectionTabRTL')}>
                <HomeType
                  className={cx(s.filters, 'visible-xs', s.space4, s.showTabletSection)}
                />

                <Price
                  className={cx(s.filters, 'visible-xs', s.space4, s.showTabletSection)}
                  searchSettings={searchSettings}
                />
                <InstantBook
                  className={cx(s.filters, 'visible-xs', s.space4, s.showTabletSection)}
                />
                <Row className={cx(s.filters, s.transmissionBottom, s.marginNone)}>
                  <Col lg={5} md={4} sm={4} xs={12} className={s.paddingNone}>
                    <VehicleMakes
                      options={make}
                    />
                  </Col>
                  <Col lg={7} md={8} sm={8} xs={12} className={cx(s.paddingNone, s.toggleTop)}>
                    <Transmission />
                  </Col>
                </Row>
                <CheckboxListItems
                  className={s.filters}
                  fieldName={'amenities'}
                  options={carFeatures}
                  captionTitle={formatMessage(messages.aminities)}
                  showLabel={formatMessage(messages.showMore)}
                  hideLabel={formatMessage(messages.showLess)}
                  isActive={false}
                />
                <div className={s.houseMobile}>
                  <CheckboxListItems
                    className={s.filters}
                    fieldName={'houseRules'}
                    options={carRules}
                    captionTitle={formatMessage(messages.houseRules)}
                    showLabel={formatMessage(messages.showMore)}
                    hideLabel={formatMessage(messages.showLess)}
                    isActive={false}
                  />
                </div>
              </div>
              <div className={cx(s.filtersFooter, 'filtersFooterRTL')}>
                <div className={cx(s.cancelFliterBtn, 'cancelFliterBtnRTL')}>
                  <Button
                    bsStyle="link"
                    className={cx(s.btnPrimaryBorder, s.viewResultBtn)}
                    onClick={this.handleReset}>
                    <FormattedMessage {...messages.clearAll} />
                  </Button>
                </div>
                <div>
                  <Button
                    className={cx(s.btn, s.btnSecondary, s.viewResultBtn)}
                    onClick={this.handleSubmit}>
                    <FormattedMessage {...messages.applyFilters} />
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div >
    );
  }
}

MoreFilters = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(MoreFilters);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, 'roomType'),
  formValues: getFormValues('SearchForm')(state),
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MoreFilters)));