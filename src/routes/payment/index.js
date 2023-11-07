import React from 'react';
import Layout from '../../components/Layout';
import Payment from './Payment';
import NotFound from '../notFound/NotFound';

const title = 'Payment';

export default async function action({ store, params }) {
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let reservationId = Number(params.reservationId);

  let isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload()
      }
    }
  };

  // Check authentication
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  // Check listId is provided
  if (!reservationId || isNaN(reservationId)) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404
    };
  }

  return {
    title,
    component: <Layout><Payment title={title} reservationId={reservationId} /></Layout>,
  };
};
