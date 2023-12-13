import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapSwitch from 'lyef-switch-button';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// External component
import Switch from './Switch';

import {
    Button,
    Grid,
    Row,
    Col,
    Breadcrumb,
    Field
} from 'react-bootstrap';


// Redux form
import {change} from 'redux-form';


// Helper
import {convert} from '../../../helpers/currencyConvertion';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapSwitch.css';

class Hello extends Component {
    

    render() {
        return (
            <div className={s.root}>
                <div className={s.textContainer}>
                    <FormattedMessage {...messages.showMapp} />
                </div>
                <div className={s.btnContainer}>
                    <Field 
                        name="bookingType" 
                        component={this.renderSwitch} 
                    />   
                </div>
            </div>
        );
    }
}


export default injectIntl(withStyles(s)(Hello));