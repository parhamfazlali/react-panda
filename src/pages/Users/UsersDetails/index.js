/* @flow */

import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from 'components';

const UsersDetails = loadable(() => import('./UsersDetails'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <UsersDetails {...props} />
  </ErrorBoundary>
);
