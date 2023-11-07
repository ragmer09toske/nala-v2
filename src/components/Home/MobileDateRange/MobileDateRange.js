import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { DateRangePicker, VERTICAL_ORIENTATION, HORIZONTAL_ORIENTATION } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';
import { change } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';


// Locale
import messages from '../../../locale/messages';
import { isRTL } from '../../../helpers/formatLocale';


class MobileDateRange extends React.Component {
    static propTypes = {
        onChange: PropTypes.any,
        numberOfMonths: PropTypes.number,
        formatMessage: PropTypes.any,
        setPersonalizedValues: PropTypes.any,
        personalized: PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { personalized } = this.props;

        if (personalized != undefined) {
            if (personalized.startDate && personalized.endDate) {
                this.setState({
                    startDate: moment(personalized.startDate),
                    endDate: moment(personalized.endDate)
                });
            }
        }
    }



    onDatesChange({ startDate, endDate }) {
        const { setPersonalizedValues } = this.props;
        this.setState({ startDate, endDate });
        if (startDate != null && endDate != null) {
            setPersonalizedValues({ name: 'startDate', value: moment(startDate).format("YYYY-MM-DD") });
            setPersonalizedValues({ name: 'endDate', value: moment(endDate).format("YYYY-MM-DD") });
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    onClear = () => {
        const { setPersonalizedValues, formName, change } = this.props;
        setPersonalizedValues({ name: 'startDate', value: null });
        setPersonalizedValues({ name: 'endDate', value: null });
        change(formName, 'dates', null);
        this.setState({
          startDate: null,
          endDate: null,
        });
      }

    render() {
        const { focusedInput, startDate, endDate } = this.state;
        const { numberOfMonths } = this.props;
        const { formatMessage } = this.props.intl;
        const { locale } = this.props;
        return (
            <div>
                <DateRangePicker
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    numberOfMonths={numberOfMonths}
                    startDatePlaceholderText={formatMessage(messages.checkIn)}
                    endDatePlaceholderText={formatMessage(messages.checkOut)}
                    //   orientation="vertical" 
                    //   withFullScreenPortal
                    hideKeyboardShortcutsPanel
                    anchorDirection={isRTL(locale) ? 'right' : 'left'}
                    isRTL={isRTL(locale)}
                    readOnly
                    minimumNights={0}
                    renderCalendarInfo={(props) => {
                        return (
                          <div onClick={() => { this.onClear() }} className={'clearFlex'}>{formatMessage(messages.clear)}</div>
                        )
                      }}
                />
            </div>
        );
    }
}


const mapState = (state) => ({
    personalized: state.personalized,
    locale: state.intl.locale
});

const mapDispatch = {
    setPersonalizedValues,
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MobileDateRange)));

