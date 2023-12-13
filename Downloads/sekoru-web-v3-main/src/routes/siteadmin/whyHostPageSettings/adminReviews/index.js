import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import AdminReviews from './AdminReviews';
import { restrictUrls } from '../../../../helpers/adminPrivileges';


const title = 'Why Become Host Block 6';

export default async function action({ store }) {

    // From Redux Store
    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    const privileges = store.getState().listSettings && store.getState().listSettings.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/whyHost/review', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><AdminReviews title={title} /></AdminLayout>,
    };
}
