import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ImageBanner from './ImageBanner';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Home page Banner';

export default async function action({ store }) {

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/banner', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><ImageBanner title={title} /></AdminLayout>,
  };
};
