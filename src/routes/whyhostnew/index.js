import React from 'react';
import Layout from '../../components/Layout';
import WhyHostNew from './WhyHostNew';

const title = 'Why list your car';

let becomeHeaderCss = 'becomeHeaderCss';

export default async function action() {
  return {
    title,
    component: <Layout becomeHeader={true} becomeHeaderCss={becomeHeaderCss}><WhyHostNew title={title} /></Layout>,
  };
};
