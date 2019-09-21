/* @flow */

import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from 'components';

const Users = loadable(() => import('./Users'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <Users {...props} />
  </ErrorBoundary>
);
