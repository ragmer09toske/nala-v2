import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import {
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReviewsContainer.css';
import cs from '../../components/commonStyle.css'

// Component
import Reviews from '../../components/Reviews';
import ReviewsByYou from '../../components/Reviews/ReviewsByYou';

// Graphql
import UserReviewsQuery from './UserReviews.graphql';
import PendingReviewsQuery from './PendingReviews.graphql';
import SideMenu from '../../components/ManageListing/SideMenu/SideMenu';

class ReviewsContainer extends React.Component {
  static propTypes = {
    userReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.array
    }),
    pendingReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      load: true,
      isLoading:false
    }
    this.loadMore = this.loadMore.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   const { locale } = this.props.intl;
  //   const { locale: prevLocale } = prevProps.intl;

  //   if (locale !== prevLocale) {
  //     this.setState({ load: false });
  //     clearTimeout(this.loadSync);
  //     this.loadSync = null;
  //     this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
  //   }
  // }

  loadMore(ownerType, current, searchKey) {
    const { userReviewsData: { userReviews, fetchMore } } = this.props;
    this.setState({isLoading:true})
    fetchMore({
      query: UserReviewsQuery,
      variables: {
        ownerType,
        offset: userReviews.results.length,
        loadCount: 3,
        current,
        searchKey
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return {
            userReviews: {
              totalCount: previousResult.userReviews.totalCount,
              results: previousResult.userReviews.results,
            }
          }
        }
        return {
          userReviews: {
            totalCount: fetchMoreResult.userReviews.totalCount,
            results: [...previousResult.userReviews.results, ...fetchMoreResult.userReviews.results],
          }
        };
      },
    }).then(() => {
      this.setState({ isLoading: false })
    });
  }

  render() {
    const { userReviewsData, pendingReviewsData, type } = this.props;
    const { load, isLoading } = this.state;
    return (
      <>
        <Col xs={12} sm={12} md={8} lg={8} className={cs.spaceTop6}>

          {load && type == 'about-you' && <Reviews
            reviewsData={userReviewsData}
            loadMore={this.loadMore}
            isLoading={isLoading}
          />}
          {
            load && type == 'you' && <ReviewsByYou
              reviewsData={userReviewsData}
              pendingData={pendingReviewsData}
              loadMore={this.loadMore}
              isLoading={isLoading}
            />
          }
        </Col>
      </>
    );
  }
}

export default compose(
  // injectIntl,
  withStyles(s, cs),
  graphql(UserReviewsQuery,
    {
      name: 'userReviewsData',
      options: (props) => ({
        variables: {
          ownerType: 'others',
          current: 'responded'
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
  graphql(PendingReviewsQuery,
    {
      name: 'pendingReviewsData',
      options: (props) => ({
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ReviewsContainer);