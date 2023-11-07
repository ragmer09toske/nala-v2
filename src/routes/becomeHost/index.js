import React from 'react';
import ListLayout from '../../components/Layout/ListLayout';
import BecomeHost from './BecomeHost';


// Redux Action
import { getListingSteps, resetListingSteps } from '../../actions/getListingSteps';
import { getListingFields } from '../../actions/getListingFields';
import { getListingStepTwo } from '../../actions/Listing/getListingStepTwo';
import NewListLayout from '../../components/Layout/NewListLayout';
import { restrictUrls } from '../../helpers/adminPrivileges';
import NotFound from '../notFound/NotFound';
import fetch from '../../core/fetch';

const title = 'Become a Owner';

export default async function action({ store, query, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const listingFields = store.getState().listingFields.data;
  const listingSteps = store.getState().location.listingSteps;
  const initialValuesLoaded = store.getState().location.initialValuesLoaded;
  const baseCurrency = store.getState().currency.base;
  let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  const listingPages = [
    'index', 'home', 'car', 'location', 'map', 'features', 'photos', 'description',
    'car-rules', 'review-how-renters-book', 'min-max-days', 'calendar',
    'pricing', 'discount', 'booking-scenarios', 'local-laws'
  ];

  // From URI
  const listId = params.listId;
  const formPage = params.formPage;
  const formBaseURI = "/become-a-owner/";
  const className = 'hiddenFooterMobile';
  let mode;

  let checkListing = `
   query CheckListing($id:Int!){
    checkListing(id:$id){
      status
    }
   }
   `
  if ("mode" in query) {
    if (query.mode === "new") {
      mode = query.mode;
    }
  }

  if (!isAuthenticated && !isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  // Admin restriction
  if (isAdminAuthenticated && !restrictUrls('/become-a-owner/', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }


  if (isAdminAuthenticated && mode == 'new') {
    return { redirect: '/siteadmin' };
  }

  if (listId != undefined && !isNaN(listId)) {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: checkListing,
        variables: { id: listId }
      }),
    });

    const { data } = await resp.json();
    if (data && data.checkListing && data.checkListing.status != 200) {
      return {
        title,
        component: <NewListLayout><NotFound /></NewListLayout>
      }
    }

  } else if (listId && isNaN(listId) && !listingPages.includes(listId)) {
    return {
      title,
      component: <NewListLayout><NotFound /></NewListLayout>
    }
  }

  // Fetch all settings fields 
  if (listingFields === undefined) {
    store.dispatch(getListingFields());
  }

  if (listId != undefined && !isNaN(listId)) {
    // Fetch All steps status
    if (listingSteps === undefined) {
      store.dispatch(getListingSteps(listId));
    } else {
      // Fetch All steps status for another list
      if (listingSteps.listId != listId) {
        store.dispatch(getListingSteps(listId));
      } else if (formPage && formPage == 'home') {
        store.dispatch(getListingSteps(listId));
      }
    }
    store.dispatch(getListingStepTwo(listId));

  } else {
    if (initialValuesLoaded != true || (mode && mode == 'new')) {
      await store.dispatch(resetListingSteps());
      await store.dispatch(getListingSteps());
    }
  }

  if (listId != undefined && !isNaN(listId)) {
    let step;
    const step1Pages = [
      "car", "location", "map", "features"
    ];
    const step2Pages = [
      "photos", "description"
    ];
    const step3Pages = [
      "car-rules", "review-how-renters-book", "min-max-days", "calendar",
      "pricing", "discount", "booking-scenarios", "local-laws"
    ];

    if (step1Pages.indexOf(formPage) > -1) {
      step = 1;
    } else if (step2Pages.indexOf(formPage) > -1) {
      step = 2;
    } else if (step3Pages.indexOf(formPage) > -1) {
      step = 3;
    }
    if (step != undefined) {
      return {
        title,
        component: <ListLayout listId={Number(listId)}
          formPage={formPage}
          formBaseURI={formBaseURI}
          step={step}>
          <BecomeHost
            listId={Number(listId)}
            title={title}
            formPage={formPage}
            formBaseURI={formBaseURI}
            mode={mode}
            baseCurrency={baseCurrency}
            step={step}
          />
        </ListLayout>,
      };
    }
  }

  return {
    title,
    component: <NewListLayout>
      <BecomeHost
        listId={Number(listId)}
        title={title}
        formPage={formPage}
        formBaseURI={formBaseURI}
        mode={mode}
        baseCurrency={baseCurrency}
      />
    </NewListLayout>
  };
};
