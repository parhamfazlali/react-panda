/* @flow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from './users.reducer';

const reducers = {
  users
};

export type Reducers = typeof reducers;
export default (history: Object) =>
  combineReducers({ router: connectRouter(history), ...reducers });
