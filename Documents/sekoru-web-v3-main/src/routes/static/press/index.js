import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';


export default async function action() {
  const data = await new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require('./press.md'));
    }, 'press');
  });

  return {
    title: data.title,
    chunk: 'press',
    component: <Layout><Page {...data} /></Layout>,
  };
};
