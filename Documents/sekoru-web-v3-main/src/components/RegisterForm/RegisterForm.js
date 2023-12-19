import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
// Helper
import PopulateData from '../../helpers/populateData';
//Actions
import { closeSignupModal, openLoginModal } from '../../actions/modalActions';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './RegisterForm.css';
import cs from '../../components/commonStyle.css';
import c from '../../components/LoginModal/LoginModal.css'

import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

//Components
import Link from '../Link';
import CustomCheckbox from '../CustomCheckbox';
import SocialLogin from '../SocialLogin';

//Images
import arrow from '/public/siteImages/whiteArrow.svg';
import ShowPassword from '/public/SiteIcons/pswVisible.svg';
import HidePassword from '/public/SiteIcons/pwdHidden.svg';

const onSubmitFail = (errors) => {
  if (errors) {
    let section = Object.keys(errors);
    if (section && section.length > 0)
      document.getElementById(section[0]).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }
};
class RegisterForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {},
      showPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    this.setState({ showPassword: fieldName === this.state.showPassword ? "" : fieldName });
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

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, showPassword, maxLength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(cs.spaceBottom3, cs.positionRelative)} id={input.name}>
        <label >{label}</label>
        <FormControl {...input} placeholder={label} type={showPassword === input.name ? input : type} className={className} maxLength={maxLength} />
        {type == 'password' && <span onClick={() => this.handleChange(input.name)} className={cx(cs.passwordIcon, 'passwordIconRTL')}>
          {showPassword === input.name ? <img src={ShowPassword} /> : <img src={HidePassword} />}
        </span>}
        {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlSelect = ({ input, meta: { touched, error }, children, className, selectClass }) => {
    return (
      <FormGroup className={cx(cs.spaceBottom3, selectClass)} id={"_error"}>
        <FormControl componentClass="select" {...input} className={className}>
          {children}
        </FormControl>
      </FormGroup>
    )
  }

  checkboxGroup = ({ input, meta: { touched, error }, children, className, selectClass, name }) => {
    return (
      <div className={cx(s.checkBoxGrid, cs.paddingBottom4)}>
        <CustomCheckbox
          name={name}
          className={'icheckbox_square-green'}
          checked={input.value == true}
          onChange={event => {
            return input.onChange(event);
          }}
        />
        <p className={cx(cs.commonMediumText, cs.fontWeightNormal, s.checkBoxText, 'signUpCheckBoxTextRTl')}>
          <FormattedMessage {...messages.terms1} />
          <a href={"/privacy"} target={'blank'} className={cx(cs.siteLinkColor, cs.textTransformLowerCase)}>&nbsp;<FormattedMessage {...messages.termsOfService} />&nbsp;</a>
          <FormattedMessage {...messages.and} />
          <span>&nbsp;<a href={"/privacy"} target={'blank'} className={cx(cs.siteLinkColor, cs.textTransformLowerCase)}><FormattedMessage {...messages.privacyPolicy} /></a>&nbsp;</span>
        </p>
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, loginURL, openLoginModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { dateOfBirthData } = this.state;

    return (
      <>
        <h5 className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3, cs.textAlignCenter)}>
          <FormattedMessage {...messages.createYourAccount} />
        </h5>
        <SocialLogin />
        <strong className={c.lineThrough}>
          <FormattedMessage {...messages.or} />
        </strong>
        <form onSubmit={handleSubmit(submit)} className={cx('noScroll', 'inputFocusColor')}>
          <Field name="firstName"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.firstName)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
            maxLength={30}
          />
          <Field name="lastName"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.lastName)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
            maxLength={30}
          />
          <Field name="email"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.emailLabel)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
            maxLength={255}
          />
          <Field name="password"
            type="password"
            component={this.renderFormControl}
            label={formatMessage(messages.password)}
            className={cx(cs.formControlInput, 'commonInputPaddingRTL', 'passwordInputPadding')}
            showPassword={this.state.showPassword}
            maxLength={25}
          />
          <label>{formatMessage(messages.birthDay)}</label>
          <div className={s.displayGridDate}>
            <Field name="month" component={this.renderFormControlSelect} className={cs.formControlSelect}>
              <option value="">{formatMessage(messages.month)}</option>
              {
                dateOfBirthData && dateOfBirthData.months && dateOfBirthData.months.length > 0 && dateOfBirthData.months.map((item, key) => {
                  return (
                    <option key={key} value={item}>{item + 1}</option>
                  )
                })
              }
            </Field>
            <Field name="day" component={this.renderFormControlSelect} className={cs.formControlSelect} selectClass={s.datePadding}>
              <option value="">{formatMessage(messages.dateLabel)}</option>
              {
                dateOfBirthData && dateOfBirthData.days && dateOfBirthData.days.length > 0 && dateOfBirthData.days.map((item, key) => {
                  return (
                    <option key={key} value={item}>{item}</option>
                  )
                })
              }
            </Field>
            <Field name="year" component={this.renderFormControlSelect} className={cs.formControlSelect}>
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
          {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
          <Field name="termsPolicy" component={this.checkboxGroup} />
          <Button
            className={cx(cs.btnPrimary, cs.spaceBottom2)}
            bsSize="large"
            block type="submit"
            disabled={submitting}
          >
            {formatMessage(messages.signUp)}
            <img src={arrow} className={cx(cs.blueLeftArrow, 'loginArrowRTL')} />
          </Button>
        </form>
        <h6 className={cx(cs.siteTextColor, cs.commonMediumText, cs.fontWeightNormal, cs.textAlignCenter,)}>
          <FormattedMessage {...messages.alreadyHaveAccount} />  {' '}
          {!loginURL && <a onClick={openLoginModal} className={cx(cs.siteLinkColor, cs.commonMediumText, cs.fontWeightMedium, cs.curserPointer)}>
            <FormattedMessage {...messages.login} />
          </a>}
          {loginURL && <Link className={cx(cs.siteLinkColor, cs.commonMediumText, cs.fontWeightMedium, cs.curserPointer)} to={loginURL}>
            <FormattedMessage {...messages.login} />
          </Link>}
        </h6>
      </>
    )
  }
}

RegisterForm = reduxForm({
  form: 'RegisterForm', // a unique name for this form
  validate,
  onSubmitFail
})(RegisterForm);

const mapState = (state) => ({
  formErrors: getFormSyncErrors('RegisterForm')(state)
});

const mapDispatch = {
  closeSignupModal,
  openLoginModal,
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(RegisterForm)));