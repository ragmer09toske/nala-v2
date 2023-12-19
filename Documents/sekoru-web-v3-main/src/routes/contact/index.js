import React from 'react';
import Layout from '../../components/Layout';
import Contact from './Contact';

const title = 'Contact Us';

export default async function action({ store }) {
    return {
      title,
      component: <Layout><Contact title={title} /></Layout>,
    };
  };
