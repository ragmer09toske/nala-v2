import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BlogManagement from './BlogManagement';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Content Management System';

export default async function action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/content-management', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
        return {
            title,
            component: <AdminLayout><BlogManagement title={title} /></AdminLayout>,
        };
    };
