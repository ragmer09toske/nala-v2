import React, { Component } from "react";
import { flowRight as compose } from 'lodash';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Col, Row, Grid } from "react-bootstrap";
import Shimmer from "./Shimmer";
import s from "../Home/HomeKindofTrip/HomeKindofTrip.css";
import l from './Skeleton.css';

class HomePopularSkeleton extends Component {
  render() {
    return (
          <div className={cx(s.container, 'homeKindTripBorderRadius')}>
            <Grid fluid className={s.containerPadding}>
                <div className={s.homeFind}>
                    <div className={s.containerTitle}>
                        <div className={s.homeFindHeader}></div>
                        <div className={s.homePara}></div>
                    </div>
                    <div className={s.homeFindMain}>
                        <Row className={cx(s.SectionPadding)}>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <div className={s.homeFindLeft}>
                                    <div className={cx(s.homeFindBg, l.skeletonBoxBg, l.homeFindBgMain)}>
                                    <Shimmer />
                                    <div className={cx(l.homeKindPositionSkeleton, 'homeKindPositionSkeletonRTL')}>
                                        <div className={cx(l.homeKindOneSkeleton, 'bgBlackTwo')}>
                                        <Shimmer />
                                        </div>
                                        <div className={cx(l.homeKindOneSkeleton, 'homeKindOneSkeletonWidthRTL', 'bgBlackTwo')} style={{width: '400px'}}>
                                        <Shimmer />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className={cx(s.paddingTopMobile)}>
                                <div className={s.homeFindLeft}>
                                    <div className={cx(s.homeFindBg, l.skeletonBoxBg, l.homeFindBgMain)}>
                                    <Shimmer />
                                    <div className={cx(l.homeKindPositionSkeleton, 'homeKindPositionSkeletonRTL')}>
                                        <div className={cx(l.homeKindOneSkeleton, 'bgBlackTwo')}>
                                        <Shimmer />
                                        </div>
                                        <div className={cx(l.homeKindOneSkeleton, 'homeKindOneSkeletonWidthRTL')} style={{width: '400px'}}>
                                        <Shimmer />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Grid>
      </div>

    );
  }
}

export default compose(
    withStyles(s, l),
  )(HomePopularSkeleton);
  
