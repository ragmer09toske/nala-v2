import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// External component
import {Range} from 'rc-slider';


// Redux form
import {change} from 'redux-form';

import { Button } from 'react-bootstrap';

// Helper
import {convert} from '../../../helpers/currencyConvertion';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Guests.css';

class PriceRange extends Component {
  
    
    render() {
        const { min, max } = this.props;

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.buttonBlock}>
                        <Button className={s.button}>
                        <FormattedMessage {...messages.showMapp} />
                        </Button>
                    </div>
                </div> 
            </div>
        );
    }
}


export default injectIntl(withStyles(s)(PriceRange));