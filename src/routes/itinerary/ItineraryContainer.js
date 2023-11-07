// General
import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ItineraryContainer.css';

// Component
import Itinerary from '../../components/Itinerary';
import Loader from '../../components/Loader';

// Graphql
import getItineraryQuery from './getItineraryQuery.graphql';
import NotFound from '../notFound/NotFound';

class ItineraryContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    itineraryData: PropTypes.shape({
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
    const { itineraryData: {loading, getItinerary} } = this.props;
    if(!loading && !getItinerary){
      return <NotFound />
    }
    if(loading){
      return (
        <>
          <Loader type={"text"} show={loading} />
        </>
      );
    }

    return (
      <>
        <Itinerary data={getItinerary}  />
      </>
    );
  }
}

export default compose(
    withStyles(s),
    graphql(getItineraryQuery,
      {
        name: 'itineraryData',
        options: (props) => ({
          variables : {
            reservationId: props.reservationId,
          },
          fetchPolicy: 'network-only',
        })
      }      
    ),
)(ItineraryContainer);