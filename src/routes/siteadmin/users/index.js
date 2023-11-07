import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Users from './Users';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'User Management';

export default async function action({ store }) {

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' }
  }
  // Admin restriction
  if (!restrictUrls('/siteadmin/users', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><Users title={title} /></AdminLayout>,
  };
};
