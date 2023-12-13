import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Layout from '../../../components/Layout';
import ListSettings from './ListSettings';
import fetch from '../../../core/fetch';
import NotFound from '../../notFound/NotFound';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';
import { getCarType } from '../../../actions/siteadmin/getCarType';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'List Settings';

export default async function action({ store, params }) {

  // Params
  const typeId = params.typeId;

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
  const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/listsettings/', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  await store.dispatch(getCarType());

  if (typeId && !isNaN(typeId)) {
    store.dispatch(getAdminListingSettings(typeId));
  }

  return {
    title,
    component: <AdminLayout><ListSettings /></AdminLayout>,
  };
};
