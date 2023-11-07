import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import cx from 'classnames';
// Redux Action
import { change } from 'redux-form';
import { checkAvailability } from '../../../actions/checkAvailability';
class TimeField extends React.Component {
    static propTypes = {
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number.isRequired,
        checkAvailability: PropTypes.func.isRequired,
        listId: PropTypes.number.isRequired,
        formName: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        this.state = {
            inputValue:value
        };
    }

    async handleChange(event) {
        let value = event.target.value;
        const { name, formName, maximumNights } = this.props;
        const { listId, checkAvailability, change } = this.props;
        const { startDate, endDate, startTime, endTime } = this.props;
        this.setState({
            inputValue: value
        })
        await change(formName, name, value);
        if (name === "endTime" && startDate) {
            checkAvailability(listId, startDate, endDate, maximumNights, startTime, value);
        } else if (name === "startTime" && startDate) {
            if (startDate && endDate && endTime) {
                checkAvailability(listId, startDate, endDate, maximumNights, value, endTime);
            }
        }
    }

    render() {
        const { name, className, TimeLookup, classNameParent, label } = this.props;
        return (
            <div className={cx('inputFocusColor', classNameParent)}>
                <FormControl
                    name={name}
                    componentClass="select"
                    className={className}
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                >
                    <option value="">{label}</option>
                    {
                        TimeLookup && TimeLookup.length > 0 && TimeLookup.map((item, key) => {
                            return (<option key={key} value={item.value}>{item.label}</option>)
                        })
                    }
                </FormControl>
            </div>
        );
    }
}

const mapState = state => ({
    isLoading: state.viewListing.isLoading,
    availability: state.viewListing.availability,
});

const mapDispatch = {
    checkAvailability,
    change,
};

export default connect(mapState, mapDispatch)(TimeField);
