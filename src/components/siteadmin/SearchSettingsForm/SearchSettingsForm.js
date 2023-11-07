import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

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
import s from './SearchSettingsForm.css';
import cs from '../../../components/commonStyle.css';

import submit from './submit';
import validate from './validate';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CommonFormComponent from '../../CommonField/CommonFormComponent';

class SearchSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  UNSAFE_componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialValues != undefined) {
      initialize(initialValues);
    }
  }



  render() {
    const { error, handleSubmit, submitting, dispatch, title } = this.props;
    const { base, availableCurrencies } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(cs.adminContentPadding)}>
          <div className={s.sectionCenter}>
            <div className={cs.commonAdminBorderSection}>
              <h1 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.spaceBottom12)}><FormattedMessage {...messages.searchFilterSettings} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={cs.spaceBottom3}>
                  <ControlLabel className={cx(cs.commonContentText, cs.fontWeightMedium, cs.spaceBottom8)}>
                    <FormattedMessage {...messages.minimumPrice} />
                  </ControlLabel>
                  <Field name="minPrice" type="text" component={CommonFormComponent} label={formatMessage(messages.minimumPrice)} inputClass={cx(cs.adminFormControlInput)}  maxLength={15}/>
                </FormGroup>
                <FormGroup className={cs.spaceBottom3}>
                  <ControlLabel className={cx(cs.commonContentText, cs.spaceBottom8, cs.fontWeightMedium)}>
                    <FormattedMessage {...messages.maximumPrice} />
                  </ControlLabel>
                  <Field name="maxPrice" type="text" component={CommonFormComponent} label={formatMessage(messages.maximumPrice)} inputClass={cx(cs.adminFormControlInput)} maxLength={15}/>
                </FormGroup>
                <FormGroup className={cs.spaceBottom3}>
                  <ControlLabel className={cx(cs.commonContentText, cs.spaceBottom8, cs.fontWeightMedium)}>
                    <FormattedMessage {...messages.priceRangeCurrency} />
                  </ControlLabel>
                  <Field name="priceRangeCurrency" inputClass={cx(cs.adminFormControlSelect, 'adminFormControlSelectRTL', s.formControlSelect)} component={CommonFormComponent} label={formatMessage(messages.priceRangeCurrency)} >
                    {
                      availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, key) => {
                        if (currency.isEnable === true) {
                          return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                        }
                      })
                    }
                  </Field>
                </FormGroup>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
                      <Button className={cx(cs.btnPrimary, cs.btnMediumSpace)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </div>
          </div>
      </div>
    );
  }

}

SearchSettingsForm = reduxForm({
  form: 'SearchSettingsForm', // a unique name for this form
  validate
})(SearchSettingsForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SearchSettingsForm)));