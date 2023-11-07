import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import EditReviewsWhyHost from './EditReviewsWhyHost';
import { restrictUrls } from '../../../../helpers/adminPrivileges'

const title = 'Why Become Owner Block 6';

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

    const reviewId = Number(params.id);

    return {
        title,
        component: <AdminLayout><EditReviewsWhyHost title={title} reviewId={reviewId} /></AdminLayout>,
    };
}
