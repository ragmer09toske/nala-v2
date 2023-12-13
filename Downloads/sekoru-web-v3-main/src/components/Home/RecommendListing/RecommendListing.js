import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import s from './RecommendListing.css';
import l from '../../Skeleton/Skeleton.css'
//Components
import SeeAll from '../SeeAll';
import HomeSlider from '../HomeSlider';
// Skeleton Loader
import Shimmer from "../../Skeleton/Shimmer";
import HomeSliderSkleton from "../../Skeleton/HomeSliderSkleton";
// Graphql
import getRecommendQuery from './getRecommend.graphql';
// Locale
import messages from '../../../locale/messages';

class RecommendListing extends React.Component {

  static propTypes = {
    getRecommendData: PropTypes.shape({
      loading: PropTypes.bool,
      getRecommendData: PropTypes.array
    })
  };

  static defaultProps = {
    getRecommendData: {
      loading: true
    }
  }

  render() {
    const { getRecommendData, sekeletonArray } = this.props;
    return (
      <>
        {getRecommendData && getRecommendData.loading ? (<div className={s.pageContainer}>
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
          <>
            {
              getRecommendData && getRecommendData.getRecommend && getRecommendData.getRecommend.length > 0 &&
              <div className={s.recommandBg}>
                <div className={s.container}><div >
                  <h3 className={s.containerTitle}>
                    <FormattedMessage {...messages.recommended} />
                  </h3>
                  <HomeSlider data={getRecommendData.getRecommend} />
                  <SeeAll />
                </div>
                </div>
              </div>
            }
          </>
        )}
      </>
    )
  }
}

export default compose(
  injectIntl,
  withStyles(s, l),
  graphql(getRecommendQuery, {
    name: 'getRecommendData',
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  })
)(RecommendListing);
