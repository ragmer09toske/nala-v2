import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
import Swiper from 'react-id-swiper';
// Helpers
import { isRTL } from '../../../helpers/formatLocale';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

const nextArrowStyle = {
  right: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '43%',
  fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
  borderRadius: '50%', position: 'absolute'
};

const prevArrowStyle = {
  left: '5px',
  color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '43%',
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


class ListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
    arrow: true
  };
  
  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.state = {
      load: false
    }
  }

  componentDidMount() {
    this.setState({
      load: true
    });
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
      }, 1);
    }
  }

  goNext() {
    this.swiper.slideNext();
  }

  goPrev() {
    this.swiper.slidePrev();
  }


  render() {
    const { id, listPhotos, coverPhoto, size, formatURL, title, arrow, intl: { locale }, personalizeURL } = this.props;
    const imagepath = `/images/upload/${size}`;
    const { load } = this.state;
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
      <div className={cx(s.listPhotoContainer, 'searchSwiper')}>
        {
          !load && <div className={s.parent}>
            <div className={cx(s.children)}>
              <div className={s.content}>
                <div class={cx(s.imageContent, "swiper-lazy")}>
                  <div class="swiper-lazy-preloader" />
                </div>
                <div className="swiper-lazy-loaded swiper-lazy-preloader-white" />
              </div>
            </div>
          </div>
        }
        {
          listPhotos != null && listPhotos.length <= 1 && listPhotos.map((item, itemIndex) => {

            return (
              <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                <a href={`/cars/${formatURL(title)}-${id}${personalizeURL}`} target={'_blank'}>
                  <div className={s.parent}>
                    <div className={cx(s.children)}>
                      <div className={s.content}>
                        <div style={{ backgroundImage: `url(${imagepath}${item.name})` }} class={cx(s.imageContent, "swiper-lazy")}>
                        </div>
                        <div className="swiper-lazy-loaded swiper-lazy-preloader-white" />
                      </div>
                    </div>
                  </div>
                </a>
                <div className="clearBoth"></div>
              </div>

            )
          })
        }
        {
          load && <Swiper {...params} rtl={isRTL(locale)} ref={node => this.swiper = node !== null ? node.swiper : null} className={cx(s.HomeCarSlide, 'HomeCarSlideSearch')}>
            {
              listPhotos != null && listPhotos.length > 1 && listPhotos.map((item, itemIndex) => {

                return (
                  <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)} key={itemIndex}>
                    <a href={`/cars/${formatURL(title)}-${id}${personalizeURL}`} target={'_blank'}>
                      <div className={s.parent}>
                        <div className={cx(s.children)}>
                          <div className={s.content}>
                            <div style={{ backgroundImage: `url(${imagepath}${item.name})` }} class={cx(s.imageContent, "swiper-lazy")}>
                            </div>
                            <div className="swiper-lazy-loaded swiper-lazy-preloader-white" />
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="clearBoth"></div>
                  </div>

                )
              })
            }

          </Swiper>
        }
        {arrow && arrow == true && listPhotos && listPhotos.length > 1 && <div className={'searchArrow'}>
          <SamplePrevArrow className={cx('hidden-xs hidden-sm')} onClick={this.goPrev} />
          <SampleNextArrow className={cx('hidden-xs hidden-sm')} onClick={this.goNext} />
        </div>
        }
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingPhotos));
