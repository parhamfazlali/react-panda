import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import Cookies from 'universal-cookie';

import axios from './axiosHandler';
import ActionTypes from '../src/actionTypes';

export default serverToken => ({ dispatch, getState }) => next => action => {
  if (isEmpty(action)) return null;

  if (typeof action === 'function') return action(dispatch, getState);

  if (!action.types) return next(action);

  const { types, method, url, data, params, files, ...rest } = action;
  next({ ...rest, type: types });

  const headers = {};
  const cookies = new Cookies();
  const token = cookies.get('token') || serverToken;

  if (token) headers.Authorization = `bearer ${token}`;
  headers['App-Platform'] = 'web';

  return axios({ method, url, data, params, files, headers })
    .then(({ data: result, status }) => {
      next({ ...rest, result, status, type: `${types}_SUCCESS` });
      return Promise.resolve({ result, status });
    })
    .catch(({ response: { data: error, status } }) => {
      next({ ...rest, error, status, type: `${types}_FAILURE` });

      if (status === 401) {
        next({ type: ActionTypes.AUTH_LOGOUT_SUCCESS });
        dispatch(push('/'));
      }

      if (!__DEV__ && status === 500) {
        dispatch(push('/500'));
      }

      return Promise.reject(error);
    });
};
