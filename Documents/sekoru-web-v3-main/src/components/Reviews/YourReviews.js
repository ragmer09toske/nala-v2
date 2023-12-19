import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';

// Components
import ReviewItem from './ReviewItem';
import Loader from '../Loader';
import ResponseMeItem from './ResponseMeItem';

// Locale
import messages from '../../locale/messages';
import NoDataView from '../NoDataView/NoDataView';
//Image
import noDataIcon from '/public/SiteIcons/noReviewIcon.svg';
class YourReviews extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        authorId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        yourReviewsCount: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool,
        response: PropTypes.shape({
          reservationId: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          authorId: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          authorData: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            profileId: PropTypes.number.isRequired,
          }),
          reviewContent: PropTypes.string.isRequired,
          parentId: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          isAdmin: PropTypes.bool,
          formatMessage: PropTypes.any,
        })
      }))
    }),
    loadMore: PropTypes.any.isRequired
  };

  render() {
    const { data: { loading, userReviews }, loadMore, current, searchKey, isLoading } = this.props;
    var showLoadMore = false;
    if (userReviews && userReviews.results && userReviews.results.length > 0) {
      showLoadMore = true;
    }
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {
          loading && <Loader type={"text"} />
        }
        {
          !loading && (!userReviews || (userReviews &&
            userReviews.results && userReviews.results.length === 0)) && <div className={cx(s.textCenter, s.noListingTop)}>
            <NoDataView 
              noDataIcon={noDataIcon}
              title={formatMessage(messages.noReviewHeading)}
              content1={formatMessage(messages.noReviewSubHeding)}
            />
          </div>
        }
        {
          !loading && userReviews && userReviews.results && userReviews.results.length > 0 &&
          <div className={cx(s.panelNolist, cs.spaceTop4, 'bgBlack')} >
            <ul
              className={cx(s.listStyle, s.recommondations, 'listStyleRTL')}>
              {
                userReviews.results.map((item, index) => {
                  if (current == 'notResponded') {
                    if (userReviews.count === userReviews.results.length) {
                      showLoadMore = false;
                    }
                    return <ReviewItem
                      key={index}
                      reviewContent={item.reviewContent}
                      createdAt={item.createdAt}
                      isAdmin={item.isAdmin}
                      picture={item.authorData && item.authorData.picture}
                      firstName={item.authorData && item.authorData.firstName}
                      lastName={item.authorData && item.authorData.lastName}
                      profileId={item.authorData && item.authorData.profileId}
                      rating={item.rating}
                      listData={item.listData}
                      current={current}
                      reservationId={item.reservationId}
                    />
                  } else if (current == 'responded') {
                    if (userReviews.count === userReviews.results.length) {
                      showLoadMore = false;
                    }
                    return <ResponseMeItem
                      key={index}
                      reviewContent={item.reviewContent}
                      createdAt={item.createdAt}
                      response={item.response}
                      isAdmin={item.isAdmin}
                      picture={item.authorData && item.authorData.picture}
                      firstName={item.authorData && item.authorData.firstName}
                      lastName={item.authorData && item.authorData.lastName}
                      profileId={item.authorData && item.authorData.profileId}
                      rating={item.rating}
                      listData={item.listData}
                      showReviewName={true}
                      userData={item.userData}
                    />
                  }
                })
              }
            </ul>
          </div>
        }
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className={""}>
            {
              !loading && showLoadMore && userReviews && userReviews.results && userReviews.results.length > 0 && <div className={cx(s.space2, s.textCenter)}>
                <Button className={cx(cs.loadBtn)} onClick={() => loadMore('others', current, searchKey)} disabled={isLoading}>
                  <FormattedMessage {...messages.loadMore} />...</Button>
              </div>
            }
          </Col>
        </Row>
      </div>

    );
  }
}

export default injectIntl(withStyles(s)(YourReviews));

