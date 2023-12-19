import React from 'react';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SliderAnimation.css';
import {
    Grid,
    Row,
    Col,
    Image
} from 'react-bootstrap';
import cx from 'classnames';
import cs from '../../commonStyle.css';

// Locale
import carone from './carbanner.jpg';

import arrow from './arrow-down.png';

import LocationSearchForm from '../LocationSearchForm';
import VideoSearchForm from '../VideoSearchForm/VideoSearchForm';


class SliderAnimation extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
    }
    scrollTop() {
        window.scrollTo({
            top: screen.height,
            behavior: 'smooth'
        })
    }
    render() {
        const { data: { loading, getBanner }, layoutType } = this.props;
        const settings = {
            vertical:true,
            dots: false,
            fade: true,
            infinite: true,
            speed: 6000,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            draggable: false,
            touchMove: false,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        // slidesToShow: 3,
                        // slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                        fade: true,
                        pauseOnHover: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        // slidesToShow: 3,
                        // slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                        centerMode: true


                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                        centerMode: true


                    }
                }
            ]
        };

        return (
            <div>
                <div className={cx('homeBannerSlider')}>
                    <div className={cx(s.homePosition, 'homePosition')}>
                        <div className={cx(s.homeCarsoual, 'homeCarsoual')}>
                            <div className={cx(s.carBg,'sliderBg')} style={{ backgroundImage: `url(/images/home/${getBanner && getBanner.image})` }}></div>
                            <div className={s.downArrow}>
                                <div className={'visible-xs'}>
                                    <Image src={arrow} responsive onClick={this.scrollTop} />
                                </div>
                            </div>
                        </div>
                        {
                            layoutType && layoutType == 1 && <div className={s.container}>
                                {
                                    !loading && getBanner && <div className={cx(s.sliderContent, 'sliderContentRTL')}>
                                       
                                        <div className={s.searchbox}>
                                            <LocationSearchForm />
                                        </div>
                                         <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                                            <span className={s.bannerCaptionHighlight}>{getBanner.title}</span>
                                            {' '} {getBanner.content}
                                        </h1>
                                    </div>
                                }
                            </div>
                        }
                        {
                            layoutType && layoutType == 3 && <div className={cx(s.container, s.FormBookWrap)}>
                                {
                                    !loading && getBanner && <div className={cx(s.BookWrap, 'BookWrapRTL')}>
                                    <h1 className={cx(cs.commonTitleText, cs.fontWeightBold)}><span>{getBanner.title}</span>
                                    {' '} {getBanner.content}
                                    </h1>
                                    
                                    <VideoSearchForm />
                                </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className={cx('homeSliderMobile','hidden-sm hidden-xs', 'visible-xs visible-sm', 'hidden-md hidden-lg')}>
                    <div className={s.homePosition}>
                        <div className={s.homeCarsoual}>
                            <Slider {...settings}>
                                <div className={s.bgHeight}>
                                    <div className="sliderBg" style={{ backgroundImage: `url(${carone})` }} />
                                </div>


                            </Slider>
                            <div className={s.downArrow}>
                                <div className={'visible-xs'}>
                                    <Image src={arrow} responsive onClick={this.scrollTop} />
                                </div>
                            </div>
                        </div>
                        {
                            layoutType && layoutType == 1 && <Grid>
                                {
                                    !loading && getBanner && <div className={s.sliderContent}>
                                        <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                                            <span className={s.bannerCaptionHighlight}>{getBanner.title}</span>
                                            {' '} {getBanner.content}
                                        </h1>
                                        <div className={s.searchbox}>
                                            <LocationSearchForm />
                                        </div>
                                    </div>
                                }
                            </Grid>
                        }
                        {
                            layoutType && layoutType == 3 && <div className={cx(s.container, s.height100)}>
                                <div className={s.FormBookWrap}>
                                {
                                    !loading && getBanner && <div className={cx(s.BookWrap, 'BookWrapRTL')}>
                                    <h1><span>{getBanner.title}</span>
                                    {' '} {getBanner.content}
                                    </h1>
                                    
                                    <VideoSearchForm />
                                </div>
                                }
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default withStyles(s)(SliderAnimation);
