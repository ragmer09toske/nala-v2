import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Listings from './Listings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Listings Management';

export default async function action({ store }) {


  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }
  // Admin restriction
  if (!restrictUrls('/siteadmin/listings', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }
  return {
    title,
    component: <AdminLayout><Listings title={title} /></AdminLayout>,
  };
};
