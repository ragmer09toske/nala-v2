import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

// Component
import FooterButton from './FooterButton';

import updateStep3 from './updateStep3';
// Locale
import messages from '../../locale/messages';
import SidePanel from './SidePanel';

//Image
import locationIcon from '/public/SiteIcons/locationIdea.svg';
class Booking extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.stepGrid, 'customRatioButton', 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.bookingTypeTitle)}
        />
        <form onSubmit={handleSubmit} className={s.landingMainContent}>
          <h3 className={cx(cs.commonContentText, cs.spaceBottom3, cs.fontWeightMedium)}><FormattedMessage {...messages.instantBookingTitle} /></h3>
          <div className={cx(cs.commonMediumText, cs.spaceBottom4)}>
            <FormattedMessage {...messages.instantBookingInfo} />
          </div>
          <h3 className={cx(cs.commonContentText, cs.spaceBottom3, cs.fontWeightMedium)}><FormattedMessage {...messages.whoCanBook} /></h3>
          <div className={cx(s.searchToolTip, cs.spaceBottom3)}>
            <img src={locationIcon} className={'listTipIcon'}/>
            <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.whoCanBookInfo} /></span>
          </div>
          <div className={s.spaceTop3}>
            <div className={cx(s.checkBoxFlex, s.alignBase)}>
              <div>
              <Field name="bookingType" component="input" type="radio" value="instant" className={s.BookingradioInput} />
              </div>
              <div className={cx(s.checkBoxLeft, 'discountRightRTL')}>
                <span className={cx(cs.commonMediumText)}><FormattedMessage {...messages.whoCanBookInfo1} /></span>
                <span className={s.subText}><FormattedMessage {...messages.whoCanBookInfo2} /></span>
              </div>
            </div>
          </div>
          <div className={cx(s.space6, s.spaceTop3)}>
            <div className={s.checkBoxFlex}>
              <div>
              <Field name="bookingType" component="input" type="radio" value="request" className={s.BookingradioInput} />
              </div>
              <div className={cx(s.checkBoxLeft, 'discountRightRTL')}>
                <span className={cx(cs.commonMediumText)}><FormattedMessage {...messages.whoCanBookInfo3} /></span>
              </div>
            </div>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            previousPagePath={"calendar"}
            nextPagePath={"review-how-renters-book"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

Booking = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Booking);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Booking)));
