import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import SidePanel from './SidePanel';
import FooterButton from './FooterButton';

import validateStep2 from './validateStep2';
import updateStep2 from './updateStep2';
import messages from '../../locale/messages';

import locationIcon from '/public/SiteIcons/locationIdea.svg';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Description extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  UNSAFE_componentWillMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { handleSubmit, previousPage, formPage, step, listingSteps } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, chars_left } = this.state;
    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step2Heading)}
          landingContent={formatMessage(messages.descriptionStepText)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <FormGroup className={cs.spaceBottom4}>
              <ControlLabel className={s.landingLabel}>
                {listingSteps?.step2 == "completed" ? <FormattedMessage {...messages.editCarName} /> : <FormattedMessage {...messages.nameYourList} />}
              </ControlLabel>
              <Field
                name="title"
                component={CommonFormComponent}
                inputClass={cx(s.formControlInput, s.jumboInput)}
                label={listingSteps?.step2 == "completed" ? formatMessage(messages.editCarName) : formatMessage(messages.nameYourList)}
                maxLength={50}
              />
            </FormGroup>
            <ControlLabel className={s.landingLabel}>
              <FormattedMessage {...messages.aboutCar} />
            </ControlLabel>
            <FormGroup className={s.noMargin}>
              <Field name="description"
                component={CommonFormComponent}
                componentClass={"textarea"}
                inputClass={s.textareaInput}
                label={formatMessage(messages.descriptionLabel)}
              />
            </FormGroup>
            <div className={cx(s.searchToolTip, cs.spaceTop2)}>
              <img src={locationIcon} className={'commonIconSpace'} />
              <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.descriptionToolTip} /></span>
            </div>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"photos"}
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

Description = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Description);

const selector = formValueSelector('ListPlaceStep2');

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  listingSteps: state.location.listingSteps,
  title: selector(state, 'title')
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Description)));
