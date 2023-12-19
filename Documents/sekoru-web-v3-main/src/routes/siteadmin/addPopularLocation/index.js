import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AddPopularLocation from './AddPopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Add Popular Location';

export default async function action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
        let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/popularlocation/add', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><AddPopularLocation title={title} /></AdminLayout>,
        };
    };
