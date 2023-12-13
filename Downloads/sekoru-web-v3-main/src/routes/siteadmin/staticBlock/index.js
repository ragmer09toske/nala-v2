import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import StaticBlock from './StaticBlock';
import { getStaticBlockInfo } from '../../../actions/siteadmin/getStaticBlockInfo';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Static Info Block';

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
    if (!restrictUrls('/siteadmin/home/static-info-block', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><StaticBlock title={title} /></AdminLayout>,
    };
  };
