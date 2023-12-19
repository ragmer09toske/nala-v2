import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FooterBlock from './FooterBlock';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Footer Block';

export default async function action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/home/footer-block', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><FooterBlock title={title} /></AdminLayout>,
    };
  }
