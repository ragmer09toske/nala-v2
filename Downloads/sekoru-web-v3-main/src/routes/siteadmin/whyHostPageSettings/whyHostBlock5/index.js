import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import WhyHostBlock5 from './WhyHostBlock5';
import { restrictUrls } from '../../../../helpers/adminPrivileges';

const title = 'Why Become Owner Block 5';

export default async function action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/whyHost/Block5', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
        return {
            title,
            component: <AdminLayout><WhyHostBlock5 title={title} /></AdminLayout>,
        };
    };
