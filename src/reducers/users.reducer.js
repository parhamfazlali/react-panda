// @flow

import ActionTypes from '../actionTypes';

const initialState = {
  fetching: null
};

export default function(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    /**
     * LOAD_ALL_USERS
     */
    case ActionTypes.LOAD_ALL_USERS:
      return {
        ...state,
        fetching: true
      };
    case ActionTypes.LOAD_ALL_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.result
      };
    case ActionTypes.LOAD_ALL_USERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };

    default:
      return state;
  }
}
