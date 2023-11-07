// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormGroup,
} from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import CustomCheckbox from '../CustomCheckbox';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import update from './update';
import messages from '../../locale/messages';
import validate from './validate';
class Page8 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    formErrors: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      carFeatures: [],
      isDisabled: false
    }
  }

  componentDidMount() {
    const { formErrors, listingFields } = this.props;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        carFeatures: listingFields.carFeatures,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { formErrors, listingFields } = nextProps;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        carFeatures: listingFields.carFeatures,
      });
    }
  }

  checkboxGroup = ({ options, input }) => (
    <ul className={s.listContainer}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={cx(s.listContent, cs.spaceBottom3)} key={index}>
              <span>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  className={'icheckbox_square-green'}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={event => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </span>
              <span className={cx(s.checkBoxLabel)}>
                <label className={cx(cs.commonMediumText, cs.fontWeightNormal)}>{option.itemName}</label>
              </span>
            </li>
          )
        }
      }
      )
      }
    </ul>
  );

  render() {
    const { handleSubmit, previousPage, formPage, step } = this.props;
    const { isDisabled, carFeatures } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step1HeadingNew)}
          landingContent={formatMessage(messages.whatamenities)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={cx(cs.commonContentText, cs.spaceBottom3)}>
              <FormattedMessage {...messages.carFeatures} />
            </h3>
            <FormGroup className={s.formGroup}>
              <Field name="carFeatures" component={this.checkboxGroup} options={carFeatures} />
            </FormGroup>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"map"}
            type={"submit"}
            formPage={formPage}
            step={step}
            isFinish
          />
        </form>
      </div>
    );
  }
}

Page8 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page8);

const mapState = (state) => ({
  userData: state.account.data,
  formErrors: state.form.ListPlaceStep1,
  listingFields: state.listingFields.data,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(Page8)));
