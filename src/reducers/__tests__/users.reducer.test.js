import users from '../users.reducer';
import ActionTypes from '../../actionTypes';

describe('users data', () => {
  it('should return the initial state', () => {
    expect(users(undefined, {})).toEqual({
      fetching: null
    });
  });

  it('should handle LOAD_ALL_USERS', () => {
    expect(
      users(undefined, {
        type: ActionTypes.LOAD_ALL_USERS,
        fetching: true
      })
    ).toEqual({
      fetching: true
    });
  });

  it('should handle LOAD_ALL_USERS_FAILURE', () => {
    expect(
      users(undefined, {
        type: ActionTypes.LOAD_ALL_USERS_FAILURE,
        fetching: false,
        error: 'Oops! Something went wrong.'
      })
    ).toEqual({
      fetching: false,
      error: 'Oops! Something went wrong.'
    });
  });

  it('should handle LOAD_ALL_USERS_SUCCESS', () => {
    expect(
      users(undefined, {
        type: ActionTypes.LOAD_ALL_USERS_SUCCESS,
        fetching: false,
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
      })
    ).toEqual({
      fetching: false,
      data: {
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
    });
  });

  // it('should handle USERS_FAILURE', () => {
  //   expect(
  //     users(undefined, {
  //       type: 'USERS_FAILURE',
  //       err: 'Oops! Something went wrong.',
  //       data: []
  //     })
  //   ).toEqual({
  //     readyStatus: 'USERS_FAILURE',
  //     err: 'Oops! Something went wrong.',
  //     list: []
  //   });
  // });

  // it('should handle USERS_SUCCESS', () => {
  //   expect(
  //     users(undefined, {
  //       type: 'USERS_SUCCESS',
  //       err: null,
  //       data: [{ id: '1', name: 'Welly' }]
  //     })
  //   ).toEqual({
  //     readyStatus: 'USERS_SUCCESS',
  //     err: null,
  //     list: [{ id: '1', name: 'Welly' }]
  //   });
  // });
});
