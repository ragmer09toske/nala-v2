import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import s from './MostViewedListing.css';
import l from '../../Skeleton/Skeleton.css'
//Components
import SeeAll from '../SeeAll/SeeAll';
import HomeSlider from '../HomeSlider/HomeSlider';
// Skeleton Loader
import Shimmer from "../../Skeleton/Shimmer";
import HomeSliderSkleton from "../../Skeleton/HomeSliderSkleton";
// Graphql
import getMostViewedListingQuery from './getMostViewedListing.graphql';
// Locale
import messages from '../../../locale/messages';

class MostViewedListing extends React.Component {

  static propTypes = {
    getMostViewedListingData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array
    }),
  };

  static defaultProps = {
    getMostViewedListingData: {
      loading: true
    },
  }

  render() {
    const { getMostViewedListingData, sekeletonArray } = this.props;
    return (
      <>
        {getMostViewedListingData && getMostViewedListingData.loading ? (<div className={s.pageContainer}>
          <div className={cx(s.container, 'containerLoaderRTL')}>
            <div className={cx(l.popularSkeletonTitle, 'bgBlackTwo')}>
              <Shimmer />
            </div>
            <div className={s.displayGrid}>
              {sekeletonArray.map((n) => (
                <HomeSliderSkleton key={n} />
              ))}
            </div>
          </div>
        </div>

        ) : (
          <div className={s.container}>
            <div className={s.pageContainer}>
              <h3 className={s.containerTitle}>
                <FormattedMessage {...messages.mostViewed} />
              </h3>
              <HomeSlider data={getMostViewedListingData.GetMostViewedListing} />
              <SeeAll />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default compose(
  injectIntl,
  withStyles(s, l),
  graphql(getMostViewedListingQuery, {
    name: 'getMostViewedListingData',
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  }),
)(MostViewedListing);
