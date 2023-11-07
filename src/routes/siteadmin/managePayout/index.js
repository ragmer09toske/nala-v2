import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ManagePayout from './ManagePayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Payout Management';

export default async function action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
        if (!restrictUrls('/siteadmin/payout', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><ManagePayout title={title} /></AdminLayout>
        }
    };