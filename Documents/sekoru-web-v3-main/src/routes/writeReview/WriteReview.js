// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WriteReview.css';

// Component
import Loader from '../../components/Loader';
import ReviewRating from '../../components/Reviews/Rating';

// Graphql
import WriteReviewDataQuery from './WriteReviewData.graphql';
import NotFound from '../notFound/NotFound';
class WriteReview extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    writeReview: PropTypes.shape({
      loading: PropTypes.bool,
      writeReviewData: PropTypes.object
    }),
  };

  static defaultProps = {};

  render() {
    const { writeReview, writeReview: { writeReviewData, loading }, title} = this.props;
    if (!loading && !writeReviewData) {
      return <NotFound title={title} />
    }
    return (
      <>
        {!loading &&
          <div className={s.root}>
            <div className={s.container}>
              <ReviewRating data={writeReview} />
            </div>
          </div>}
      </>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(WriteReviewDataQuery,
    {
      name: 'writeReview',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(WriteReview);
