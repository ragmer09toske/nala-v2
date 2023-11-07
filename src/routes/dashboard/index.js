import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import Dashboard from './Dashboard';

const title = 'Dashboard';

export default async function action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><Dashboard title={title} /></UserLayout>,
    };
  };
