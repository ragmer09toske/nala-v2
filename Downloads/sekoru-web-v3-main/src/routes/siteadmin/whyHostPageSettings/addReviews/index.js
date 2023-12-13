import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import AddReviewsWhyHost from './AddReviewsWhyHost';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Host Block 6';

export default async function action({ store, params }) {

    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    if (!restrictUrls('/siteadmin/whyHost/review', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><AddReviewsWhyHost title={title} /></AdminLayout>,
    };
}
