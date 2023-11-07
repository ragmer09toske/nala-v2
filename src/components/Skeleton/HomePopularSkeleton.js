import React, { Component } from "react";
import { flowRight as compose } from 'lodash';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import Shimmer from "./Shimmer";
import s from "../Home/PopularLocationGridItem/PopularLocationGridItem.css";
import l from './Skeleton.css'

class HomePopularSkeleton extends Component {
  render() {
    return (
      <div className={cx(s.GridCollapse, 'GridCollapseAr')}>
        <div className={s.noPadding}>
          <div className={cx(l.parentBgColor, s.GridWrap, 'bgBlackTwo')}>
            <Shimmer />
            <div className={cx(l.popularSkeletonCircle, 'bgBlackTwo')}>
              <Shimmer />
            </div>
            <div className={cx(l.popularSkeletonContent, 'bgBlackTwo')}>
              <Shimmer />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default compose(
  withStyles(s, l),
)(HomePopularSkeleton);