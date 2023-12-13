import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservations.css';

// Query
import reservationsQuery from './reservationsQuery.graphql';

// Component
import ReservationManagement from '../../../components/siteadmin/ReservationManagement';
class Reservations extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllReservationAdmin: PropTypes.array,
    })
  };

  static defaultProps = {
    getAllReservations: {
      loading: true,
      getAllReservationAdmin: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
    };
  }

  changeState = (variables) => this.setState(variables)

  render() {
    const { getAllReservations } = this.props;

    return <ReservationManagement
      changeStateValues={this.changeState}
      currentPage={this.state.currentPage}
      searchList={this.state.searchList}
      getAllReservationAdmin={getAllReservations}
    />
  }

}

export default compose(
  withStyles(s),
  graphql(reservationsQuery, {
    name: 'getAllReservations',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
      },
      fetchPolicy: 'network-only',
    }
  })
)(Reservations);