// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReceiptContainer.css';

// Component
import Receipt from '../../components/Receipt';
import Loader from '../../components/Loader';

// Graphql
import getReceiptQuery from './getReceiptQuery.graphql';

class ReceiptContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    receiptData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getItinerary: PropTypes.object.isRequired
    })
  };

  static defaultProps = {
    itineraryData: {
      loading: true,
    }
  };

  render() {
    const { receiptData: { loading, getItinerary, refetch } } = this.props;

    if (loading) {
      return (
        <>
          <Loader type={"text"} show={loading} />
        </>
      );
    }

    return (
      <>
        <Receipt data={getItinerary} refetch={refetch} />
      </>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getReceiptQuery,
    {
      name: 'receiptData',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ReceiptContainer);