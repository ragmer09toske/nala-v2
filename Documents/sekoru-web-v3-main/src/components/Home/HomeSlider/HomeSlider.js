import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HomeSlider.css';
import cs from '../../../components/commonStyle.css';
import {
  Row,
  Col,
} from 'react-bootstrap';

import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import CurrencyConverter from '../../CurrencyConverter';

// Helpers
import { formatURL } from '../../../helpers/formatURL';
import { isRTL } from '../../../helpers/formatLocale';
import { COMMON_TEXT_COLOR } from '../../../constants/index'
// Locale
import messages from '../../../locale/messages';
import WishListIcon from '../../WishListIcon';
import Loader from '../../Loader/Loader';
import * as FontAwesome from 'react-icons/lib/fa';

//Images
import startIcon from '/public/SiteIcons/star.svg';
import arrowIcon from '/public/SiteIcons/rentNowArrow.svg';
import steeringIcon from '/public/SiteIcons/steeringIcon.svg';
import prevArrow from '/public/SiteIcons/sliderPrevArrow.svg';
import nextArrow from '/public/SiteIcons/sliderNextArrow.svg';

const nextArrowStyle = {
  right: '-14px',
  top: '40%',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: '2'
};

const prevArrowStyle = {
  left: '-14px',
  top: '40%',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: '2'
};

const nextArrowMobileStyle = {
  display: 'none', right: '10px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

const prevArrowMobileStyle = {
  display: 'none', left: '10px',
  background: '#fff', color: COMMON_TEXT_COLOR, zIndex: '5', width: '36px', height: '36px', top: '40%',
  fontSize: '40px', cursor: 'pointer', borderRadius: '50%', textAlign: 'center',
  border: '2px solid transparent', boxShadow: '0px 0px 4px 0px #484848'
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={nextArrowStyle}
    >
      <img src={nextArrow} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={prevArrowStyle}
    >
      <img src={prevArrow} />
    </div>
  );
}

class SlideComponent extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      coverPhoto: PropTypes.number,
      listingData: PropTypes.shape({
        basePrice: PropTypes.number,
        currency: PropTypes.string,
      }),
      settingsData: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
        }),
      })),
      id: PropTypes.number,
      beds: PropTypes.number,
      title: PropTypes.string,
      bookingType: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number
    }))
  };

  static defaultProps = {
    data: []
  }





  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.state = {
      isClient: false
    };
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isBeginning: true,
      isEnd: false,
      load: false,
      showArrow: false
    }
  }


  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('touchend', this.progress);
      window.removeEventListener('mouseover', this.progress);
    }
  }


  componentDidMount() {
    const { data, fromPage } = this.props;
    const isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : true;
    let showArrow = false;
    if (smallDevice) {
      showArrow = data && data.length > 1 ? true : false
    } else {
      if (fromPage) {
        showArrow = data && data.length > 2 ? true : false
      } else {
        showArrow = data && data.length > 4 ? true : false
      }
    }
    this.setState({
      isClient: true,
      load: true,
      showArrow
    });

    if (isBrowser) {
      this.progress();
      window.addEventListener('touchend', this.progress);
      window.addEventListener('mouseover', this.progress);
    }
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        })
        this.progress()
      }, 1);
    }
  }

  goNext() {
    this.swiper.slideNext();
    this.progress();
  }

  goPrev() {
    this.swiper.slidePrev();
    this.progress();
  }

  progress() {
    this.swiper && this.setState({ isEnd: this.swiper.isEnd, isBeginning: this.swiper.isBeginning });
  }

  render() {
    const { data, intl: { locale }, arrow, similarClassName, similiarListPadding, fromPage, isEditWishList } = this.props;
    const { load, isBeginning, isEnd, showArrow } = this.state;
    const { formatMessage } = this.props.intl;

    const params = {
      slidesPerView: fromPage == 'viewProfile' ? 2 : (fromPage == 'whistList' ? 3 : 4),
      spaceBetween: 25,
      breakpoints: {
        1200: {
          slidesPerView: fromPage == 'viewProfile' ? 2 : 3,
        },
        991: {
          slidesPerView: '3',
        },
        768: {
          slidesPerView: '3',
        },
        767: {
          slidesPerView: '2',
        },
        640: {
          slidesPerView: '1',
        }
      }
    }

    return (

      <Row className={'homeSlickSlider'}>
        <Col xs={12} sm={12} md={12} lg={12} className={similarClassName}>
          {
            !load && <div>
              <Loader type="text" />
            </div>
          }
          {
            load && <Swiper {...params} rtl={isRTL(locale)} ref={node => this.swiper = node !== null ? node.swiper : null} className={cx('row', s.noMargin)}>
              {
                data && data.length > 0 && data.map((item, index) => {
                  let carType = item.settingsData && item.settingsData[0] && item.settingsData[0].listsettings && item.settingsData[0].listsettings.itemName, transmissionLabel;
                  let transmission = item.transmission;
                  let isListOwner = item.isListOwner
                  transmission == '1' ? transmissionLabel = 'Automatic' : transmissionLabel = 'Manual';
                  let starRatingValue = 0;
                  if (item.reviewsCount > 0 && item.reviewsStarRating > 0) {
                    starRatingValue = Math.round(item.reviewsStarRating / item.reviewsCount)
                  }
                  if (item.listPhotos.length > 0) {
                    return (
                      <div className={cx(s.background, s.positionRelative, similiarListPadding)}>
                        {
                          !isListOwner && <WishListIcon listId={item.id} key={item.id} isChecked={item.wishListStatus} isEditWishList={isEditWishList} />
                        }
                        <a href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'} className={cs.textDecorationNone}>
                          <div className={s.boxShadow}>
                            <ListCoverPhoto
                              className={s.HRCar}
                              listPhotos={item.listPhotos}
                              coverPhoto={item.coverPhoto}
                              photoType={"x_medium"}
                              bgImage
                            />
                            <div className={s.PerDayWrap}>

                            </div>
                            <div className={s.sliderbackground}>
                              <div className={cx(s.HRDetails, 'HRDetailsRTL')}>
                                <div className={cx(s.trip, s.hiddentextSlider, 'hiddentextSliderRTL')}>
                                  <img src={steeringIcon} className={cx(s.carType, 'carTypeIconRTL')} />
                                  <span className='carTypeRTL'>{carType}</span>
                                  <span className={s.dotCss}></span>
                                  <span className={s.textFlow}>{transmissionLabel}</span>
                                </div>
                              </div>
                              <div className={cx(s.PerDay)}>
                                {
                                  item.bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                                }
                                <CurrencyConverter
                                  amount={item.listingData.basePrice}
                                  from={item.listingData.currency}
                                />
                                <span className={cx(s.perNightCss, 'PerDayRTL')}>{' '}{formatMessage(messages.perNight)}</span>
                              </div>
                              <h3 className={s.titleCss}>{item.title}</h3>
                              <div className={s.HRRight}>
                                {starRatingValue > 0 && <div className={cx(s.reviewCss, 'reviewCssSliderRTL')}>
                                  <img src={startIcon} className={cx(s.reviewCssImg, 'reviewCssImgRTL')} /><span>{starRatingValue}</span>
                                </div>}
                                <a className={cx(s.btn, cs.textDecorationNone)} href={"/cars/" + formatURL(item.title) + '-' + item.id} target={'_blank'}>
                                  <span className={cs.vtrMiddle}><FormattedMessage {...messages.rentNowText} /></span>
                                  <img src={arrowIcon} className={cx(s.arrowIconCss, 'sliderArrowRTL')} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  }
                })
              }
            </Swiper>
          }
          <div className={'homeSwiperArrow'}>
            {load && showArrow && !isBeginning && <SamplePrevArrow className={cx('prevRTL')} onClick={this.goPrev} />}
            {load && showArrow && !isEnd && <SampleNextArrow className={cx('nextRTL')} onClick={this.goNext} />}
          </div>
        </Col>
      </Row>
    );
  }
};

export default injectIntl(withStyles(s, cs)(SlideComponent));