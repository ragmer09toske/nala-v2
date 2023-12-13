import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import updateStep3 from './updateStep3';
import SidePanel from './SidePanel';
import FooterButton from './FooterButton';

import validateStep3 from './validateStep3';
import messages from '../../locale/messages';
//images
import infoIcon from '/public/SiteIcons/priceHoverIcon.svg';
import locationIcon from '/public/SiteIcons/locationIdea.svg';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Discount extends Component {

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

  componentDidMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
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
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled } = this.state;

    return (
      <div className={cx(s.stepGrid, 'discountAddon', 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.setDiscounts)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <FormGroup className={s.formGroup}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.discountWeekly} />
                <div className={s.infoIconCss}>
                  <img src={infoIcon} className={s.infoIcon} />
                  <div className={cx(s.infoContent, s.basePriceInfo, 'infoContentRTL')}>{formatMessage(messages.weeklyDiscountTooltip)}</div>
                </div>
              </ControlLabel>
              <Field
                name="weeklyDiscount"
                type="text"
                component={CommonFormComponent}
                label={formatMessage(messages.discountLabel)}
                isAddon={true}
                maxLength={2}
                prefixLabel={'%'}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.inputRightNo, 'inputLeftNoRTL')}
              />
            </FormGroup>
            <FormGroup className={s.noMargin}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.discountMonthly} />
                <div className={s.infoIconCss}>
                  <img src={infoIcon} className={s.infoIcon} />
                  <div className={cx(s.infoContent, s.basePriceInfo, 'infoContentRTL')}>{formatMessage(messages.monthlyDiscountTooltip)}</div>
                </div>
              </ControlLabel>
              <Field
                name="monthlyDiscount"
                type="text"
                component={CommonFormComponent}
                label={formatMessage(messages.discountLabel)}
                isAddon={true}
                maxLength={2}
                prefixLabel={'%'}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.inputRightNo, 'inputLeftNoRTL')}
              />
            </FormGroup>
            <div className={cx(s.searchToolTip, cs.spaceTop2, cs.spaceBottom4)}>
              <img src={locationIcon} className={'commonIconSpace'}/>
              <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.discountToolTip} /></span>
            </div>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"min-max-days"}
            previousPagePath={"pricing"}
            formPage={formPage}
            step={step}
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

Discount = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Discount);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Discount)));
