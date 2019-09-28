import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { get } from 'lodash';
import InputTextArea from '../InputTextArea';

global.Input = require('antd').Input;

describe('<InputTextArea />', () => {
  const tree = props =>
    renderer
      .create(
        <MemoryRouter>
          <InputTextArea
            {...props}
            input={{ name: 'field', value: ' Sample Text ' }}
            meta={{ touched: false, error: null }}
          />
        </MemoryRouter>
      )
      .toJSON();

  const component = renderer.create(
    <InputTextArea
      input={{
        onBlur: jest.fn(),
        value: ' Sample Text '
      }}
      meta={{ touched: false, error: null }}
    />
  );

  const instant = component.getInstance();

  it('testing functionality of handleBlur method', () => {
    const value = get(instant, 'props.input.value', '');
    console.log('char', value.length);
    console.log('value', value);

    expect(value).toEqual(' Sample Text ');
    instant.handleBlur({ target: { value: String(value) } });

    // component.update(
    //   <InputTextArea
    //     input={{ name: 'field', value: 'Sample Text' }}
    //     meta={{ touched: false, error: null }}
    //   />
    // );

    console.log('char', value.length);
    console.log('instant', instant);

    expect(get(instant, 'props.input.value', '')).toEqual('Sample Text');
  });

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
