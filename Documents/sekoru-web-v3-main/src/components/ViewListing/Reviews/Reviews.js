import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import cs from '../../../components/commonStyle.css';
import c from '../../../components/ViewListing/common.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import StarRating from '../../StarRating';
import Avatar from '../../Avatar';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

//Images
import starImage from '/public/SiteIcons/star.svg';

class Reviews extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      moreListReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
      })),
    })
  };

  static defaultProps = {
    loading: true
  };

  constructor(props) {
    super(props);
      this.state={
        isLoading: false
      }
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(ownerType) {
    const { data: { moreListReviews, fetchMore }, listId } = this.props;
    this.setState({ isLoading: true })
    fetchMore({
      //query: UserReviewsQuery,
      variables: {
        listId,
        offset: moreListReviews.length,
        loadCount: 5,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return {
          moreListReviews: [...previousResult.moreListReviews, ...fetchMoreResult.moreListReviews],
        };
      },
    }).then(() => {
      this.setState({ isLoading: false })
    });
  }

  render() {
    const { data: { loading, moreListReviews } } = this.props;
    const { reviewsCount, reviewsStarRating } = this.props;
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;
    const { isLoading } = this.state;
    let starRatingValue = 0, showLoadMore = true;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    if (moreListReviews && reviewsCount === moreListReviews.length) {
      showLoadMore = false;
    }

    if (loading) {
      return <Loader type={"text"} />
    }

    if (reviewsCount === 0) {
      return (
        <div>
          <h5 className={cx(cs.commonSubTitleText, cs.paddingBottom4, cs.fontWeightBold)}><FormattedMessage {...messages.noReviewTitle} /></h5>
          <h6 className={cs.commonContentText}><FormattedMessage {...messages.noReviewInfo} /></h6>
          <hr className={cs.listingHorizoltalLine} />
        </div>
      );
    }

    return (
      <div>
        <h4 className={cx(cs.commonSubTitleText, cs.paddingBottom4, c.reviewStarSection, cs.fontWeightBold)}>
          {starRatingValue > 0 && <span className={c.reviewCountFlex}>
            <img src={starImage} className={cx(c.starImageMargin, 'viewlistStarImage')} />
            <span>{' '}{starRatingValue}</span>
          </span>}{' '}
          <span className={cx('viewlistDotSectionRTL', { [c.dotSection]: starRatingValue > 0 })}>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
        </h4>
        {
          !loading && moreListReviews && moreListReviews.map((item, index) => {
            let date = moment(item.createdAt).format('MMM, YYYY');
            return (<>
              <div key={index} className={c.imageSection}>
                <div className={cs.positionRelative}>
                  {
                    !item.isAdmin && item.authorData && <>
                      <Avatar
                        source={item.authorData.picture}
                        height={56}
                        width={56}
                        title={item.authorData.firstName}
                        className={cx(c.profileAvatar, c.noBackground)}
                        withLink
                        profileId={item.authorData.profileId}
                      />
                    </>
                  }
                  {
                    item.isAdmin && <>
                      <Avatar
                        source={'../../../../adminAvatar.svg'}
                        height={56}
                        width={56}
                        title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                        className={cx(c.profileAvatar, c.noBackground)}
                        linkClassName={s.profileAvatarLink}
                        staticImage
                      />
                    </>
                  }
                </div>
                <div className={cx(c.textSection, 'viewListingTextSectionRTL')}>
                  <h6 className={cs.commonContentText}>
                    <span className={cs.fontWeightBold}>
                      {
                        !item.isAdmin && item.authorData && <>
                          {item.authorData.firstName}
                        </>
                      }
                      {
                        item.isAdmin && <>{formatMessage(messages.verifiedBy) + ' ' + siteName}</>
                      }
                    </span>
                    <span className={cx(c.dotSection, cs.fontWeightNormal, 'viewlistDotSectionRTL', s.top)}>{date}</span>
                  </h6>
                  <StarRating value={item.rating} starCount={5} name={'review'} />
                  {
                    item.reviewContent && (item.reviewContent.trim()).split("\n").map(function (content, index) {
                      return (
                        <p className={cs.commonContentText} key={index}>
                          {content}
                          <br />
                        </p>
                      )
                    })
                  }
                </div>
              </div>
              <hr className={cs.listingHorizoltalLine} />
            </>
            )
          })
        }
        {
          showLoadMore && <div className={cx(cs.textAlignCenter, cs.spaceBottom4)}>
            <Button disabled={isLoading} className={cx(cs.btnPrimary, cs.btnBig)} onClick={() => this.loadMore()}>
              <FormattedMessage {...messages.showAll} /><span>...</span>
            </Button>
          </div>
        }
      </div>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(Reviews)));