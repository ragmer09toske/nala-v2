import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ReservationContainer from './ReservationContainer';
import NotFound from '../notFound/NotFound';
import Layout from '../../components/Layout/Layout';

const title = 'Reservation';

export default async function action({ store, params }) {

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const type = params.type;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (type === 'current' || type === 'previous') {
    return {
      title,
      component: <UserLayout showSideMenu={'listContainer'}><ReservationContainer userType={"owner"} type={type} /></UserLayout>,
    };
  }
  return {
    title,
    component: <Layout><NotFound title={title} /></Layout>,
    status: 404
  }
};
