import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import s from './MapListingPhotos.css';
import cx from 'classnames';
import Swiper from 'react-id-swiper';
import { COMMON_TEXT_COLOR } from '../../../constants/index';
import { isRTL } from '../../../helpers/formatLocale';

const nextArrowStyle = {
  right: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};

const prevArrowStyle = {
  left: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', right: '10px' }}>
        <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
        style={{ height: '13px', width: '13px', display: 'block', fill: '#484848', position: 'absolute', top: '31%', left: '10px' }}>
        <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
      </svg>
    </div>
  );
}
class MapListingPhotos extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_'
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ loaded: true }) }, 1000)
  }

  goNext() {
    this.swiper.slideNext();
  }

  goPrev() {
    this.swiper.slidePrev();
  }

  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title, intl: { locale }, personalizeURL } = this.props;
    const { loaded } = this.state;
    let imagepath = '/images/upload/' + size;
    let pagination;
    if (listPhotos && listPhotos.length > 1) {
      pagination = {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      }
    } else {
      pagination = {}
    }

    const params = {
      loop: true,
      pagination,
    }
    return (
      <div className={s.listPhotoContainer}>

        {
          !loaded && <div className={s.listPhotoContainer}>
            <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)}>
              <div className={s.parent}>
                <div className={cx(s.children)}>
                  <div className={s.content}>
                    <div class={cx(s.imageContent, "swiper-lazy")}>
                      <div class="swiper-lazy-preloader" />
                    </div>
                    <div className="swiper-lazy-loaded swiper-lazy-preloader-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {
          loaded && listPhotos != null && listPhotos.length && <div>
            <Swiper {...params} ref={node => this.swiper = node !== null ? node.swiper : null} rtl={isRTL(locale)}>
              {
                listPhotos.map((item, itemIndex) => {
                  return (
                    <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                      <a href={"/cars/" + formatURL(title) + '-' + id + personalizeURL} target={"_blank"}>
                        <div className={s.parent}>
                          <div className={cx(s.children)}>
                            <div className={s.content}>
                              <div className={cx(s.imageContent)}
                                style={{ backgroundImage: 'url(' + imagepath + item.name + ')' }}></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })
              }
            </Swiper>
          </div>
        }

        {loaded && listPhotos && listPhotos.length > 1 && <div className={'searchArrow'}>
          <SamplePrevArrow className={cx('searchArrowPrev')} onClick={this.goPrev} />
          <SampleNextArrow className={cx('searchArrowNext')} onClick={this.goNext} />
        </div>
        }
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(MapListingPhotos));
