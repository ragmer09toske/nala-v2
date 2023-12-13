import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Swiper from 'react-id-swiper';
import s from './PopularLocationSlider.css';

// Component
import PopularLocationItem from '../PopularLocationItem';
import Loader from '../../Loader/Loader';
import { injectIntl } from 'react-intl';
// Helpers
import { isRTL } from '../../../helpers/formatLocale';

//Image
import nextIcon from '/public/SiteIcons/popularNextArrow.svg';
import prevIcon from '/public/SiteIcons/popularPrevArrow.svg';

const nextArrowStyle = {
  position: 'absolute',
  right: '-32px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '30%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

const prevArrowStyle = {
  position: 'absolute',
  left: '-32px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '30%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={nextArrowStyle}
      onClick={onClick}
    >
      <img src={nextIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={prevArrowStyle}
      onClick={onClick}
    >
      <img src={prevIcon} />
    </div>
  );
}

class PopularLocationSlideComponent extends React.Component {

  static propTypes = {
  };

  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);

    this.state = {
      isClient: false,
      isBeginning: true,
      isEnd: false,
      load: false,
      showArrow: false
    };
  }

  componentDidMount() {

    const { data } = this.props;
    const isBrowser = typeof window !== 'undefined';
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : false;
    let landScapeDevice = isBrowser ? window.matchMedia('(max-width: 1024px)').matches : false;
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 991px)').matches : false;
    let showArrow = false;

    if (verySmallDevice) {
      showArrow = data && data.length > 1 ? true : false
    } else if (smallDevice) {
      showArrow = data && data.length > 3 ? true : false
    } else if (landScapeDevice) {
      showArrow = data && data.length > 4 ? true : false
    } else {
      showArrow = data && data.length > 6 ? true : false
    }
    
    this.setState({
      isClient: true,
      load: true,
      showArrow
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
    if (!this.swiper) return;
    if (this.swiper.isEnd) {
      this.setState({ isEnd: true });
    } else if (this.swiper.isBeginning) {
      this.setState({ isBeginning: true });
    } else {
      this.setState({ isEnd: false, isBeginning: false });
    }
  }


  render() {
    const { data, arrow, intl: { locale } } = this.props;
    const { isClient, load, showArrow } = this.state;
    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this, autoPlaySlider;

    const params = {
      slidesPerView: 6,
      spaceBetween: 24,
      draggable: true,
      freeMode: false,

      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
        }
      }
    }

    if (showArrow) params.loop = true


    return (
      <div className={s.positionRelative}>
        {
          !load && <div>
            <Loader type="text" />
          </div>
        }
        {
          load && isClient && <Swiper {...params} rtl={isRTL(locale)} ref={node => th.swiper = node !== null ? node.swiper : null}>
            {
              data.length > 0 && data.map((item, index) => {
                if (item.isEnable == 'true') {
                  return (
                    <div className={cx(s.paddingRight, s.locationWidth, s.displayFlex)} key={index}>
                      <PopularLocationItem
                        id={item.id}
                        location={item.location}
                        image={item.image}
                        locationAddress={item.locationAddress}
                      />
                    </div>
                  )
                }
              })
            }
          </Swiper>

        }

        {
          arrow == true && load && isClient && showArrow &&
          <div>
            <SamplePrevArrow
              className={cx('arrowPrevRTL')}
              onClick={this.goPrev}
            />
            <SampleNextArrow
              className={cx('arrowNextRTL')}
              onClick={this.goNext}
            />
          </div>
        }
      </div>
    );

  }
};

export default injectIntl(withStyles(s)(PopularLocationSlideComponent));
