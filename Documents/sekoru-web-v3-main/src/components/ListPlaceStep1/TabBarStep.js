// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Translation
import { injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import history from '../../core/history';

//Image

import iconOne from '/public/SiteIcons/hostStepIcons/carTypeIcon.svg';
import iconTwo from '/public/SiteIcons/hostStepIcons/location.svg';
import iconThree from '/public/SiteIcons/hostStepIcons/features.svg';
import iconFour from '/public/SiteIcons/hostStepIcons/photos.svg';
import iconFive from '/public/SiteIcons/hostStepIcons/description.svg';

import iconSix from '/public/SiteIcons/hostStepIcons/carRules.svg';
import iconSeven from '/public/SiteIcons/hostStepIcons/pricing.svg';
import iconEight from '/public/SiteIcons/hostStepIcons/discount.svg';
import iconNine from '/public/SiteIcons/hostStepIcons/bookingWindow.svg';
import iconTen from '/public/SiteIcons/hostStepIcons/calendar.svg';
import iconEleven from '/public/SiteIcons/hostStepIcons/booking.svg';
import iconTwelve from '/public/SiteIcons/hostStepIcons/renterBook.svg';
import iconThirteen from '/public/SiteIcons/hostStepIcons/localLaws.svg'


class TabBarStep extends Component {

  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string,
      step2: PropTypes.string,
      step3: PropTypes.string
    }),
  };

  static defaultProps = {
    arrow: true,
    listingSteps: {
      step1: 'inactive',
      step2: 'inactive',
      step3: 'inactive'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      isClient: false
    };
  }

  componentDidMount() {
    this.setState({
      isClient: true,
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
        });
      }, 3000);
    }
  }

  nextPage(formPage) {
    history.push(formPage);
  }

  render() {
    const { formPage, step, listingSteps } = this.props;
    const { formatMessage } = this.props.intl;
    const { load, isClient } = this.state;

    let pathname = formPage;
    let tabBarData = [], tabBarStep1 = [], tabBarStep2 = [], tabBarStep3 = [];
    if (listingSteps && listingSteps.step1 === 'completed') {
      tabBarStep1 = [
        {
          pathname: "car",
          icon: iconOne,
          text: formatMessage(messages.tabPlaceType)
        },
        {
          pathname: "map",
          icon: iconTwo,
          text: formatMessage(messages.location)
        },
        {
          pathname: "features",
          icon: iconThree,
          text: formatMessage(messages.aminities)
        },
      ];
    }


    if (listingSteps && listingSteps.step2 === 'completed') {
      tabBarStep2 = [
        {
          pathname: "photos",
          icon: iconFour,
          text: formatMessage(messages.photos)
        },
        {
          pathname: "description",
          icon: iconFive,
          text: formatMessage(messages.descriptionAdminLabel)
        },
      ];
    }

    if (listingSteps && listingSteps.step3 === 'completed') {
      tabBarStep3 = [
        {
          pathname: "car-rules",
          icon: iconSix,
          text: formatMessage(messages.houseRules)
        },
        {
          pathname: "pricing",
          icon: iconSeven,
          text: formatMessage(messages.tabPricing)
        },
        {
          pathname: "discount",
          icon: iconEight,
          text: formatMessage(messages.tabDiscount)
        },
        {
          pathname: "min-max-days",
          icon: iconNine,
          text: formatMessage(messages.bookingWindow)
        },
        {
          pathname: "calendar",
          icon: iconTen,
          text: formatMessage(messages.tabCalendar)
        },
        {
          pathname: "booking-scenarios",
          icon: iconEleven,
          text: formatMessage(messages.tabBooking)
        },
        {
          pathname: "review-how-renters-book",
          icon: iconTwelve,
          text: formatMessage(messages.reviewGuestBook)
        },
        {
          pathname: "local-laws",
          icon: iconThirteen,
          text: formatMessage(messages.tabLocalLaws)
        },
      ]
    }

    step && step == 1 ? tabBarData = tabBarStep1 : (step == 2 ? tabBarData = tabBarStep2 : tabBarData = tabBarStep3);

    const params = {
      slidesPerView: 'auto',
      spaceBetween: 20,
      infinite: true,
      breakpoints: {
        1200: {
          slidesPerView: 'auto',

        },
        768: {
          slidesPerView: 'auto',
        },
        640: {
          slidesPerView: 2,
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      activeSlideKey: pathname,
    };
    return (
      <div className={cx('listHeaderSlider', (step == 3 ? 'tabBar3Slider' : ''), (step == 2 ? 'tabBar2Slider' : ''))}>

        {tabBarData && tabBarData.length > 0 && load && isClient &&
          <Swiper {...params}>
            {
              tabBarData.map((item, index) => {
                return (
                  <div key={item.pathname}
                  >
                    <a onClick={() => this.nextPage(item.pathname)}>
                      <div className={cx(s.tabBorder, { [s.active]: pathname === item.pathname }, 'tabBorderRTL')} >
                        <div className={s.iconBg}><img src={item.icon} /></div>
                        <span className={cx(s.tabFont, 'tabFontRTL')}>{item.text}</span>
                      </div>
                    </a>
                  </div>
                )
              })
            }
          </Swiper>}
      </div>
    );
  }

}

const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  existingList: state.location.isExistingList,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(TabBarStep)));
