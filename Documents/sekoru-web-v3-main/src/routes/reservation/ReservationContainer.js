import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationContainer.css';
import { connect } from 'react-redux';
import cs from '../../components/commonStyle.css'
import ManageReservation from '../../components/ManageReservation/ManageReservation';
import { onChangeListingFilter } from '../../actions/Listing/onChangeListing';
class ReservationContainer extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    userType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      listId: null,
      searchKey: '',
      startDate: null,
      endDate: null,
      orderBy: null
    };
  }

  setStateVariable = (variable) => {
    this.setState(variable)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { type } = nextProps
    if (type !== this.props.type)this.setState({currentPage:1})
  }

  componentDidMount() {
    const { onChangeListingFilter } = this.props;
    onChangeListingFilter({ orderBy: null, startDate: null, endDate: null, listId: null });
  }

  render() {
    const { userType, type } = this.props;
    const { listId, orderBy, startDate, endDate, currentPage, searchKey } = this.state;

    return (
      <ManageReservation
        searchKey={searchKey}
        userType={userType}
        type={type}
        listId={listId}
        orderBy={orderBy}
        startDate={startDate}
        endDate={endDate}
        currentPage={currentPage}
        setStateVariable={this.setStateVariable}
      />
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  onChangeListingFilter
};

export default compose(withStyles(s, cs), connect(mapState, mapDispatch))(ReservationContainer);