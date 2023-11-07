import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditStaticPage from './EditStaticPage';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Edit Page Details';

export default async function action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/edit/staticpage/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
    
        const pageId = Number(params.pageId);

        return {
            title,
            component: <AdminLayout><EditStaticPage title={title} pageId={pageId} /></AdminLayout>,
        };
    };
