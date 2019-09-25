import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import config from '../../../config';
import axiosMiddleware from '../../../config/axiosMiddleware';
import ActionTypes from '../../actionTypes';
import { create, loadAll, load } from '../users.action';

const host = config.apiUrl;

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk, axiosMiddleware(undefined)]);

describe('load all users data', () => {
  const response = {
    status: 200,
    result: {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          first_name: 'George',
          last_name: 'Bluth',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
        }
      ]
    }
  };
  const errorMessage = 'Request failed with status code 400';

  afterEach(() => {
    nock.disableNetConnect();
  });

  it('creates LOAD_ALL_USERS_SUCCESS when fetching users has been done', () => {
    nock(host)
      .get('/users')
      .reply(200, response);

    const store = mockStore({ info: null });

    const expectedActions = [
      { type: ActionTypes.LOAD_ALL_USERS },
      {
        type: ActionTypes.LOAD_ALL_USERS_SUCCESS,
        result: response,
        status: 200
      }
    ];

    store.dispatch(loadAll()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOAD_ALL_USERS_FAILURE when fail to fetch users', () => {
    nock(host)
      .get('/users')
      .replyWithError(errorMessage);

    const store = mockStore({ error: null });

    const expectedActions = [
      { type: ActionTypes.LOAD_ALL_USERS },
      {
        type: ActionTypes.LOAD_ALL_USERS_FAILURE,
        result: response,
        status: 400
      }
    ];

    store.dispatch(loadAll()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('load user data', () => {
  const userId = 1;
  const response = {
    status: 200,
    result: {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
    }
  };
  const errorMessage = 'Request failed with status code 400';

  afterEach(() => {
    nock.disableNetConnect();
  });

  it('creates LOAD_USER_SUCCESS when fetching user has been done', () => {
    nock(host)
      .get(`/user/${userId}`)
      .reply(200, response);

    const store = mockStore({ info: null });

    const expectedActions = [
      { type: ActionTypes.LOAD_USER },
      {
        type: ActionTypes.LOAD_USER_SUCCESS,
        result: response,
        status: 200
      }
    ];

    store.dispatch(load(userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOAD_USER_FAILURE when fail to fetch user', () => {
    nock(host)
      .get(`/user/${userId}`)
      .replyWithError(errorMessage);

    const store = mockStore({ error: null });

    const expectedActions = [
      { type: ActionTypes.LOAD_USER },
      {
        type: ActionTypes.LOAD_USER_FAILURE,
        result: response,
        status: 400
      }
    ];

    store.dispatch(load(userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('create user', () => {
  const response = {
    status: 200,
    result: {
      name: 'morpheus',
      job: 'leader',
      id: '902',
      createdAt: '2019-09-25T07:23:40.107Z'
    }
  };
  const errorMessage = 'Request failed with status code 400';

  afterEach(() => {
    nock.disableNetConnect();
  });

  it('creates CREATE_USER_SUCCESS when creating user has been done', () => {
    nock(host)
      .post('/user', { name: 'morpheus', job: 'leader' })
      .reply(201, response);

    const store = mockStore({ info: null });

    const expectedActions = [
      { type: ActionTypes.CREATE_USER },
      {
        type: ActionTypes.CREATE_USER_SUCCESS,
        result: response,
        status: 201
      }
    ];

    store.dispatch(create()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CREATE_USER_FAILURE when fail to create user', () => {
    nock(host)
      .post('/user', { name: 'morpheus', job: 'leader' })
      .replyWithError(errorMessage);

    const store = mockStore({ error: null });

    const expectedActions = [
      { type: ActionTypes.CREATE_USER },
      {
        type: ActionTypes.CREATE_USER_FAILURE,
        result: response,
        status: 400
      }
    ];

    store.dispatch(create()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
