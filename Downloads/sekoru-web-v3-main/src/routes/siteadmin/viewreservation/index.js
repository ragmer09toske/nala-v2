import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ViewReservationroute from './ViewReservationroute';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Reservation Details';

export default async function action({ store, params }) {


    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/viewreservation/', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = params.id;
    const type = params.type;
    let title = (type == 'reservation' || type == 'security-deposit') ? 'Reservation Details' : 'Payout Details'
    return {
        title,
        component: <AdminLayout><ViewReservationroute title={title} id={Number(id)} type={type} /></AdminLayout>,
    };
};
