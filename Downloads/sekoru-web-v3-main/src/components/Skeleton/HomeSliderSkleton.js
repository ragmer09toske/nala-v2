import React, { Component } from "react";
import { flowRight as compose } from 'lodash';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import ContentLoader from "react-content-loader";
import cx from 'classnames';

import s from "../Home/HomeItem/HomeItem.css";
import l from "./Skeleton.css";
import Shimmer from "./Shimmer";

class HomeSliderSkleton extends Component {

  render() {

    let skeletonRelative = 'skeletonRelative';

    return (
      <div className={cx('swiperSliderMobielWidth', l.SkletonSliderPadding)}>
        <div className={cx(s.imgContainer, 'bgBlackTwo')}>
          <div className={cx(s.parent, l.parentBgColor, 'bgBlackTwo')}>
            <div className={cx(s.children)}>
              <div className={cx(s.content, s.sliderBgSkleton)}>
                <Shimmer />
              </div>
            </div>
            <div className={cx(l.skeletonTopBox, 'bgBlackTwo', 'skeletonTopBoxRTL')}>
              <Shimmer />
            </div>
            <div className={cx(l.absoulte, 'absoulteSkeletonRTL')}>
              <div className={cx(l.skeletonContent, 'bgBlackTwo')}>
              </div>
              <div className={cx(l.skeletonContent, 'bgBlackTwo')}>
              </div>
              <div className={cx(l.skeletonContent, 'bgBlackTwo')} style={{ width: '55%' }}>
              </div>
              <div className={cx(l.skeletonContentButton, 'bgBlackTwo')}>
                <Shimmer />
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default compose(
  withStyles(s, l),
)(HomeSliderSkleton);

