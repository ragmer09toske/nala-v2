import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';
// Component
import FooterButton from './FooterButton';
// Helpers
import validateStep3 from './validateStep3';
// Locale
import messages from '../../locale/messages';
import SidePanel from './SidePanel';
class LocalLaws extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    siteName: PropTypes.string.isRequired
  };


  render() {
    const { handleSubmit, previousPage, formErrors, formPage, step } = this.props;
    const { siteName } = this.props;
    let isDisabled = false;
    const { formatMessage } = this.props.intl;
    if (formErrors != undefined && formErrors.hasOwnProperty('syncErrors')) {
      isDisabled = true;
    }

    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.tabLocalLaws)}
        />
        <form onSubmit={handleSubmit} className={s.landingMainContent}>
          <h3 className={cx(cs.commonContentText, cs.spaceBottom2, cs.fontWeightMedium)}><FormattedMessage {...messages.localLaws} /></h3>
          <p className={cx(cs.commonMediumText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.localLaws1} />
          </p>
          <p className={cx(cs.commonMediumText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.localLaws2} />
          </p>
          <p className={cx(cs.commonMediumText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.localLaws3} />
          </p>
          <p className={cx(cs.commonMediumText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.localLaws4} />
            {siteName}.
            <FormattedMessage {...messages.localLaws41} />
          </p>
          <p className={cx(cs.commonMediumText, cs.spaceBottom2)}>
            <FormattedMessage {...messages.localLaws5} />
          </p>
          <FooterButton
            isDisabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"review-how-renters-book"}
            type={"submit"}
            formPage={formPage}
            step={step}
            isFinish
          />
        </form>
      </div>

    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

LocalLaws = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3
})(LocalLaws);

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  listingFields: state.listingFields.data,
  formErrors: state.form.ListPlaceStep3
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(LocalLaws)));