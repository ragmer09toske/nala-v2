import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Messages from './Messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Messages';

export default async function action({ store }) {


    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }
    // Admin restriction
    if (!restrictUrls('/siteadmin/messages', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }
    return {
        title,
        component: <AdminLayout><Messages title={title} /></AdminLayout>,
    };
};
