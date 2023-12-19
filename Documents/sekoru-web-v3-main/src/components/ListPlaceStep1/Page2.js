import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import SidePanel from './SidePanel';
import FooterButton from './FooterButton';

import update from './update';
import messages from '../../locale/messages';
import validate from './validate';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Page2 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      carType: [],
      year: [],
      make: [],
      odometer: [],
      isModelValue: [],
    },
      this.changeModelType = this.changeModelType.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        carType: listingFields.carType,
        year: listingFields.year,
        make: listingFields.make,
        odometer: listingFields.odometer,
      });
    }
  }

  componentDidMount() {
    const { valid, listingFields, makeName } = this.props;
    let ModelValues = listingFields && listingFields.model && listingFields.model.filter(o => o.makeType == makeName);
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    if (listingFields != undefined) {
      this.setState({
        isModelValue: ModelValues,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields, makeName } = nextProps;
    let ModelValues = listingFields && listingFields.model && listingFields.model.filter(o => o.makeType == makeName);
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    if (listingFields != undefined) {
      this.setState({
        carType: listingFields.carType,
        year: listingFields.year,
        make: listingFields.make,
        odometer: listingFields.odometer,
        isModelValue: ModelValues,
      });
    }
  }

  changeModelType(e) {
    const { change, listingFields } = this.props;
    let newValue = e.target.value;
    let ModelValue = listingFields.model && listingFields.model.filter(o => o.makeType == newValue);
    this.setState({
      isModelValue: ModelValue,
      makeValue: newValue,
      isTrimValue: []
    })
    if (ModelValue && ModelValue.length > 0) {
      change('model', ModelValue && ModelValue[0].id)
    } else {
      change('model', "")
    }
  }

  

  render() {
    const { handleSubmit, previousPage, nextPage, existingList, formPage, step } = this.props;
    const { isDisabled, carType, make, isModelValue, year, odometer } = this.state;
    const { formatMessage } = this.props.intl;
    let path = "index";
    if (existingList) {
      path = "home";
    }
    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step1HeadingNew)}
          landingContent={formatMessage(messages.whatKindOfPlaceListing)}
        />
        <div>
          <form onSubmit={handleSubmit}>
            <div className={s.landingMainContent}>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.whatGuestHave} />
                </ControlLabel>
                <Field
                  name="carType"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                >
                  {
                    carType.map((value, key) => {
                      return (
                        value.isEnable == 1 && <option
                          value={value.id}
                          key={key}
                        >
                          {value.itemName}
                        </option>
                      )
                    })
                  }
                </Field>
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.whatTypeOfProperty} />
                </ControlLabel>
                <Field
                  name="make"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                  onChange={this.changeModelType}
                >
                  <option value="">
                    {formatMessage(messages.selectLabel)}
                  </option>
                  {
                    make.map((value, key) => {
                      return (
                        value.isEnable == 1 && <option
                          value={value.id}
                          key={key}
                        >
                          {value.itemName}
                        </option>
                      )
                    })
                  }
                </Field>
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.modelLabel} />
                </ControlLabel>
                <Field
                  name="model"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                >
                  <option value="">
                    {formatMessage(messages.selectLabel)}
                  </option>
                  {
                    isModelValue.map((value, key) => {
                      return (
                        value.isEnable == 1 && <option
                          value={value.id}
                          key={key}
                        >
                          {value.itemName}
                        </option>
                      )
                    })
                  }
                </Field>
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.year} />
                </ControlLabel>
                <Field
                  name="year"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                >
                  {
                    year.map((value, key) => {
                      return (
                        value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                      )
                    })
                  }
                </Field>
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.isPersonalHome} />
                </ControlLabel>
                <Field
                  name="transmission"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                >
                  <option value="1">
                    {formatMessage(messages.Automatic)}
                  </option>
                  <option value="2">
                    {formatMessage(messages.Manuall)}
                  </option>
                </Field>
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <ControlLabel className={s.landingLabel}>
                  <FormattedMessage {...messages.odometer} />
                </ControlLabel>
                <Field
                  name="odometer"
                  component={CommonFormComponent}
                  inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                >
                  {
                    odometer.map((value, key) => {
                      return (
                        value.isEnable == 1 && <option value={value.id} key={key}>
                          {value.itemName}
                        </option>
                      )
                    })
                  }
                </Field>
              </FormGroup>
            </div>
            <FooterButton
              isDisabled={isDisabled}
              nextPage={nextPage}
              previousPage={previousPage}
              nextPagePath={"location"}
              previousPagePath={path}
              formPage={formPage}
              step={step}
            />
          </form>
        </div>
      </div>
    )
  }
}

Page2 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page2);

const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data,
  makeName: selector(state, 'make'),
  modelValue: selector(state, 'model'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(Page2)));
