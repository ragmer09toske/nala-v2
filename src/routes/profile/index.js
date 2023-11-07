import React from 'react';
import Profile from './Profile';
import UserLayout from '../../components/Layout/UserLayout';
import Layout from '../../components/Layout/Layout';
const title = 'User Profile';

export default async function action({ store, params }) {
    const data = store.getState().account.data;
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const profileId = params.profileId;
    let profile = 0;
    let isUser = false;

    if (profileId) {
      profile = Number(profileId);
      if (isAuthenticated && data && Number(data.profileId) == Number(profileId)) {
        profile = Number(profileId);
        isUser = true;
      }  
    } else {
      isUser = false;
    } 

  if (isUser) {
    return {
      title,
      component: <UserLayout><Profile title={title} isUser={isUser} profileId={profile} /></UserLayout>
    };
  } else {
    return {
      title,
      component: <Layout><Profile title={title} isUser={isUser} profileId={profile} /></Layout>
    };
  }

};
