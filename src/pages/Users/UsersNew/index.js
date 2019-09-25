/* @flow */

import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from 'components';

const UsersNew = loadable(() => import('./UsersNew'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <UsersNew {...props} />
  </ErrorBoundary>
);
