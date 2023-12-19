import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ServiceFeesForm.css';

import cs from '../../../components/commonStyle.css';
import CommonFormComponent from '../../CommonField/CommonFormComponent';
import { getCurrencySymbol } from '../../../helpers/currencyConvertion';
import submit from './submit';
import validate from './validate';
import messages from '../../../locale/messages';

class ServiceFeesForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired
    })).isRequired
  };

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, currentLocale, currency } = this.props;
    const { base, availableCurrencies, guestType, hostType } = this.props;
    const { formatMessage } = this.props.intl;
    let symbol = getCurrencySymbol(currency, currentLocale);

    return (
      <div className={cx(cs.adminContentPadding)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.spaceBottom12)}><FormattedMessage {...messages.manageServiceFee} /></h1>
            <div>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Row>
                  <Col xs={12} sm={12} md={6} lg={6} className={cs.spaceBottom3}>
                    <div className={cx(cs.adminBorderWithoutPadding)}>
                      <div className={cx(s.cardHeader)}>
                        <p className={cx(cs.commonSubTitleText, cs.fontWeightBold)}><FormattedMessage {...messages.guestLabel} /></p>
                      </div>
                      <div className={cx(s.cardBodyStyle)}>
                        <div className={cs.spaceBottom12}>
                          <div className={cx(cs.commonContentText, cs.spaceBottom2, cs.fontWeightMedium)}>
                            <FormattedMessage {...messages.feeTypeLabel} />
                          </div>
                          <div className={cx(cs.dFlex)}>
                            <div className={cx(cs.dFlex, cs.spaceRight3, 'customRatioButton', 'spaceRight3RTL')}>
                              <span className={cx(s.adminRadioBtn, 'adminRadioBtnRTL')}><Field name="guestType" component="input" type="radio" value="fixed" /></span>
                              <label className={cx(cs.commonMediumText, s.feeTypeRadioLabel, cs.fontWeightNormal)}><FormattedMessage {...messages.fixedPrice} /></label>
                            </div>
                            <div className={cx(cs.dFlex, cs.spaceRight3, 'customRatioButton', 'spaceRight3RTL')}>
                              <span className={cx(s.adminRadioBtn, 'adminRadioBtnRTL')}><Field name="guestType" component="input" type="radio" value="percentage" /></span>
                              <label className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.percentage} /></label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <FormGroup className={s.space3}>
                            <ControlLabel className={cx(cs.commonContentText, cs.spaceBottom8, cs.fontWeightMedium)}>
                              <FormattedMessage {...messages.serviceFeeLabel} />
                            </ControlLabel>
                            <Field name="guestValue" type="text" isAddon={true} prefixLabel={guestType == 'fixed' ? symbol : '%'} component={CommonFormComponent} label={formatMessage(messages.serviceFeeLabel)} placeholder={formatMessage(messages.serviceFeeLabel)} inputClass={cs.formControlInput} />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={cs.spaceBottom3}>
                    <div className={cx(cs.adminBorderWithoutPadding)}>
                      <div className={cx(s.cardHeader)}>
                        <p className={cx(cs.commonSubTitleText, cs.fontWeightBold)}><FormattedMessage {...messages.hostLabel} /></p>
                      </div>
                      <div className={cx(s.cardBodyStyle)}>
                        <div className={cs.spaceBottom12}>
                          <div className={cx(cs.commonContentText, cs.spaceBottom2, cs.fontWeightMedium)}>
                            <FormattedMessage {...messages.feeTypeLabel} />
                          </div>
                          <div className={cx(cs.dFlex)}>
                            <div className={cx(cs.dFlex, cs.spaceRight3, 'customRatioButton', 'spaceRight3RTL')}>
                              <span className={cx(s.adminRadioBtn, 'adminRadioBtnRTL')}><Field name="hostType" component="input" type="radio" value="fixed" /></span>
                              <label className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.fixedPrice} /></label>
                            </div>
                            <div className={cx(cs.dFlex, cs.spaceRight3, 'customRatioButton', 'spaceRight3RTL')}>
                              <span className={cx(s.adminRadioBtn, 'adminRadioBtnRTL')}><Field name="hostType" component="input" type="radio" value="percentage" /></span>
                              <label className={cx(cs.commonMediumText, cs.fontWeightNormal)}><FormattedMessage {...messages.percentage} /></label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <FormGroup className={s.space3}>
                            <ControlLabel className={cx(cs.commonContentText, cs.spaceBottom8, cs.fontWeightMedium)}>
                              <FormattedMessage {...messages.serviceFeeLabel} />
                            </ControlLabel>
                            <Field name="hostValue" type="text" isAddon={true} prefixLabel={hostType == 'fixed' ? symbol : '%'} component={CommonFormComponent} label={formatMessage(messages.serviceFeeLabel)} placeholder={formatMessage(messages.serviceFeeLabel)} inputClass={cs.formControlInput} />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={6} lg={6} className={cs.spaceBottom3}>
                    <FormGroup className={s.space3}>
                      <ControlLabel className={cx(cs.commonContentText, cs.spaceBottom8, cs.fontWeightMedium)}>
                        <FormattedMessage {...messages.chooseCurrency} />
                      </ControlLabel>
                      <Field name="currency" component={CommonFormComponent} label={formatMessage(messages.chooseCurrency)} inputClass={cs.formControlSelect}>
                        <option value="">{formatMessage(messages.chooseCurrency)}</option>
                        {
                          availableCurrencies.map((currency, key) => {
                            if (currency.isEnable === true) {
                              return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                            }
                          })
                        }
                      </Field>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
                    <Button className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </div >
    );
  }

}

ServiceFeesForm = reduxForm({
  form: 'ServiceFeesForm', // a unique name for this form
  validate
})(ServiceFeesForm);

const selector = formValueSelector('ServiceFeesForm'); // <-- same as form name

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
  currentLocale: state.intl.locale,
  currency: selector(state, 'currency'),
  guestType: selector(state, 'guestType'),
  hostType: selector(state, 'hostType'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ServiceFeesForm)));