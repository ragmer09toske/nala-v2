import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

import SidePanel from './SidePanel';
import FooterButton from './FooterButton';

// Locale
import messages from '../../locale/messages';
import validateStep3 from './validateStep3';
import updateStep3 from './updateStep3';

//images
import infoIcon from '/public/SiteIcons/priceHoverIcon.svg';
import locationIcon from '/public/SiteIcons/locationIdea.svg';
import CommonFormComponent from '../CommonField/CommonFormComponent';
import { normalizePrice } from '../EditProfileForm/normalizePhone';

class Pricing extends Component {

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
    const { handleSubmit, nextPage, previousPage, formPage, step, availableCurrencies } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled } = this.state;
    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.setPricingText)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <FormGroup className={cs.spaceBottom4}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.currency} />
              </ControlLabel>
              <Field name="currency" component={CommonFormComponent} inputClass={cx(s.formControlSelect, s.jumboSelect)} >
                {
                  availableCurrencies.map((currency, key) => {
                    if (currency.isEnable === true) {
                      return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                    }
                  })
                }
              </Field>
            </FormGroup>
            <FormGroup className={cx(s.noMargin)}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.basePrice} />
                <div className={s.infoIconCss}>
                  <img src={infoIcon} className={s.infoIcon} />
                  <div className={cx(s.infoContent, s.basePriceInfo, 'infoContentRTL')}>{formatMessage(messages.basePriceInfo)}</div>
                </div>
              </ControlLabel>
              <Field
                name="basePrice"
                type="text"
                component={CommonFormComponent}
                label={formatMessage(messages.basePriceLabel)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth)}
                normalize={normalizePrice}
              />
            </FormGroup>
            <div className={cx(s.searchToolTip, cs.spaceTop2, cs.spaceBottom4)}>
              <img src={locationIcon} className={'commonIconSpace'} />
              <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.pricingDescription} /></span>
            </div>
            <FormGroup className={cs.spaceBottom4}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.delivery} />
                <div className={s.infoIconCss}>
                  <img src={infoIcon} className={s.infoIcon} />
                  <div className={cx(s.infoContent, s.deliveryInfo, 'infoContentRTL')}>{formatMessage(messages.deliveryInfo)}</div>
                </div>
              </ControlLabel>
              <Field
                name="delivery"
                type="text"
                component={CommonFormComponent}
                label={formatMessage(messages.delivery)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth)}
                normalize={normalizePrice}
              />
            </FormGroup>
            <FormGroup className={cs.spaceBottom4}>
              <ControlLabel className={s.landingLabel}>
                <FormattedMessage {...messages.securityDeposit} />
                <div className={s.infoIconCss}>
                  <img src={infoIcon} className={s.infoIcon} />
                  <div className={cx(s.infoContent, 'infoContentRTL')}>{formatMessage(messages.infoContent)}</div>
                </div>
              </ControlLabel>
              <Field
                name="securityDeposit"
                type="text"
                component={CommonFormComponent}
                label={formatMessage(messages.securityDeposit)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth)}
                normalize={normalizePrice}
              />
            </FormGroup>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            previousPagePath={"car-rules"}
            nextPagePath={"discount"}
            formPage={formPage}
            step={step}
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

Pricing = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Pricing);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  availableCurrencies: state.currency.availableCurrencies,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Pricing)));
