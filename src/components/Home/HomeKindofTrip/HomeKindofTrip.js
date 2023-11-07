import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeKindofTrip.css'
import cs from '../../commonStyle.css';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import Loader from '../../Loader';


class HomeKindofTrip extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        loading: PropTypes.bool,
    };

    render() {
        const { loading, staticInfo } = this.props;
        if (loading) {
            return <Loader type={"text"} />
        } else {
            return (
                <div className={s.container}>

                    <div className={s.homeFind}>
                        <div className={cx(cs.commonTitleText, cs.paddingBottom6, cs.textAlignCenter, cs.fontWeightBold)}>
                            {staticInfo && staticInfo.carTripTitle1}
                        </div>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <div className={s.bgSection}>
                                    <div className={s.homeFindBg} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carTripImage1})` }} />
                                    <div className={s.bgInnerSection}>
                                        <div className={s.bgCss}>
                                            <div className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3, s.borderBottom, 'borderBottomKindRTL')}>
                                                {staticInfo && staticInfo.carTripTitle2}
                                            </div>
                                            <div className={s.homeParaInner}>
                                                {staticInfo && staticInfo.carTripContent2}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className={cx(s.paddingTopMobile)}>
                                <div className={s.bgSection}>
                                    <div className={s.homeFindBg} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carTripImage2})` }} />
                                    <div className={s.bgInnerSection}>
                                        <div className={s.bgCss}>
                                            <div className={cx(cs.commonSubTitleText, cs.fontWeightBold, cs.paddingBottom3, s.borderBottom, 'borderBottomKindRTL')}>
                                                {staticInfo && staticInfo.carTripTitle3}
                                            </div>
                                            <div className={s.homeParaInner}>
                                                {staticInfo && staticInfo.carTripContent3}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(s, cs)(HomeKindofTrip);