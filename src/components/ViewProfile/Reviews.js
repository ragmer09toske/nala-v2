import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import cs from '../commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';
import StarIcon from '/public/SiteIcons/Group 39536.svg';
// Component
import ReviewItem from './ReviewItem';


// Locale
import messages from '../../locale/messages';

class Reviews extends React.Component {

  static propTypes = {
    reviewsCount: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    loadMore: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {};

  render() {
    const { reviewsCount, data, loadMore, loading } = this.props;
    const { formatMessage } = this.props.intl;
    let showLoadMore = true;
    if (reviewsCount === data.length) {
      showLoadMore = false;
    }
    return (
      <div className={cx(s.recommendations)}>
        <div className={s.lineCss}></div>
        <div className={cx(s.heading,s.mainHeading,cs.dFlex)}>
          <img src={StarIcon} alt="star Icon" />
          {reviewsCount}{" "}
          {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
        </div>
        {
          data && data.map((item, index) => {
            if (item.isAdmin) {
              return <ReviewItem
                key={index}
                reviewContent={item.reviewContent}
                createdAt={item.createdAt}
                response={item.response}
                isAdmin={item.isAdmin}
                rating={item.rating}
              />
            } else {
              if (item.authorData) {
                return <ReviewItem
                  key={index}
                  picture={item.authorData.picture}
                  firstName={item.authorData.firstName}
                  lastName={item.authorData.lastName}
                  profileId={item.authorData.profileId}
                  reviewContent={item.reviewContent}
                  createdAt={item.createdAt}
                  response={item.response}
                  location={item.authorData.location}
                  isAdmin={item.isAdmin}
                  rating={item.rating}
                  listData={item.listData}
                />
              } else {
                return <div />
              }
            }
          })
        }
        {
          showLoadMore && <div className={cx(s.textCenter, s.loadMoreText)}>
            <Button disabled={loading} className={cx(s.btnPrimary)} onClick={() => loadMore()}>
              <FormattedMessage {...messages.loadMore} />...</Button>
          </div>
        }

      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Reviews));