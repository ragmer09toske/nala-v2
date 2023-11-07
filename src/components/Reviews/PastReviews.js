import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../components/commonStyle.css';
// Components
import ReviewItemAboutYou from './ReviewItemAboutYou';
import Loader from '../Loader';
// Locale
import messages from '../../locale/messages';
import NoDataView from '../NoDataView/NoDataView';
//image
import noDataIcon from '/public/SiteIcons/noReviewIcon.svg';

class PastReviews extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        authorId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        reviewsCount: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
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
        })
      }))
    }),
  };

  render() {
    const { data: { loading, userReviews }, loadMore, searchKey, isLoading } = this.props;
    const { formatMessage } = this.props.intl;
    var showLoadMore = false;
    if (userReviews && userReviews.results && userReviews.results.length > 0) {
      showLoadMore = true;
    }

    return (
      <>

        {
          loading && <Loader type={"text"} />
        }
        {
          !loading && (userReviews === null || userReviews && userReviews.results && userReviews.results.length === 0) &&
          <div className={cx(s.textCenter, s.noListingTop)}>
						<NoDataView
							noDataIcon={noDataIcon}
							title={formatMessage(messages.noReviewHeadingByYou)}
							content1={formatMessage(messages.noReviewSubHeding)}
						/>
					</div>
        }
        {
          !loading && userReviews && userReviews.results && userReviews.results.length > 0 &&
          <div className={cx(s.panelNolist, cs.spaceTop4, 'bgBlack')}>
            <ul className={cx(s.listStyle, s.recommondations, 'listStyleRTL')}>
              {
                userReviews.results.map((item, index) => {
                  if (userReviews.count === userReviews.results.length) {
                    showLoadMore = false;
                  }
                  if (item && item.authorData && item.userData) {
                    return <ReviewItemAboutYou
                      key={index}
                      picture={item.authorData.picture}
                      firstName={item.authorData.firstName}
                      lastName={item.authorData.lastName}
                      otherUserName={item.userData.firstName}
                      otherUserProfileId={item.userData.profileId}
                      profileId={item.authorData.profileId}
                      reviewContent={item.reviewContent}
                      createdAt={item.createdAt}
                      response={item.response}
                      listData={item.listData}
                      otherUserResponse
                      showUserName
                      rating={item.rating}
                    />
                  }
                })
              }
            </ul>
          </div>
        }
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className={s.spaceBottom20}>
            {
              !loading && showLoadMore && <div className={cx(s.space2, s.textCenter, s.marginTop)}>
                <Button disabled={isLoading} onClick={() => loadMore('me', null, searchKey)} className={cx(cs.loadBtn)}>
                  <FormattedMessage {...messages.loadMore} />...
                </Button>
              </div>
            }
          </Col>
        </Row>

      </>
    );
  }
}

export default injectIntl(withStyles(s, cs)(PastReviews));
