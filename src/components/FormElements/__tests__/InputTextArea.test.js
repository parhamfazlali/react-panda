import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import InputTextArea from '../InputTextArea';

global.Input = require('antd').Input;

describe('<InputTextArea />', () => {
  const tree = props =>
    renderer
      .create(
        <MemoryRouter>
          <InputTextArea
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
      placeholder: 'placeholder',
      meta: { touched: false, error: null }
    };
    expect(tree(props)).toMatchSnapshot();
  });
  it('renders with values', () => {
    const props = {
      input: { name: 'field' },
      label: 'field',
      value: 'Some text',
      meta: { touched: true, error: null }
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
