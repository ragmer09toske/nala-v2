import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditBlogDetails from './EditBlogDetails';
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
        if (!restrictUrls('/siteadmin/edit/page/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
    
        const blogId = Number(params.blogId);

        return {
            title,
            component: <AdminLayout><EditBlogDetails title={title} blogId={blogId} /></AdminLayout>,
        };
    };
