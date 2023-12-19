import React, { Component } from "react";
import { flowRight as compose } from 'lodash';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import Shimmer from "./Shimmer";
import s from "../Home/BookYourCar/BookYourCar.css";
import l from './Skeleton.css';
import cs from '../commonStyle.css';

class BookYourCarSkeleton extends Component {
    render() {
        return (
            <div className={cx(s.bookGrid, l.bookCarLeftSkeletonMain)}>
                <div className={l.bookCarLeftSkeleton}>
                    <Shimmer />
                </div>
                <div className={cx(s.paddingLeft, 'paddingLeftBookRTL', l.paddingLeftSkeleton)}>
                    <div className={l.bookCarRightSkeletonOne}>
                        <Shimmer />
                    </div>
                    <div className={l.bookCarRightSkeletonTwo}>
                        <Shimmer />
                    </div>
                    <div className={l.bookCarRightSkeletonTwo}>
                        <Shimmer />
                    </div>
                    <div className={l.bookCarRightSkeletonTwo}>
                        <Shimmer />
                    </div>
                    <div className={l.bookCarRightSkeletonThree}>
                        <Shimmer />
                    </div>
                </div>
            </div>

        );
    }
}

export default compose(
    withStyles(s, l, cs),
)(BookYourCarSkeleton);

