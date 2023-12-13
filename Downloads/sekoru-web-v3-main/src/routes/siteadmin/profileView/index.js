import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ProfileView from './ProfileView';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Profile Verified View';

export default async function action({ store, params }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        let privileges = store.getState().listSettings && store.getState().listSettings.privileges;
        
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' }
        }
        // Admin restriction
        if (!restrictUrls('/siteadmin/profileView/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }

        const data = store.getState().account.data;
        const profileId = params.profileId;
        let profile = 0;
        let isUser = false;
        if(profileId === null || profileId === undefined) {
          if(data) {
            isUser = true;
          }
        } else {
          profile = Number(profileId);
        }
  
        return {
            title,
            component: <AdminLayout><ProfileView title={title} profileId={profile} /></AdminLayout>,
        };
    };
