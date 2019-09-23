/* @flow */

import App from './app';
import { loadAll as loadAllUsers } from './actions/users.action';
import { asyncUsers, NotFound } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncUsers,
        loadData: () => [loadAllUsers()]
      },
      {
        component: NotFound
      }
    ]
  }
];
