import GlobalLayout from '../components/Layout';
import React from 'react';
import Index from '../containers/Index';
import Head from '../components/Head';

export default () => (
    <GlobalLayout>
      <Head title="EduExpress" isHome={true}/>
      <Index/>
    </GlobalLayout>
)
