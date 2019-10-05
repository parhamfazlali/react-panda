import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { get } from 'lodash';
import InputTextArea from '../InputTextArea';

global.Input = require('antd').Input;

describe('<InputTextArea />', () => {
  const defaultProps = {
    input: { name: 'field' },
    label: 'field',
    meta: { touched: false, error: null }
  };
  const BaseFieldLayout = props => (
    <InputTextArea {...defaultProps} {...props} />
  );
  // 1) snapshot
  it('take snapshot of <InputTextArea />', () => {
    const BaseFieldLayoutComponent = renderer
      .create(<BaseFieldLayout />)
      .toJSON();
    expect(BaseFieldLayoutComponent).toMatchSnapshot();
  });

  // 2) testing props
  it('check  className props', () => {
    const props = {
      className: 'class',
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    expect(
      BaseFieldLayoutComponent.find('.textarea').hasClass('class')
    ).toBeTruthy();

    expect(
      BaseFieldLayoutComponent.find('span').hasClass('labelText')
    ).toBeTruthy();
  });

  // 3) testing event
  it('checking onBlur event component', () => {
    const props = {
      afterChange: jest.fn(),
      input: {
        value: '',
        name: 'field',
        onBlur: jest.fn(),
        onChange: value => Object.assign(props.input, { value })
      }
    };

    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    BaseFieldLayoutComponent.find('#field')
      .at(0)
      .simulate('blur', {
        target: { value: ' SomeText ' }
      });

    expect(get(props, 'input.value', '')).toBe('SomeText');
  });

  it('checking onBlur event component', () => {
    const props = {
      afterChange: jest.fn(),
      input: {
        value: '',
        name: 'field',
        onBlur: jest.fn(),
        onChange: value => Object.assign(props.input, { value })
      }
    };

    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    BaseFieldLayoutComponent.find('#field')
      .at(0)
      .simulate('blur', {
        target: { value: ' SomeText ' }
      });

    expect(get(props, 'input.value', '')).toBe('SomeText');
  });

  it('checking onBlur event component without afterChange', () => {
    const props = {
      input: {
        value: '',
        name: 'field',
        onBlur: jest.fn(),
        onChange: value => Object.assign(props.input, { value })
      }
    };

    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    BaseFieldLayoutComponent.find('#field')
      .at(0)
      .simulate('blur', {
        target: { value: ' SomeText ' }
      });

    expect(get(props, 'input.value', '')).toBe('SomeText');
  });
  it('checking onChange event component', () => {
    const props = {
      afterChange: jest.fn(),
      input: {
        value: '',
        name: 'field',
        onBlur: jest.fn(),
        onChange: value => Object.assign(props.input, { value })
      }
    };

    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    BaseFieldLayoutComponent.find('#field')
      .at(0)
      .simulate('change', {
        target: { value: 'SomeText' }
      });

    expect(get(props, 'input.value.target.value', '')).toBe('SomeText');
  });
  it('checking onChange event component without afterChange props', () => {
    const props = {
      input: {
        value: '',
        name: 'field',
        onBlur: jest.fn(),
        onChange: value => Object.assign(props.input, { value })
      }
    };

    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    BaseFieldLayoutComponent.find('#field')
      .at(0)
      .simulate('change', {
        target: { value: 'SomeText' }
      });

    expect(get(props, 'input.value.target.value', '')).toBe('SomeText');
  });

  // 4) test condition
  it('testing error of component', () => {
    const props = {
      input: { name: 'field' },
      meta: { touched: true, error: 'Required' }
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);

    expect(
      BaseFieldLayoutComponent.find('div')
        .at(1)
        .hasClass('hasError')
    ).toBeTruthy();

    expect(
      BaseFieldLayoutComponent.find('span')
        .at(1)
        .text()
    ).toEqual('Required');
  });

  it('checking Labeled component', () => {
    const props = {
      input: { name: 'field' },
      label: 'Field'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(BaseFieldLayoutComponent.find('span').text()).toEqual('Field');
  });

  // 5) checking Props types
  it('checking props types', () => {
    const props = {
      className: 'hasClass',
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(BaseFieldLayoutComponent.prop('className')).toBeString();
    expect(BaseFieldLayoutComponent.prop('label')).toBeString();
  });
});
