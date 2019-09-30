/* @flow */

import App from './app';
import {
  load as loadUser,
  loadAll as loadAllUsers
} from './actions/users.action';
import {
  asyncUsers,
  asyncUsersNew,
  asyncUsersDetails,
  NotFound
} from './pages';

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
        path: '/users/new-user',
        exact: true,
        component: asyncUsersNew
      },
      {
        path: '/users/:id',
        exact: true,
        component: asyncUsersDetails,
        loadData: ({ params }: Object) => [loadUser(params.id)]
      },
      {
        component: NotFound
      }
    ]
  }
];
