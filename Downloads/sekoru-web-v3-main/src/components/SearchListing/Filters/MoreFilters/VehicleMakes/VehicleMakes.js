
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VehicleMakes.css';
import {
    Button,
    FormControl
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';


class VehicleMakes extends Component {

    static propTypes = {
        className: PropTypes.any,
        handleTabToggle: PropTypes.any,
        isExpand: PropTypes.bool,
    };

    static defaultProps = {
        isExpand: false
    };

    constructor(props) {
        super(props);
    }

    renderFormControlSelect({ input, label, placeholder, meta: { touched, error }, children, className, disabled }) {
        return (
            <FormControl componentClass="select" {...input} className={cx(s.customSelect, 'customSelectRTL')} >
                {children}
            </FormControl>
        )
    }

    render() {
        const { className, handleTabToggle, isExpand, searchSettings } = this.props;
        const { options } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={className}>
                <p className={cx(s.captionTitle, s.textBold, 'textAlignRightRTL')}>
                    <FormattedMessage {...messages.whatTypeOfProperty} />
                </p>
                <Field name="make" component={this.renderFormControlSelect}>
                    <option value="">
                        {formatMessage(messages.selectLabel)}
                    </option>
                    {
                        options.map((value, key) => {
                            return (
                                value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                            )
                        })
                    }
                </Field>
            </div>
        );
    }
}

VehicleMakes = reduxForm({
    form: 'SearchForm', // a unique name for this form
    onSubmit: submit,
    destroyOnUnmount: false,
})(VehicleMakes);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
    fieldsSettingsData: state.listingFields.data,
    priceRangeLabel: selector(state, 'priceRangeLabel'),
    makeValue: selector(state, 'make'),
});

const mapDispatch = {
    change,
    submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(VehicleMakes)));