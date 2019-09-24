import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { Users } from '../Users';

describe('<Users />', () => {
  const tree = (props, actions) =>
    renderer
      .create(
        <MemoryRouter>
          <Users {...props} {...actions} />
        </MemoryRouter>
      )
      .toJSON();

  it('renders the loading status if data invalid', () => {
    const props = {
      users: { fetching: null }
    };
    const actions = { loadAllUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if requesting data', () => {
    const props = {
      users: { fetching: true }
    };
    const actions = { loadAllUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if loading failed', () => {
    const props = {
      users: {
        fetching: false
      }
    };
    const actions = { loadAllUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if loading was successful', () => {
    const props = {
      users: {
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
      }
    };
    const actions = { loadAllUsers: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
