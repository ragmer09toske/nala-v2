import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FindYourVehicleBlock from './FindYourVehicleBlock';
import { getStaticBlockInfo } from '../../../actions/siteadmin/getStaticBlockInfo';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Find your car block';

export default async function action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    await store.dispatch(getStaticBlockInfo());

    const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/home/find-your-car', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><FindYourVehicleBlock title={title} /></AdminLayout>,
    };
  };
