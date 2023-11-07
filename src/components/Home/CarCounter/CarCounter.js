import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CarCounter.css';
import {
    Button,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import messages from '../../../locale/messages';
import SkipBg from './t_bg.jpg';
import SkipCar from './w1.png';

import { openSignupModal } from '../../../actions/modalActions';

class CarCounter extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        openSignupModal: PropTypes.func,
    };

    render() {
        const { title, openSignupModal, account, staticInfo } = this.props;

        let isUserLoggedIn = account ? true : false;
        return (
            <div className={s.bannerTextSection}>
                <div>
                    <div className={s.container}>
                        <Row className={s.margin0}>
                            <h1>{staticInfo && staticInfo.carCounterTitle3}</h1>
                            <Col sm={12} lg={12} md={12} xs={12}>
                                <div className={s.displayGrid}>
                                    <div className={cx(s.firstBannerMargin, 'firstBannerMarginRTL')}>
                                        <div className={cx(s.bannerSection, s.bannerSection1, s.firstBanner)}>
                                            <div className={s.SkipCounter} />
                                            <div className={cx(s.SkipParaWrap, s.bannerPosition)}>
                                                <div className={s.SkipPara}>
                                                    <h2 className={s.firstLayerText}>{staticInfo && staticInfo.carCounterTitle1}</h2>
                                                    <p className={s.firstLayerSubText}>{staticInfo && staticInfo.carCounterContent1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx(s.bannerSection, s.bannerSection2, s.secondBanner, 'secondBannerRTL')}>
                                        <div className={s.SCarImg} style={{ backgroundImage: `url(/images/home/${staticInfo && staticInfo.carCounterImage1})` }}></div>
                                        <div className={cx(s.SkipParaWrap, s.bannerPosition)}>
                                            <div className={s.SkipPara}>
                                                <h2>{staticInfo && staticInfo.carCounterTitle2}</h2>
                                                <p>{staticInfo && staticInfo.carCounterContent2}</p>
                                            </div>
                                            {
                                                !isUserLoggedIn && <div className={s.BookCar}>
                                                    <Button className={s.btn} onClick={openSignupModal}> <FormattedMessage {...messages.signup} /> </Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

}

const mapState = (state) => ({
    account: state.account.data,
});

const mapDispatch = {
    openSignupModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CarCounter)));
