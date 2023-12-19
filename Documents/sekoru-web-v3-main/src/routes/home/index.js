import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import HomeLayout from '../../components/Layout/HomeLayout';

import { getListingFields } from '../../actions/getListingFields';

export default async function action({ store }) {
  const title = store.getState().siteSettings.data.siteTitle;
  const description = store.getState().siteSettings.data.metaDescription;
  const listingFields = store.getState().listingFields.data;
  const layoutType = store.getState().siteSettings.data.homePageType;
  const wholeData = store.getState().homeBannerImages.data;

  if (listingFields === undefined) {
    store.dispatch(getListingFields());
  }

  return {
    title,
    description,
    listingFields,
    chunk: 'home',
    component: <HomeLayout layoutType={layoutType}><Home layoutType={layoutType} wholeData={wholeData} /></HomeLayout>,
  };
};
