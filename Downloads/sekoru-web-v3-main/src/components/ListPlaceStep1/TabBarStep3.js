// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep3.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep3 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, formPage } = this.props;
    let pathname = formPage;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "renter-requirements" })} title={formatMessage(messages.guestRequirements)} >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("renter-requirements")} href="javascript:void(0);">
            <FormattedMessage {...messages.guestRequirements} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "car-rules" })} title={formatMessage(messages.houseRules)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("car-rules")} href="javascript:void(0);">
            <FormattedMessage {...messages.houseRules} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "review-how-renters-book" })} title={formatMessage(messages.reviewGuestBook)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("review-how-renters-book")} href="javascript:void(0);">
            <FormattedMessage {...messages.reviewGuestBook} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "booking-window" })} title={formatMessage(messages.bookingWindow)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("booking-window")} href="javascript:void(0);">
            <FormattedMessage {...messages.bookingWindow} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "min-max-days" })} title={formatMessage(messages.minminDays)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("min-max-days")} href="javascript:void(0);">
            <FormattedMessage {...messages.minminDays} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "pricing" })} title={formatMessage(messages.tabPricing)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("pricing")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabPricing} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "calendar" })} title={formatMessage(messages.tabCalendar)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("calendar")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabCalendar} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "discount" })} title={formatMessage(messages.tabDiscount)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("discount")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabDiscount} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "booking-scenarios" })} title={formatMessage(messages.tabBooking)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("booking-scenarios")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabBooking} />
          </a>
        </div>

        <div className={cx(s.textTrunck, s.progressSection, s.progressStyle,
          { [s.active]: pathname === "local-laws" })} title={formatMessage(messages.tabLocalLaws)}>
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("local-laws")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabLocalLaws} />
          </a>
        </div>
        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep3));
