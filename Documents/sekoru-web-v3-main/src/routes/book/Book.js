import React, { Component } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Book.css';

// Component
import Booking from '../../components/Booking';
class Book extends Component {
    static propTypes = {
    };

    render() {
        const { deliveryStatus } = this.props
        return (
            <>
                <Booking />
            </>
        );
    }
}

export default withStyles(s)(Book);