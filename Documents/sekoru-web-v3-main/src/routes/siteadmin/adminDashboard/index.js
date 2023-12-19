import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Dashboard from './Dashboard';

const title = 'Admin Dashboard';

export default async function action({ store }) {
  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  return {
    title,
    chunk: 'adminDashboard',
    component: <AdminLayout><Dashboard title={title} /></AdminLayout>,
  };
};