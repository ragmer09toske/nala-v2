import React from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './Skeleton.css';
import cx from 'classnames';

const Shimmer = ({skeletonRelative}) => {
    return (
        <div className={cx(s.shimmerWrapper, skeletonRelative, 'kindTripBorder', 'newsBoxBorder', 'newsBoxDarkAfter')}>
            <div className={s.shimmer}></div>
        </div>
    )
}

export default compose(
    withStyles(s),
  )(Shimmer);