import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ViewMessage from './ViewMessage';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';
import { loadAccount } from '../../actions/account';
import { restrictUrls } from '../../helpers/adminPrivileges';
import { readMessage } from '../../actions/message/readMessage';

const title = 'ViewMessage';

export default async function action({ store, params }) {
  await store.dispatch(loadAccount());
  // From Redux Store
  const isAuthenticated = store.getState().runtime && store.getState().runtime.isAuthenticated;
  const isAdminAuthenticated = store.getState().runtime && store.getState().runtime.isAdminAuthenticated;
  const isAccount = store.getState().account && store.getState().account.data;
  const adminPrivileges = store.getState().account && store.getState().account.privileges && store.getState().account.privileges.privileges;
  const privileges = store.getState().listSettings && store.getState().listSettings.privileges;

  let userBanStatus;
  if (isAccount) {
    userBanStatus = isAccount.userBanStatus;
  }
  // From URL
  const threadId = Number(params.threadId);
  const userType = params.type;
  if (!isAdminAuthenticated && threadId && userType) await store.dispatch(readMessage(threadId, userType));
  if (!isAdminAuthenticated) {
    if (!isAuthenticated) {
      return { redirect: '/login' };
    }
  }
  // Admin restriction
  if (isAdminAuthenticated && !restrictUrls('/message/', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }
  if (userType != 'owner' && userType != 'renter' || userBanStatus) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404
    };
  }
  return {
    title,
    component: <UserLayout><ViewMessage threadId={threadId} userType={userType} /></UserLayout>,
  };
};
