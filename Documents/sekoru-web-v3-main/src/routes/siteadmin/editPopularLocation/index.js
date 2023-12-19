import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditPopularLocation from './EditPopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Edit Popular Location';

export default async function action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
        let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/edit/popularlocation/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
        const locationId = Number(params.locationId);

        return {
            title,
            component: <AdminLayout><EditPopularLocation title={title} locationId={locationId} /></AdminLayout>,
        };
    };
