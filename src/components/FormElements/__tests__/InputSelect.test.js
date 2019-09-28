import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import InputSelect from '../InputSelect';

global.Input = require('antd').Input;

describe('<InputSelect />', () => {
  const tree = props =>
    renderer
      .create(
        <MemoryRouter>
          <InputSelect
            {...props}
            input={{ name: 'field' }}
            meta={{ touched: false, error: null }}
          />
        </MemoryRouter>
      )
      .toJSON();

  it('renders  without error', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      meta: { touched: false, error: null }
    };
    expect(tree(props)).toMatchSnapshot();
  });

  it('renders error, not touched', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      meta: { touched: false, error: 'Required' }
    };
    expect(tree(props)).toMatchSnapshot();
  });

  it('renders error, and touched', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      meta: { touched: true, error: 'Required' }
    };
    expect(tree(props)).toMatchSnapshot();
  });

  it('renders search', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      meta: { touched: false, error: null },
      search: true
    };
    expect(tree(props)).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      meta: { touched: false, error: null },
      disabled: true
    };
    expect(tree(props)).toMatchSnapshot();
  });
});
