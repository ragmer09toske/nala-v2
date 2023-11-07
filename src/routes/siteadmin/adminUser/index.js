import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminUser from './AdminUser';

const title = 'Manage Admin Users';

export default async function action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let isSuperAdmin = store.getState().runtime.isSuperAdmin;

    if (!isAdminAuthenticated || !isSuperAdmin) {
      return { redirect: '/siteadmin/login' };
    }
    
    return {
      title,
      component: <AdminLayout><AdminUser title={title} /></AdminLayout>,
    };
  };
