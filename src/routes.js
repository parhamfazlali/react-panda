/* @flow */

import App from './app';
import { loadAll as loadAllUsers } from './actions/users.action';
import { asyncUsers, asyncUsersNew, NotFound } from './pages';

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
        path: '/new-user',
        exact: true,
        component: asyncUsersNew
      },
      {
        component: NotFound
      }
    ]
  }
];
