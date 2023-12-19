// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewListing.css';
import cs from '../../components/commonStyle.css';
import {
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Components
import Photos from '../../components/ViewListing/Photos';
import ListingIntro from '../../components/ViewListing/ListingIntro';
import Calendar from '../../components/ViewListing/Calendar';
import ListingDetails from '../../components/ViewListing/ListingDetails';
import Reviews from '../../components/ViewListing/Reviews';
import HostDetail from '../../components/ViewListing/HostDetail';
import LocationMap from '../../components/ViewListing/LocationMap';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import Sticky from '../../components/ViewListing/Sticky';
import HomeSlider from '../../components/Home/HomeSlider';
import AvailabilityCalendar from '../../components/ViewListing/AvailabilityCalendar';
import StarRating from '../../components/StarRating';
import CurrencyConverter from '../../components/CurrencyConverter';
import BookingModal from '../../components/ViewListing/BookingModal';
import SimilarListings from '../../components/ViewListing/SimilarListings';
import ListTitle from '../../components/ViewListing/ListTitle/ListTitle';

// Graphql
import BlockedDatesQuery from './BlockedDates.graphql';
import ListingDataQuery from './getListingData.graphql';
import MoreReviewsQuery from './MoreReviews.graphql';
import SimilarListsQuery from './getSimilarListing.graphql';
import AutoAffix from 'react-overlays/lib/AutoAffix';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

// Locale
import messages from '../../locale/messages';

import { openBookingModal } from '../../actions/BookingModal/modalActions';

//Images
import starImage from '/public/SiteIcons/star.svg';

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;
var durationFn = function (deltaTop) {
  return deltaTop;
};
class ViewListing extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    preview: PropTypes.bool,
    isAdmin: PropTypes.bool,
    account: PropTypes.shape({
      userId: PropTypes.string,
      userBanStatus: PropTypes.number,
    }),
    ListingBlockedDates: PropTypes.shape({
      loading: PropTypes.bool,
      UserListing: PropTypes.shape({
        blockedDates: PropTypes.array
      })
    }),
    getListingData: PropTypes.shape({
      loading: PropTypes.bool,
      UserListing: PropTypes.object
    }),
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    similarListsData: PropTypes.shape({
      loading: PropTypes.bool,
      getSimilarListing: PropTypes.array
    }),
    openBookingModal: PropTypes.func,
  };
  static defaultProps = {
    getListingData: {
      loading: false,
      UserListing: {
        userId: null
      }
    },
    ListingBlockedDates: {
      loading: true,
      UserListing: {
        blockedDates: []
      }
    },
    account: {
      userId: null,
      userBanStatus: 0,
    },
    isAdmin: false
  }
  render() {
    const { listId, title, getListingData: { loading, UserListing }, preview } = this.props;
    const { ListingBlockedDates } = this.props;
    const { listReviewsData } = this.props;
    const { openBookingModal, baseCurrency } = this.props;
    const { account: { userId, userBanStatus }, isAdmin, URLRoomType } = this.props;
    const { lat, lng, startDate, endDate, similarListsData, similarListsData: { getSimilarListing } } = this.props;
    const { startTime, endTime } = this.props;

    const isBrowser = typeof window !== 'undefined';
    const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;

    let basePriceValue = UserListing && UserListing.listingData && UserListing.listingData.basePrice ? UserListing.listingData.basePrice : 0;
    let currencyValue = UserListing && UserListing.listingData && UserListing.listingData.currency ? UserListing.listingData.currency : "USD";
    let reviewsCount, reviewsStarRating;
    if (loading && !UserListing) {
      return <Loader type="text" />
    }
    let isHost = false;
    if (UserListing) {
      if (userId && userId === UserListing.userId) {
        isHost = true;
      } else if (isAdmin) {
        isHost = true;
      }
      reviewsCount = UserListing.reviewsCount;
      reviewsStarRating = UserListing.reviewsStarRating;
    }
    if (preview && !isHost) {
      return <NotFound title={title} />
    }
    if (!loading && !UserListing) {
      return <NotFound title={title} />
    }

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    return (
      <>
        {
          UserListing && <div className={s.container}>
            <ListTitle
              data={UserListing}
              loading={loading}
              starRatingValue={starRatingValue}
            />
            <Photos data={UserListing} loading={loading} />
            <Element name="test" className="element">
              <Grid fluid className={s.listingMarginTop}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={8} >
                    <div className={s.stickyContainer}>
                      <AutoAffix viewportOffsetTop={0} container={this} affixClassName={cx(s.showAffix, s.stickyContainer)}>
                        <div className={s.zPanel}>
                          <div className={s.container}>
                            <ul className={cx(s.topmenu)}>
                              <li className={s.listDot}>
                                <Link className={cx(cs.fontWeightBold, cs.commonContentText, cs.textDecorationNone)} activeClass={s.active} to="test1" spy={true} smooth={true} offset={-50} duration={800} onSetActive={this.handleSetActive}>
                                  <FormattedMessage {...messages.overview} />
                                </Link>
                              </li>
                              <li className={s.listDot}>
                                <Link className={cx(cs.fontWeightBold, cs.commonContentText, cs.textDecorationNone)} activeClass={s.active} to="test2" spy={true} smooth={true} offset={-80} duration={800} onSetActive={this.handleSetActive}>
                                  <FormattedMessage {...messages.reviews} />
                                </Link>
                              </li>
                              <li className={s.listDot}>
                                <Link className={cx(cs.fontWeightBold, cs.commonContentText, cs.textDecorationNone)} activeClass={s.active} to="test3" spy={true} smooth={true} offset={-70} duration={800} onSetActive={this.handleSetActive}>
                                  <FormattedMessage {...messages.location} />
                                </Link>
                              </li>
                              <li className={s.listDot}>
                                <Link className={cx(cs.fontWeightBold, cs.commonContentText, cs.textDecorationNone)} activeClass={s.active} to="test4" spy={true} smooth={true} offset={-70} duration={800} onSetActive={this.handleSetActive}>
                                  <FormattedMessage {...messages.theHost} />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AutoAffix>
                    </div>
                    <Element name="test1" className="element">
                      <div className={cs.padding4}>
                        <ListingIntro
                          data={UserListing}
                          isHost={isHost}
                        />
                      </div>
                      <hr className={cx(cs.listingHorizoltalLine, s.listingIntroMarginTop)} />
                      <div>
                        <ListingDetails
                          data={UserListing}
                          isHost={isHost}
                          userBanStatus={userBanStatus}
                        />
                      </div>
                    </Element>
                    <Element name="test2" className="element">
                      <Reviews
                        reviewsCount={UserListing.reviewsCount}
                        reviewsStarRating={UserListing.reviewsStarRating}
                        data={listReviewsData}
                        listId={listId}
                      />
                    </Element>
                    <Element name="test3" className="element">
                      <LocationMap data={UserListing} />
                    </Element>
                    <Element name="test4" className="element">
                      <HostDetail
                        id={UserListing.id}
                        userId={UserListing.userId}
                        hostEmail={UserListing.user.email}
                        personCapacity={UserListing.personCapacity}
                        city={UserListing.city}
                        listingData={UserListing.listingData || undefined}
                        profile={UserListing.user.profile || undefined}
                        blockedDates={
                          ListingBlockedDates.UserListing != null ?
                            ListingBlockedDates.UserListing.blockedDates : undefined
                        }
                        isHost={isHost}
                        userBanStatus={userBanStatus}
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </Element>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} className={cx(s.hideCalendar, s.positionSticky, 'hidden-xs hidden-sm')}>
                    <Calendar
                      id={UserListing.id}
                      loading={ListingBlockedDates.loading}
                      blockedDates={
                        ListingBlockedDates.UserListing != null ?
                          ListingBlockedDates.UserListing.blockedDates : undefined
                      }
                      personCapacity={UserListing.personCapacity}
                      listingData={UserListing.listingData || undefined}
                      isHost={isHost}
                      bookingType={UserListing.bookingType}
                      userBanStatus={userBanStatus}
                      startDate={startDate}
                      endDate={endDate}
                      reviewsCount={UserListing.reviewsCount}
                      reviewsStarRating={UserListing.reviewsStarRating}
                      data={UserListing}
                      URLRoomType={URLRoomType}
                      startTime={startTime}
                      endTime={endTime}
                    />
                  </Col>
                </Row>
              </Grid>
            </Element>
            <Element className="element">
              {
                similarListsData && similarListsData.getSimilarListing && similarListsData.getSimilarListing.length > 0 &&
                <Grid fluid className={cx(s.sliderMargin, cs.space2, s.similarPadding, s.overFlowHidden)}>
                  <h4 className={cx(cs.commonTitleText, cs.fontWeightBold, cs.paddingBottom2, s.similiarTitle)}><FormattedMessage {...messages.similarListings} /></h4>
                  <SimilarListings data={similarListsData.getSimilarListing} />
                </Grid>
              }
            </Element>
          </div>
        }
        <div className={cx(s.stickyBookButton)}>
          <div className={cx(s.filtersFooter)}>
            <div className={s.filtersContainer}>
              <div>
                <div className={s.displayFlex}>
                  <span className={s.displayFlex}>
                    {
                      UserListing && UserListing.bookingType === "instant" && <span>
                        <FontAwesome.FaBolt className={s.instantIcon} />
                      </span>
                    }
                    <CurrencyConverter
                      from={currencyValue || baseCurrency}
                      amount={basePriceValue || 0}
                      className={cx(s.bookItPrice, cs.commonTotalText)}
                    />
                  </span>
                  <span className={cs.commonSubTitleText}>{' '}<FormattedMessage {...messages.perNight} /></span>
                </div>
                <h5 className={cx(cs.commonContentText, cs.fontWeightNormal, cs.paddingBottom1, s.displayFlex)}>
                  {starRatingValue > 0 && <span className={s.displayFlex}>
                    <img src={starImage} className={cx(s.starImageMargin, 'viewlistStarImage')} />
                    <span>{starRatingValue}</span>
                  </span>}{' '}
                  {reviewsCount > 0 && <span className={cx(s.dotSection, 'viewlistDotSectionRTL', s.top)}>{reviewsCount}{' '}{reviewsCount > 1 ? <FormattedMessage {...messages.reviews} /> : <FormattedMessage {...messages.review} />}</span>}
                </h5>
              </div>
              <div>
                <BookingModal
                  id={UserListing && UserListing.id}
                  loading={ListingBlockedDates.loading}
                  blockedDates={
                    ListingBlockedDates.UserListing != null ?
                      ListingBlockedDates.UserListing.blockedDates : undefined
                  }
                  personCapacity={UserListing && UserListing.personCapacity}
                  listingData={UserListing && UserListing.listingData || undefined}
                  isHost={isHost}
                  bookingType={UserListing && UserListing.bookingType}
                  reviewsCount={UserListing && UserListing.reviewsCount}
                  reviewsStarRating={UserListing && UserListing.reviewsStarRating}
                  cancellationPolicyData={UserListing?.listingData?.cancellation}
                />
                <Button
                  className={cx(cs.btnPrimary, cs.fullWidth)}
                  onClick={openBookingModal}
                >
                  <FormattedMessage {...messages.bookNow} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapState = (state) => ({
  account: state.account.data,
  isAdmin: state.runtime.isAdminAuthenticated
});
const mapDispatch = {
  openBookingModal
};
export default compose(
  injectIntl,
  withStyles(s, cs),
  connect(mapState, mapDispatch),
  graphql(ListingDataQuery,
    {
      name: 'getListingData',
      options: (props) => ({
        variables: {
          listId: props.listId,
          preview: props.preview,
        },
        fetchPolicy: 'network-only',
        ssr: true
      })
    }
  ),
  graphql(BlockedDatesQuery,
    {
      name: 'ListingBlockedDates',
      options: (props) => ({
        variables: {
          listId: props.listId,
          preview: props.preview,
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  ),
  graphql(MoreReviewsQuery,
    {
      name: 'listReviewsData',
      options: (props) => ({
        variables: {
          listId: props.listId,
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  ),
  graphql(SimilarListsQuery,
    {
      name: 'similarListsData',
      options: (props) => ({
        variables: {
          listId: props.listId,
          lat: props.lat,
          lng: props.lng
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  )
)(ViewListing);