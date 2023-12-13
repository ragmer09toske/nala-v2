// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Internal Helpers
import submit from './submit';
import update from './update';
import updateStep2 from './updateStep2';
import updateStep3 from './updateStep3';

// Translation
import { injectIntl } from 'react-intl';

// Step #1
import ExistingPage1 from './ExistingPage1';
import Page2 from './Page2';
import Page5 from './Page5';
import Page6 from './Page6';
import Page8 from './Page8';

// Step #2
import Photos from './Photos';
import Description from './Description';

// Step #3
import HouseRules from './HouseRules';
import ReviewGuestBook from './ReviewGuestBook';
import MinMaxNights from './MinMaxNights';
import Calendar from './Calendar';
import Pricing from './Pricing';
import Discount from './Discount';
import Booking from './Booking';
import LocalLaws from './LocalLaws';
import history from '../../core/history';
import ListIntro from './ListIntro';
import NotFound from '../../routes/notFound/NotFound';

class ListPlaceStep1 extends Component {

  static propTypes = {
    listData: PropTypes.object,
    existingList: PropTypes.bool,
    listingSteps: PropTypes.object,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 'index',
      step1: null,
      step2: null,
      step3: null,
      formValues: {},
    };
  }

  UNSAFE_componentWillMount() {
    const { existingList, listingSteps } = this.props;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { existingList, listingSteps } = nextProps;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
      });
    } else {
      this.setState({
        step1: null,
        step2: null,
        step3: null,
      });
    }
  }

  nextPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  previousPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  render() {
    const { formPage, photosCount, mode, existingList, listId, baseCurrency, step } = this.props;
    const { page } = this.state;

    let currentPage = page;
    if (mode != undefined && mode === "new") {
      currentPage = 'index';
    } else if (formPage != undefined) {
      currentPage = formPage;
    }

    const listingPages = [
      'index', 'home', 'car', 'location', 'map', 'features', 'photos', 'description',
      'car-rules', 'review-how-renters-book', 'min-max-days', 'calendar',
      'pricing', 'discount', 'booking-scenarios', 'local-laws'
    ];

    return (
      listingPages.includes(currentPage) ?
        <div className={'inputFocusColor'}>
          {currentPage === "index" && <ListIntro nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "home" && <ExistingPage1 listId={listId} nextPage={this.nextPage} photosCount={photosCount} formPage={formPage} step={step} />}
          {currentPage === "car" && <Page2 nextPage={this.nextPage} previousPage={this.previousPage} formPage={formPage} step={step} />}
          {currentPage === "location" && <Page5
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            onSubmit={existingList ? update : submit}
            formPage={formPage} step={step}
            listId={listId}
          />}
          {currentPage === "map" && <Page6 nextPage={this.nextPage} previousPage={this.previousPage} formPage={formPage} step={step} />}
          {currentPage === "features" && <Page8 previousPage={this.previousPage} onSubmit={update} formPage={formPage} step={step} />}

          {currentPage === "photos" && <Photos previousPage={this.previousPage} listId={listId} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "description" && <Description previousPage={this.previousPage} nextPage={this.nextPage} formPage={formPage} step={step} onSubmit={updateStep2} />}

          {currentPage === "car-rules" && <HouseRules previousPage={this.previousPage} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "review-how-renters-book" && <ReviewGuestBook previousPage={this.previousPage} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "min-max-days" && <MinMaxNights previousPage={this.previousPage} listId={listId} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "pricing" && <Pricing
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            formPage={formPage} step={step}
          />}
          {currentPage === "calendar" && <Calendar
            listId={listId}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            baseCurrency={baseCurrency}
            formPage={formPage} step={step}
          />}
          {currentPage === "discount" && <Discount previousPage={this.previousPage} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "booking-scenarios" && <Booking previousPage={this.previousPage} nextPage={this.nextPage} formPage={formPage} step={step} />}
          {currentPage === "local-laws" && <LocalLaws previousPage={this.previousPage} onSubmit={updateStep3} formPage={formPage} step={step} />}
        </div> : <NotFound />
    );
  }

}

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingSteps: state.location.listingSteps,
  photosCount: state.location.photosCount,
});

const mapDispatch = {
};

export default injectIntl(connect(mapState, mapDispatch)(ListPlaceStep1));
