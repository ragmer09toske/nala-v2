import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Redux Action
import { change, formValueSelector } from 'redux-form';

import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!react-dates/lib/css/_datepicker.css';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
import { DateRangePicker } from 'react-dates';
import { isRTL } from '../../helpers/formatLocale';
import { START_DATE, END_DATE } from 'react-dates/constants';
import messages from '../../locale/messages';


class DateRange extends React.Component {       
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
            isCurrentStatus: 2,
            from: undefined,
            to: undefined,
            dateRange: [],
        };

        this.onDatesChange = this.onDatesChange.bind(this);
    }

    componentDidMount() {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = this.props;

        this.setState({
            isCurrentStatus: isCurrentStatus
        })

        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }



    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { defaultStartDate, defaultEndDate, isCurrentStatus } = nextProps;
        this.setState({
            isCurrentStatus: isCurrentStatus
        })
        if (defaultStartDate) {
            this.setState({
                startDate: moment(moment(defaultStartDate)),
            });
        }

        if (defaultEndDate) {
            this.setState({
                endDate: moment(moment(defaultEndDate)),
            });
        }
    }


    async onDatesChange({ startDate, endDate }) {
        const { formName, change, startDateName, endDateName, resetCalendar } = this.props;
        const { isCurrentStatus } = this.state;
        const { onChange } = this.props;
        this.setState({ startDate, endDate });

        change(formName, 'startDate', startDate);
        change(formName, 'endDate', endDate);

        await resetCalendar();

        // if (startDate != null && endDate != null) {
        //     onChange(`'${moment(startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`);
        // }
    }


    render() {
        const { focusedInput, startDate, endDate, isCurrentStatus } = this.state;
        const { intl: { locale } } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <DateRangePicker
                    {...this.props}
                    onDatesChange={this.onDatesChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    numberOfMonths={1}
                    startDatePlaceholderText={formatMessage(messages.startDate)}
                    endDatePlaceholderText={formatMessage(messages.endDate)}
                    hideKeyboardShortcutsPanel
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    readOnly
                    className={cx('specialPriceCalendar')}
                    anchorDirection={isRTL(locale) ? 'right' : 'left'}
                    isRTL={isRTL(locale)}
                />
            </div>
        );
    }
}

const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
    defaultStartDate: selector(state, 'startDate'),
    defaultEndDate: selector(state, 'endDate'),
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));

