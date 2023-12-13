import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';
import normalizePhone from './normalizePhone';

// Style
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditUserForm.css';
import cp from '../../../components/commonStyle.css';

// Component
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class EditUserForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          rows='4'>
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={cx(classNames, cpformControlInput)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={cx(classNames, cp.formControlSelect)} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  render() {

    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues, title, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.firstName} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="firstName" type="text" component={this.renderFormControl} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.lastName} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="lastName" type="text" component={this.renderFormControl} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.gender} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={s.select}>
                      <Field name="gender" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        <option value="">{formatMessage(messages.gender)}</option>
                        <option value="Male">{formatMessage(messages.genderMale)}</option>
                        <option value="Female">{formatMessage(messages.genderFemale)}</option>
                        <option value="Other">{formatMessage(messages.genderOther)}</option>
                      </Field>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.dateOfBirthLabel} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="dateOfBirth" type="date" component={this.renderFormControl} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.phoneNumber} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="phoneNumber" type="text" component={this.renderFormControl} normalize={normalizePhone} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12} >
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.preferredLanguage} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={s.select}>
                      <Field name="preferredLanguage" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="ms">Bahasa Melayu</option>
                        <option value="ca">Català</option>
                        <option value="da">Dansk</option>
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="el">Eλληνικά</option>
                        <option value="fr">Français</option>
                        <option value="it">Italiano</option>
                        <option value="hu">Magyar</option>
                        <option value="nl">Nederlands</option>
                        <option value="no">Norsk</option>
                        <option value="pl">Polski</option>
                        <option value="pt">Português</option>
                        <option value="fi">Suomi</option>
                        <option value="sv">Svenska</option>
                        <option value="tr">Türkçe</option>
                        <option value="is">Íslenska</option>
                        <option value="cs">Čeština</option>
                        <option value="ru">Русский</option>
                        <option value="th">ภาษาไทย</option>
                        <option value="zh">中文 (简体)</option>
                        <option value="zh-TW">中文 (繁體)</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                      </Field>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12} >
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.preferredCurrency} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={s.select}>
                      <Field name="preferredCurrency" className={s.formControlSelect} component={this.renderFormControlSelect} >
                        {
                          availableCurrencies.map((currency, key) => {
                            if (currency.isEnable === true) {
                              return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                            }
                          })
                        }
                      </Field>
                    </div>

                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12} >
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.location} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="location" type="text" component={this.renderFormControl} placeholder={formatMessage(messages.locationsExample)} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12} >
                    <label className={cp.labelTextNew} ><FormattedMessage {...messages.infoLabel} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field name="info" component={this.renderFormControlTextArea} />
                  </Col>
                </FormGroup>

                <FormGroup className={s.space3}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button bsSize="small" className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                    <Link to={"/siteadmin/users/"} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}><FormattedMessage {...messages.goBack} /></Link>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
        </div>
      </div>
    )
  }

}

EditUserForm = reduxForm({
  form: 'EditUserForm', // a unique name for this form
  validate
})(EditUserForm);


const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(EditUserForm)));