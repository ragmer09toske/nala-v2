import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import UserEditReviews from './UserEditReviews';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Management Reviews';

export default async function action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/management-reviews/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        const reviewId = Number(params.reviewId);

        return {
            title,
            component: <AdminLayout><UserEditReviews title={title} reviewId={reviewId} /></AdminLayout>,
        };
    };
