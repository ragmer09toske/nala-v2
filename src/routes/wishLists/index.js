import React from 'react';
import WishLists from './WishLists';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';

const title = 'Wishlists';

export default async function action({ store, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  let profileId, wishListId;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (isAuthenticated) {
    profileId = store.getState().account.data.profileId;
  }

  if (params && params.id) {
    wishListId = params.id;
    if (isNaN(wishListId)) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }
  }


  return {
    title,
    component: <Layout><WishLists profileId={profileId} wishListId={wishListId} /></Layout>,
  };
};
