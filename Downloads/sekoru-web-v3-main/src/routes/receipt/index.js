import React from 'react';
import ReceiptContainer from './ReceiptContainer';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';

const title = 'View Receipt';

export default async function action({ store, params }) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if(!reservationId) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <Layout><ReceiptContainer title={title} reservationId={Number(reservationId)} /></Layout>,
    };
  };
