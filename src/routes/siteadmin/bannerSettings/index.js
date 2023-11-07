import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BannerSettings from './BannerSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Banner Settings';

export default async function action({ store }) {

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/caption', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }


  return {
    title,
    component: <AdminLayout><BannerSettings title={title} /></AdminLayout>,
  };
};
