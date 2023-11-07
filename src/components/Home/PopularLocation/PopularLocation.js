import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import s from './PopularLocation.css';
import l from '../../Skeleton/Skeleton.css'
//Components
import PopularLocationSlider from '../PopularLocationSlider';
// Skeleton Loader
import Shimmer from "../../Skeleton/Shimmer";
import HomePopularSkeleton from "../../Skeleton/HomePopularSkeleton";
// Graphql
import getPopularLocationQuery from './getPopularLocation.graphql';
// Locale
import messages from '../../../locale/messages';

class PopularLocation extends React.Component {

  static propTypes = {
    getPopularLocationData: PropTypes.shape({
      loading: PropTypes.bool,
      getPopularLocationAdmin: PropTypes.array
    }),
  };

  static defaultProps = {
    getPopularLocationData: {
      loading: true
    }
  }

  render() {
    const { getPopularLocationData, sekeletonArray } = this.props;
    return (
      <>
        {getPopularLocationData && getPopularLocationData.loading ? (<div className={cx('bgBlackTwo')}>
          <div className={s.container}>
            <div className={cx(l.popularSkeletonTwoTitle, 'bgBlackTwo')}>
              <Shimmer />
            </div>
            <div className={s.displayGridTwo}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <HomePopularSkeleton key={n} />
              ))}
            </div>
          </div>
        </div>
        ) : (
          getPopularLocationData && getPopularLocationData.getPopularLocationAdmin && getPopularLocationData.getPopularLocationAdmin.length > 0 &&
          <div className={s.topBottomCss}>
            <div className={s.container}>
              <h3 className={cx(s.containerTitle)}>
                <FormattedMessage {...messages.popularLocation} />
              </h3>
              <PopularLocationSlider data={getPopularLocationData.getPopularLocationAdmin} />
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
  graphql(getPopularLocationQuery, {
    name: 'getPopularLocationData',
    options: {
      ssr: false
    }
  }),
)(PopularLocation);
