
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transmission.css';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';
import Switch from '../../../../Switch';

class Transmission extends Component {

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

    renderSwitch = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
        const { change, transmission } = this.props;

        return (
            <div>
                <Switch
                    {...input}
                    checked={transmission == 'Automatic'}
                    formName={'SearchForm'}
                    fieldName={'transmission'}
                    checkedValue={'Automatic'}
                    unCheckedValue={'Manual'}
                />
            </div>
        )
    }

    render() {

        return (
            <div className={cx(s.displayFlex,s.pullRight, 'floatLeftRTL', 'floatRightTransRTL')}>
            <p className={cx(s.captionTitle, s.textBold, s.marginRight15, 'marginRight15RTL')}>
              <FormattedMessage {...messages.automaticTransmission} />
            </p>
            <span className='directionLtr'>
                <Field
                    name="transmission"
                    component={this.renderSwitch}
                />
            </span>
            </div>
        );
    }
}

Transmission = reduxForm({
    form: 'SearchForm', // a unique name for this form
    onSubmit: submit,
    destroyOnUnmount: false,
})(Transmission);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
    fieldsSettingsData: state.listingFields.data,
    transmission: selector(state, 'transmission')
});

const mapDispatch = {
    change,
    submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Transmission)));