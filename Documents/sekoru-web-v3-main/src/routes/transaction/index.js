import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TransactionContainer from './TransactionContainer';
import NotFound from '../notFound/NotFound';
import Layout from '../../components/Layout/Layout';

const title = 'Transaction History';

export default async function action({ store, params }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  const mode = params.type;
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (mode === 'completed' || mode === 'future' || mode === 'grossEarnings') {
    return {
      title,
      component: <UserLayout showSideMenu={'accountMenu'}><TransactionContainer mode={mode} /></UserLayout>,
    };
  }
  return {
    title,
    component: <Layout><NotFound title={title} /></Layout>,
    status: 404
  };

};
