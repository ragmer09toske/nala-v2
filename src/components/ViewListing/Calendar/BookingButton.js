import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import cs from '../../../components/commonStyle.css';
import {
    Button
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import Loader from '../../Loader';
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

//Images
import arrow from '/public/siteImages/whiteArrow.svg';
class BookingButton extends Component {
    static propTypes = {
        availability: PropTypes.bool.isRequired,
        isDateChosen: PropTypes.bool.isRequired,
        basePrice: PropTypes.number.isRequired,
        isHost: PropTypes.bool.isRequired,
        bookingProcess: PropTypes.any.isRequired,
        listId: PropTypes.number.isRequired,
        guests: PropTypes.number.isRequired,
        startDate: PropTypes.object,
        endDate: PropTypes.object,
        bookingType: PropTypes.string.isRequired,
        bookingLoading: PropTypes.bool,
        formatMessage: PropTypes.any,
        maximumStay: PropTypes.bool,
        userBanStatus: PropTypes.number,
    };
    static defaultProps = {
        availability: true,
        isDateChosen: false,
        bookingLoading: false
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.hanldeChange = this.hanldeChange.bind(this);
    }
    handleClick() {
        const { bookingProcess, listId, guests, startDate, endDate, startTime, endTime, deliveryStatus, roomType } = this.props;
        bookingProcess(
            listId, guests, startDate, endDate, null, startTime, endTime, deliveryStatus, roomType);
    }
    hanldeChange() {
        history.push('/s');
    }
    render() {
        const { basePrice, userBanStatus, isDateChosen, availability, isHost, bookingType, bookingLoading } = this.props;
        const { formatMessage } = this.props.intl;
        const { maximumStay, isDisabled } = this.props;

        let disabled, buttonLabel;
        if (isDisabled || basePrice < 1 || isHost || maximumStay || userBanStatus) {
            disabled = true;
        } else {
            disabled = false;
        }
        if (bookingType === 'instant') {
            buttonLabel = messages.bookNow;
        } else {
            buttonLabel = messages.requestToBook;
        }
        if (!availability && isDateChosen) {
            return (
                <>
                    <Button className={cx(cs.btnBig, cs.btnPrimaryBorder, cs.fullWidth)} onClick={this.hanldeChange}>
                        <FormattedMessage {...messages.viewOtherListings} />
                    </Button>
                </>
            );
        } else {
            return (
                <div className='arButtonLoader'>
                    <Loader
                        type={"button"}
                        className={cx(cs.btnBig, cs.btnPrimary, cs.fullWidth)}
                        handleClick={this.handleClick}
                        disabled={disabled}
                        show={bookingLoading}
                        label={formatMessage(buttonLabel)}
                        image={arrow}
                    />
                </div>
            );
        }
    }
}
export default injectIntl(withStyles(s, cs)(BookingButton));