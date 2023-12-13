import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';
import s from './StaticInfoBlock.css';
import l from '../../Skeleton/Skeleton.css';
import cx from 'classnames';
//Components
import HomeKindofTrip from '../HomeKindofTrip/HomeKindofTrip';
// Skeleton Loader
import Shimmer from "../../Skeleton/Shimmer";
import HomeKindofTripSkeleton from "../../Skeleton/HomeKindofTripSkeleton";
// Graphql
import getStaticInfo from './getStaticInfo.graphql';

class StaticInfoBlock extends React.Component {

  static propTypes = {
    getImageBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object
    }),
  };

  static defaultProps = {
    getImageBannerData: {
      loading: true
    },
  }

  render() {
    const { getStaticInfoData: { loading: getStaticInfoLoading, getStaticInfo } } = this.props;
    let staticInfoCollection = {};
    getStaticInfo && getStaticInfo.length > 0 && getStaticInfo.map((item, key) => {
      staticInfoCollection[item.name] = item.value
    });
    return (
      <>
        {
          getStaticInfoLoading ? <div className="hidden-xs">
            <div className={s.container}>
              <div className={cx(l.popularSkeletonTwoTitle, 'bgBlackTwo')}>
                <Shimmer />
              </div>
              <HomeKindofTripSkeleton />
            </div>
          </div> : <div className="hidden-xs">
            <HomeKindofTrip staticInfo={staticInfoCollection} />
          </div>
        }
      </>
    )
  }
}

export default compose(
  injectIntl,
  withStyles(s, l),
  graphql(getStaticInfo, {
    name: 'getStaticInfoData',
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  }),
)(StaticInfoBlock);
