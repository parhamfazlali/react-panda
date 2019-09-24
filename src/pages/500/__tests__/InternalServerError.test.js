import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import InternalServerError from '../index';

describe('<InternalServerError />', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <InternalServerError />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
