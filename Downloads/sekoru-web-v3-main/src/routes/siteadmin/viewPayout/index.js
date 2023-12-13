import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ViewPayoutroute from './ViewPayoutroute';
import { restrictUrls } from '../../../helpers/adminPrivileges';

export default async function action({ store, params }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/viewpayout/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        const id=params.id;
        const type = params.type;
        let title = type == 'reservation' ? 'Reservation Details' : 'Payout Details'
        return {
            title,
            component: <AdminLayout><ViewPayoutroute title={title} id={Number(id)} type={type}/></AdminLayout>,
        };
    };
