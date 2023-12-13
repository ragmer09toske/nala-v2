import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import PaymentGatway from './PaymentGateway';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Payment Gateway Section';

export default async function action({ store }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/payment-gateway-section', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><PaymentGatway title={title}/></AdminLayout>
        }
};
