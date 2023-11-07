import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditReview from './EditReview';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Admin Reviews';

export default async function action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/edit-review/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        const reviewId = Number(params.reviewId);

        return {
            title,
            component: <AdminLayout><EditReview title={title} reviewId={reviewId} /></AdminLayout>,
        };
    }
