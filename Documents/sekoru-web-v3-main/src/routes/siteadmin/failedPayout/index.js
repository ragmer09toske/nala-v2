import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FailedPayout from './FailedPayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Failed Payout';

export default async function action({ store, params }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
        }
        if (!restrictUrls('/siteadmin/failed-payout/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
        
        const id = params.id;
        return {
            title,
            component: <AdminLayout><FailedPayout title={title} id={Number(id)}/></AdminLayout>
        }
    };