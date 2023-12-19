// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux form
import { Field, reduxForm, hasSubmitFailed, getFormMeta } from 'redux-form';

import CustomCheckbox from '../CustomCheckbox';

import submit from './submit';

import { sitename } from '../../config';

// Locale
import messages from '../../locale/messages';
import validate from './validate';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReportUserForm.css';
import cs from '../../components/commonStyle.css'
import {
    Button,
    FormGroup,
    FormControl,
} from 'react-bootstrap';


class ReportUserForm extends Component {

    static propTypes = {
        openForgotPasswordModal: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    renderFormControlWork = ({ input, meta: { touched, error }, label, name }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
                <div>
                    <CustomCheckbox
                        name={name}
                        checked={input.value == true}
                        onChange={event => {
                            return input.onChange(event);
                        }}
                    />
                </div>
            </div>
        )
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    placeholder={label}
                    type={type}
                    className={className}
                />
            </div>
        );
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, reporterId, formErrors } = this.props;
        const { formatMessage } = this.props.intl;

        let isShow = (formErrors.hasOwnProperty('syncErrors') && formErrors['anyTouched']) && formErrors['submitFailed'] ? true : false

        return (
            <form onSubmit={handleSubmit(submit)}>
                {error && <span className={cs.errorMessage}>{formatMessage(error)}</span>}
                <div>
                    <p className={cx(cs.commonContentText, cs.fontWeightBold, cs.paddingBottom2)}>
                        <FormattedMessage {...messages.reportUserInfo} />
                    </p>
                    <div className={cx(cs.paddingBottom2, 'customRatioButton')}>
                        <label className={cx(cs.commonMediumText, s.displayGrid)}>
                            <Field
                                name="reportType"
                                component="input"
                                type="radio"
                                value="Shouldn't available"
                                className={cx(s.blockRadioButton, 'blockRadioButtonRTL')}
                            />
                            <FormattedMessage {...messages.reportContent1} />
                            {' '} {sitename}
                        </label>
                    </div>
                    <div className={cx(cs.paddingBottom2, 'customRatioButton')}>
                        <label className={cx(cs.commonMediumText, s.displayGrid)}>
                            <Field
                                name="reportType"
                                component="input"
                                type="radio"
                                value="Direct contact"
                                className={cx(s.blockRadioButton, 'blockRadioButtonRTL')}
                            />
                            <FormattedMessage {...messages.reportContent2} />
                        </label>
                    </div>
                    <div className={cx(cs.paddingBottom2, 'customRatioButton')}>
                        <label className={cx(cs.commonMediumText, s.displayGrid)}>
                            <Field
                                name="reportType"
                                component="input"
                                type="radio"
                                value="Spam"
                                className={cx(s.blockRadioButton, 'blockRadioButtonRTL')}
                            />
                            <FormattedMessage {...messages.reportContent3} />
                        </label>
                        {isShow && <span className={cs.errorMessage}><FormattedMessage {...messages.required} /></span>}
                    </div>
                    <Button
                        className={cx(cs.btnPrimary, cs.spaceTop3)}
                        bsSize="large"
                        block type="submit"
                        disabled={submitting}
                    >
                        {formatMessage(messages.submit)}
                    </Button>
                </div>
            </form>
        );
    }
}

ReportUserForm = reduxForm({
    form: 'ReportUserForm', // a unique name for this form
    destroyOnUnmount: false,
    validate
})(ReportUserForm);

const mapState = state => ({
    formErrors: state.form.ReportUserForm
});

const mapDispatch = {
};

export default injectIntl(
    withStyles(s, cs)
        (
            connect(mapState, mapDispatch)
                (ReportUserForm)
        )
);