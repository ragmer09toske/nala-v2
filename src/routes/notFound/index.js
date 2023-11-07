import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = 'Page Not Found';

export default function action() {
  return {
    title,
    component: 
    <Layout>
      <NotFound title={title} />,
    </Layout>,
    status: 404,
  };
}