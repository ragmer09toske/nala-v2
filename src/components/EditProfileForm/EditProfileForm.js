// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
// Redux Form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditProfileForm.css';
import cs from '../../components/commonStyle.css';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  InputGroup
} from 'react-bootstrap';

// Internal Components
import PhoneVerificationModal from '../PhoneVerificationModal';
import CountryList from '../CountryList';

//Images
import infoImage from '/public/SiteIcons/priceHoverIcon.svg';

class EditProfileForm extends Component {

  static propTypes = {
    loadAccount: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {},
      countryCode: 'IN',
      country: '+91',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);

    if (initialValues && initialValues.countryName && initialValues.countryCode) {
      this.setState({
        countryCode: initialValues.countryName,
        country: initialValues.countryCode
      });
    }

  }

  UNSAFE_componentWillReceiveProps() {
    const { change, initialValues } = this.props;
    const { country, countryCode } = this.state;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }

    change('loggedinEmail', loggedinEmail);

    if (countryCode && country) {
      change('countryCode', countryCode);
      change('dialCode', country);
    }
  }

  UNSAFE_componentWillMount() {
    let now = new Date();
    let currentYear = now.getFullYear();
    let years = PopulateData.generateData(1900, currentYear, "desc");
    let days = PopulateData.generateData(1, 31);
    let months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <FormGroup className={cs.spaceBottom4}>
        <label className={cs.spaceBottom8}>{label}</label>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          rows={5}
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxLength, isDisabled, inputPaddingClass, infoText, showToolTip }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom4, inputPaddingClass)}>
        <label className={cs.spaceBottom8}>{label}
          {showToolTip &&
            <div className={cx(s.specialPriceIcon, 'specialPriceIconRTL')}>
              <span className={'svgImg'}>
                <img src={infoImage} className={cx(s.faqImage, 'specialpriceRtl')} />
              </span>
              <div className={cx(s.tltip, s.relativeSection, 'tltipDarkMode', 'relativeSectionRTL')}>
                {infoText}
              </div>
            </div>
          }
        </label>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} maxLength={maxLength} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlEmail = ({ input, label, type, meta: { touched, error }, className, disabled, inputPaddingClass }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom4, inputPaddingClass)}>
        <label className={cs.spaceBottom8}>{label}</label>
        <FormControl {...input} placeholder={label} type={type} className={className} disabled={disabled} />
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlSelect = ({ input, meta: { touched, error }, children, className, inputPaddingClass }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom4, inputPaddingClass)}>
        <FormControl componentClass="select" {...input} className={cx(className, 'selectBgImage')} >
          {children}
        </FormControl>
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlCurrency = ({ input, label, type, meta: { touched, error }, className, country, maxLength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <InputGroup>
          <InputGroup.Addon className={s.addonStyle}>
            {country}
          </InputGroup.Addon>
          <FormControl {...input} placeholder={label} type={type} className={className} maxLength={maxLength} />
        </InputGroup>
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
  }

  handleCountryChange(e, selectedData) {

    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });

  }

  render() {

    const { error, handleSubmit, submitting, dispatch, loadAccount, base, availableCurrencies, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const { siteSettingStatus } = this.props;
    const { dateOfBirthData } = this.state;
    const { country, countryCode } = this.state;

    let isPhoneStatus = siteSettingStatus && siteSettingStatus.phoneNumberStatus == 3 ? false : true;

    return (
      <div className={cx('inputFocusColor', cs.commonBorderSection, 'whiteBgColor')}>
        {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
        <h2 className={cx(cs.commonTotalText, cs.fontWeightBold, cs.paddingBottom4)}>{formatMessage(messages.editYourProfile)}</h2>
        <Form onSubmit={handleSubmit(submit)}>
          <div className={s.displayGrid}>
            <Field name="firstName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.firstName)}
              placeholder={formatMessage(messages.firstName)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              inputPaddingClass={cx(s.paddingRight, 'RTLPaymentFirstNamePadding')}
              infoText={formatMessage(messages.lastNameInfo)}
              showToolTip
              maxLength={30}
            />
            <Field name="lastName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.lastName)}
              placeholder={formatMessage(messages.lastName)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              inputPaddingClass={cx(s.paddingLeft, 'RTLPaymentLastNamePadding')}
              maxLength={30}
            />
          </div>
          <div className={s.displayGrid}>
            <div>
              <label className={cs.spaceBottom8}>{formatMessage(messages.genderLabel)}</label>
              <Field name="gender" className={cs.formControlSelect} inputPaddingClass={cx(s.paddingRight, 'RTLPaymentFirstNamePadding')} component={this.renderFormControlSelect}>
                <option value="">{formatMessage(messages.gender)}</option>
                <option value="Male">{formatMessage(messages.genderMale)}</option>
                <option value="Female">{formatMessage(messages.genderFemale)}</option>
                <option value="Other">{formatMessage(messages.genderOther)}</option>
              </Field>
            </div>
            {/* <p>{formatMessage(messages.genderInfo)}</p> */}
            <div className={cx(s.paddingLeft, 'RTLPaymentLastNamePadding')}>
              <label className={cs.spaceBottom8}>{formatMessage(messages.dateOfBirth)}</label>
              <div className={s.dateGridSection}>
                <Field name="month" className={cx(cs.formControlSelect, s.editSelectPadding)} component={this.renderFormControlSelect} >
                  <option value="">{formatMessage(messages.month)}</option>
                  {
                    dateOfBirthData && dateOfBirthData.months && dateOfBirthData.months.length > 0 && dateOfBirthData.months.map((item, key) => {
                      return (
                        <option key={key} value={item}>{item + 1}</option>
                      )
                    })
                  }
                </Field>
                <Field name="day" className={cx(cs.formControlSelect, s.editSelectPadding)} inputPaddingClass={s.datePadding} component={this.renderFormControlSelect} >
                  <option value="">{formatMessage(messages.transferDate)}</option>
                  {
                    dateOfBirthData && dateOfBirthData.days && dateOfBirthData.days.length > 0 && dateOfBirthData.days.map((item, key) => {
                      return (
                        <option key={key} value={item}>{item}</option>
                      )
                    })
                  }
                </Field>
                <Field name="year" className={cx(cs.formControlSelect, s.editSelectPadding)} component={this.renderFormControlSelect} >
                  <option value="">{formatMessage(messages.year)}</option>
                  {
                    dateOfBirthData && dateOfBirthData.years && dateOfBirthData.years.length > 0 && dateOfBirthData.years.map((item, key) => {
                      return (
                        <option key={key} value={item}>{item}</option>
                      )
                    })
                  }
                </Field>
              </div>
            </div>
          </div>
          <div className={s.displayGrid}>
            <Field name="email"
              type="text"
              component={this.renderFormControlEmail}
              label={formatMessage(messages.emailLabel)}
              className={cx(cs.formControlInput, s.editProfileEmail, 'commonInputPaddingRTL')}
              disabled={true}
              inputPaddingClass={cx(s.paddingRight, 'RTLPaymentFirstNamePadding')}
            />
            <Field name="location"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.location)}
              className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
              placeholder={formatMessage(messages.location)}
              inputPaddingClass={cx(s.paddingLeft, 'RTLPaymentLastNamePadding')}
              maxLength={255}
            />
          </div>
          <label className={cs.spaceBottom8}>{formatMessage(messages.phoneNumber)}</label>
          {!isPhoneStatus &&
            <div className={cx(cs.commonBorderSection, cs.spaceBottom2, 'whiteBgColor', 'addPhoneNumber', 'addPhoneNumberRTL')}>
              <FormGroup className={cs.spaceBottom4}>
                <label className={cs.spaceBottom8}><FormattedMessage {...messages.chooseACountry} /></label>
                <CountryList
                  input={
                    {
                      name: 'countryCode',
                      onChange: this.handleChange,
                      value: countryCode,
                    }
                  }
                  className={cs.formControlSelect}
                  dialCode={false}
                  getSelected={this.handleCountryChange}
                  formName={'EditProfileForm'}
                />
              </FormGroup>
              <div className={cs.spaceBottom4}>
                <FormGroup>
                  <label className={cs.spaceBottom8}><FormattedMessage {...messages.addAPhoneNumber} /></label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    component={this.renderFormControlCurrency}
                    maxLength={255}
                    label={formatMessage(messages.enterPhoneNumber)}
                    className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                    onChange={this.handleChange}
                    country={country}
                  />
                </FormGroup>
              </div>
            </div>
          }
          {
            isPhoneStatus && <PhoneVerificationModal />
          }
          <p className={cx(cs.commonMediumText, s.paddingBottom4)}>{formatMessage(messages.phoneNumberInfo)}</p>
          <Field name="info"
            component={this.renderFormControlTextArea}
            label={formatMessage(messages.info)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
          />
          <div className={cx(cs.textAlignRight, 'textAlignLeftRTL')}>
            <Button className={cx(cs.btnPrimary, cs.btnMedium)} type="submit" disabled={submitting}>
              {formatMessage(messages.save)}
            </Button>
          </div>
        </Form>
      </div>
    )
  }

}
EditProfileForm = reduxForm({
  form: 'EditProfileForm', // a unique name for this form
  validate,
})(EditProfileForm);
const selector = formValueSelector('EditProfileForm');

const mapState = (state) => ({
  initialValues: state.account.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
  siteSettingStatus: state.siteSettings.data,
  phoneNumber: selector(state, 'phoneNumber')
});
const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getCountries {
          getCountries{
              id
              countryCode
              countryName
              isEnable
              dialCode
          }
      }
  `, {
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  })
)(EditProfileForm);