import ActionTypes from '../actionTypes';

export function loadAll(params: Object) {
  return {
    types: ActionTypes.LOAD_ALL_USERS,
    method: 'get',
    url: '/users',
    params
  };
}

export function load(id: string) {
  return {
    types: ActionTypes.LOAD_USER,
    method: 'get',
    url: `/users/${id}`
  };
}

export function create(data: Object) {
  return {
    types: ActionTypes.CREATE_USER,
    method: 'post',
    url: '/users',
    data
  };
}
