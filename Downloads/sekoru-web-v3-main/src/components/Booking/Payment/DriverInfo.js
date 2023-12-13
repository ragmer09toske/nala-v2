import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import cx from 'classnames';
import {
    FormGroup,
    FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cs from '../../../components/commonStyle.css';

// Helper
import PopulateData from '../../../helpers/populateData';

// Locale
import messages from '../../../locale/messages';
import CountryList from '../../CountryList';

class DriverInfo extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        paymentType: PropTypes.number
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            lookupData: {},
            countryCode: 'IN',
            country: '+91',
        }
        this.renderField = this.renderField.bind(this);
        this.renderFormControl = this.renderFormControl.bind(this);
        this.renderFormControlSelect = this.renderFormControlSelect.bind(this);
        this.renderCountryList = this.renderCountryList.bind(this);
    }

    UNSAFE_componentWillMount() {
        let now = new Date();
        let currentYear = now.getFullYear();
        let years = PopulateData.generateData(1900, currentYear, "desc");
        let months = PopulateData.generateData(0, 11);
        let days = PopulateData.generateData(1, 31);

        this.setState({
            lookupData: {
                years: years,
                months: months,
                days: days
            }
        });
    }

    renderField({ input, label, type, placeholder, meta: { touched, error, dirty }, disabled, className, firstNamePaddingClassName, maxLength }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(cs.spaceBottom4, firstNamePaddingClassName)}>
                <label>{label}</label>
                <FormControl disabled={disabled} {...input} componentClass="input" placeholder={placeholder} className={className} maxLength={maxLength} />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderFormControl({ input, label, type, placeholder, meta: { touched, error, dirty }, disabled, className, maxLength }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom4}>
                <label>{label}</label>
                <FormControl disabled={disabled} {...input} componentClass="input" placeholder={placeholder} className={className} maxLength={maxLength} />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    renderFormControlSelect({ input, placeholder, meta: { touched, error }, children, className, disabled, datePadding }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(cs.noMargin, datePadding)}>
                <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
                    {children}
                </FormControl>
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        )
    }

    renderCountryList({ input, label, meta: { touched, error }, children, className, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cs.spaceBottom4}>
                <label>{label}</label>
                <CountryList input={input} className={className} disabled={disabled} />
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        );
    }

    render() {
        const { handleSubmit, submitting, error, pristine, paymentType, disabled } = this.props;
        const { lookupData } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.creditCardForm, 'inputFocusColor')}>
                <Field
                    name="licenseNumber"
                    component={this.renderFormControl}
                    placeholder={formatMessage(messages.licenseNumber)}
                    label={formatMessage(messages.licenseNumber)}
                    className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                    disabled={disabled}
                    maxLength={255}
                />
                <div className={s.displayGridFirstName}>
                    <Field
                        name="firstName"
                        component={this.renderField}
                        placeholder={formatMessage(messages.firstName)}
                        label={formatMessage(messages.firstName)}
                        className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                        firstNamePaddingClassName={cx(s.firstNamePaddingRight, 'RTLPaymentFirstNamePadding')}
                        disabled={disabled}
                        maxLength={30}
                    />
                    <Field
                        name="lastName"
                        component={this.renderField}
                        placeholder={formatMessage(messages.lastName)}
                        label={formatMessage(messages.lastName)}
                        className={cx(cs.formControlInput, 'commonInputPaddingRTL')}
                        firstNamePaddingClassName={cx(s.lastNamePaddingLeft, 'RTLPaymentLastNamePadding')}
                        disabled={disabled}
                        maxLength={30}
                    />
                </div>
                <div>
                    <Field
                        name="country"
                        component={this.renderCountryList}
                        label={formatMessage(messages.country)}
                        className={cs.formControlSelect}
                        disabled={disabled}

                    />
                </div>
                <label>{formatMessage(messages.dateOfBirth)}</label>
                <div className={s.dateFiledGrid}>
                    <Field name="month" component={this.renderFormControlSelect} className={cs.formControlSelect} disabled={disabled}>
                        <option value="">{formatMessage(messages.month)}</option>
                        {
                            lookupData.months.map((item, key) => {
                                return (
                                    <option key={key} value={item}>{item + 1}</option>
                                )
                            })
                        }
                    </Field>
                    <Field name="day"
                        component={this.renderFormControlSelect}
                        className={cs.formControlSelect}
                        datePadding={s.datePadding}
                        disabled={disabled}
                    >
                        <option value="">{formatMessage(messages.transferDate)}</option>
                        {
                            lookupData.days.map((item, key) => {
                                return (
                                    <option key={key} value={item}>{item}</option>
                                )
                            })
                        }
                    </Field>
                    <Field
                        name="year"
                        component={this.renderFormControlSelect}
                        className={cs.formControlSelect}
                        disabled={disabled}
                    >
                        <option value="">{formatMessage(messages.expiryYear)}</option>
                        {
                            lookupData.years.map((item, key) => {
                                return (
                                    <option key={key} value={item}>{item}</option>
                                )
                            })
                        }
                    </Field>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(DriverInfo)));