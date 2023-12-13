import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Row,
  FormGroup,
  Col,
  ControlLabel,
} from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import PlacesSuggest from '../PlacesSuggest';
import CountryList from '../CountryList';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import { updateLocationStatus } from '../../actions/getLocation';
import { updateListingMap } from '../../actions/updateListingMap';

import messages from '../../locale/messages';
import validate from './validate';
import update from './update';
import locationIcon from '/public/SiteIcons/locationIdea.svg';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Page5 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    isLocationChosen: PropTypes.bool,
    previousPage: PropTypes.any,
    onSubmit: PropTypes.any,
    updateLocationStatus: PropTypes.any,
    nextPage: PropTypes.any,
    isExistingList: PropTypes.bool,
    updateListingMap: PropTypes.any,
    mapUpdateLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      hideSuggestInput: true,
    };
    this.renderCountryList = this.renderCountryList.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { isExistingList, isLocationChosen, listId } = this.props;
    if (!isLocationChosen && !isExistingList && !listId) {
      this.setState({ hideSuggestInput: false });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isExistingList, isLocationChosen, listId } = nextProps;
    if (!isLocationChosen && !isExistingList && !listId) {
      this.setState({ hideSuggestInput: false });
    } else {
      this.setState({ hideSuggestInput: true });
    }
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <PlacesSuggest
          {...input}
          label={label}
          className={className}
        />
        {touched && error && <span>{formatMessage(error)}</span>}
      </div>
    )
  }


  renderCountryList({ input, className }) {
    return <CountryList input={input} className={className} />
  }

  renderLocationInput = () => {
    const { updateLocationStatus, previousPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className={cx(s.landingMainContent, s.locationOverflowHidden)}>
          <h3 className={cx(cs.commonContentText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.yourLocation} />
          </h3>
          <FormGroup className={cx(s.noMargin, 'fullAddressSection')}>
            <Field
              name="location"
              component={this.renderPlacesSuggest}
              label={formatMessage(messages.searchYourLocation)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL', s.locationBgIcon, 'stepLocationBgIconRTL')}
            />
          </FormGroup>
          <div className={cx(s.searchToolTip, cs.spaceTop2)}>
            <img src={locationIcon} className={'commonIconSpace'} />
            <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.searchToolTip} /></span>
          </div>
        </div>
        <FooterButton
          nextPage={updateLocationStatus}
          previousPage={previousPage}
          previousPagePath={"car"}
          formPage={formPage}
          step={step}
        />
      </div>
    );
  }

  renderLocationForm = () => {
    const { previousPage, updateListingMap } = this.props;
    const { valid, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = true;
    if (valid) {
      isDisabled = false;
    }
    return (
      <div>
        <div className={s.landingMainContent}>
          <FormGroup className={cs.spaceBottom4}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.country} />
            </ControlLabel>
            <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, s.jumboSelect, s.formControlSelectLarge)} />
          </FormGroup>
          <FormGroup className={cs.spaceBottom4}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.street} />
            </ControlLabel>
            <Field
              name="street"
              component={CommonFormComponent}
              inputClass={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              label={formatMessage(messages.street)}
              maxLength={255}
            />
          </FormGroup>
          <FormGroup className={cs.spaceBottom4}>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.buildingName} />
            </ControlLabel>
            <Field
              name="buildingName"
              component={CommonFormComponent}
              inputClass={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              label={formatMessage(messages.buildingName)}
              maxLength={255}
            />
          </FormGroup>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <FormGroup className={cs.spaceBottom4}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.city} />
                </ControlLabel>
                <Field
                  name="city"
                  component={CommonFormComponent}
                  inputClass={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                  label={formatMessage(messages.city)}
                  maxLength={255}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <FormGroup className={cs.spaceBottom4}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.state} />
                </ControlLabel>
                <Field
                  name="state"
                  component={CommonFormComponent}
                  inputClass={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                  label={formatMessage(messages.state)}
                  maxLength={255}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className={cs.spaceBottom4}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.zipcode} />
                </ControlLabel>
                <Field
                  name="zipcode"
                  component={CommonFormComponent}
                  inputClass={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                  label={formatMessage(messages.zipcode)}
                  maxLength={255}
                />
              </Col>
            </Row>
          </FormGroup>
        </div>
        <FooterButton
          isDisabled={isDisabled}
          previousPage={previousPage}
          previousPagePath={"car"}
          type={"location"}
          updateListingMap={updateListingMap}
          formPage={formPage}
          step={step}
        />
      </div>
    );
  }

  render() {

    const { error, handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;
    const { hideSuggestInput } = this.state;

    return (
      <div>
        <div className={cx(s.stepGrid, 'stepGridRTL')}>
          <SidePanel
            title={formatMessage(messages.step1HeadingNew)}
            landingContent={formatMessage(messages.whereLocated)}
          />
          <div>
            <form onSubmit={handleSubmit}>
              {error && <strong>{formatMessage(error)}</strong>}
              {
                hideSuggestInput && this.renderLocationForm()
              }
              {
                !hideSuggestInput && this.renderLocationInput()
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Page5 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page5);

const mapState = (state) => ({
  isLocationChosen: state.location.isLocationChosen,
  isExistingList: state.location.isExistingList,
  loading: state.loader.location,
  mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
  updateLocationStatus,
  updateListingMap
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(Page5)));