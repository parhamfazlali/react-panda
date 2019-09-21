/* @flow */
import { flattener, single, promise } from './lib';

export default flattener([
  // SINGLE
  single('single_action'),

  /**
   * PROMISE -> Second arguments guide
   * c: CREATE
   * l: LOAD
   * a: LOAD_ALL
   * u: UPDATE
   * d: DELETE
   */
  promise('user', 'la') // WILL CREATE LOAD_USER + LOAD_ALL_USERS
]);
