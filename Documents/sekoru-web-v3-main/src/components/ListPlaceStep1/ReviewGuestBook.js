import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import cs from '../commonStyle.css';

// Component
import FooterButton from './FooterButton';

import updateStep3 from './updateStep3';
// Locale
import messages from '../../locale/messages';
import SidePanel from './SidePanel';

//Image
import tickIcon from '/public/SiteIcons/rulesIcon.svg';
import locationIcon from '/public/SiteIcons/locationIdea.svg';
class ReviewGuestBook extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      reviewGuestBook: [],
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    if (listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { reviewGuestBook, isDisabled } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.stepGrid, 'stepGridRTL')}>
        <SidePanel
          title={formatMessage(messages.step3Heading)}
          landingContent={formatMessage(messages.guestRequirementsTitle)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={cx(cs.commonContentText, cs.spaceBottom3)}><FormattedMessage {...messages.stepThreeRules} /></h3>
            <p className={cx(cs.commonMediumText, cs.spaceBottom3)}><span><FormattedMessage {...messages.reviewGuestBookDescription} /></span></p>
            <FormGroup className={s.formGroup}>
              <ul className={cx('list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
                {
                  reviewGuestBook.map((item, key) => {
                    if (item.isEnable === "1") {
                      return (
                        <li key={key} className={cx(s.reviewGuestFlex, cs.spaceBottom3)}>
                          <span className={cx(cs.commonMediumText)}><img src={tickIcon} className={cx(s.checkIcon, 'reviewTickRTL')} /></span>
                          <span className={cx(cs.commonMediumText)}> {item.itemName} </span>
                        </li>
                      )
                    }
                  })
                }
              </ul>
              <div className={cx(s.searchToolTip, cs.spaceBottom3)}>
                <img src={locationIcon} className={'listTipIcon'}/>
                <span className={cx(s.locationTipCss, cs.commonMediumText)}><FormattedMessage {...messages.reviewGuestBookNote} /></span>
              </div>
            </FormGroup>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            nextPage={nextPage}
            previousPage={previousPage}
            previousPagePath={"booking-scenarios"}
            nextPagePath={"local-laws"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>

    );
  }
}

ReviewGuestBook = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(ReviewGuestBook);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewGuestBook)));
