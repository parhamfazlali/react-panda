import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import UsersDetails from '../UsersDetails';

describe('<UsersDetails />', () => {
  it('renders', () => {
    const mockData = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
    };

    const tree = renderer
      .create(
        <MemoryRouter>
          <UsersDetails user={mockData} />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
