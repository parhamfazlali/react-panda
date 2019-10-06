import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import InputSwitch from '../InputSwitch';

describe('<InputSwitch />', () => {
  const defaultProps = {
    input: { name: 'field' },
    label: 'field',
    checked: false,
    meta: { touched: false, error: null }
  };
  const BaseFieldLayout = props => <InputSwitch {...defaultProps} {...props} />;
  // 1) SnapShot
  it('Create Snapshot <InputSwitch />', () => {
    const BaseFieldLayoutComponent = renderer
      .create(<BaseFieldLayout />)
      .toJSON();
    expect(BaseFieldLayoutComponent).toMatchSnapshot();
  });
  // 2) test props checked, label, afterchange
  it('test checked props', () => {
    const props = {
      checked: true,
      input: { name: 'field' },
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(
      BaseFieldLayoutComponent.find('#field[type="checkbox"]')
        .at(0)
        .props().checked
    ).toBeTruthy();
  });
  it('test checked props', () => {
    const props = {
      checked: undefined,
      input: { name: 'field' },
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(
      BaseFieldLayoutComponent.find('#field[type="checkbox"]')
        .at(0)
        .props().checked
    ).toBeFalsy();
  });
  it('Checking label props ', () => {
    const props = {
      input: { value: '', name: 'field' },
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(BaseFieldLayoutComponent.find('.switch--label').text()).toBe(
      'label'
    );
  });
  // 3) testing event
  it('test onChange Event', () => {
    const props = {
      checked: false,
      input: {
        name: 'field',
        checked: false,
        onChange: value => Object.assign(props.input, { checked: value[0] })
      },
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    BaseFieldLayoutComponent.find('#field[type="checkbox"]')
      .at(0)
      .simulate('change', [true]);
    expect(props.input.checked).toBeTruthy();
  });
  it('test onChange Event with afterChange', () => {
    const props = {
      afterChange: jest.fn(),
      input: {
        name: 'field',
        checked: false,
        onChange: value => Object.assign(props.input, { checked: value[0] })
      },
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    BaseFieldLayoutComponent.find('#field[type="checkbox"]')
      .at(0)
      .simulate('change', [true]);

    expect(props.input.checked).toBeTruthy();
  });
  // 4) test condition
  it('Error message Handling', () => {
    const props = {
      input: { value: '', name: 'field' },
      meta: { touched: true, error: 'Required' }
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(
      BaseFieldLayoutComponent.find('.text-danger')
        .find('span')
        .text()
    ).toBe('Required');
  });
  // 5) checking Props types
  it('checking props types', () => {
    const props = {
      checked: false,
      label: 'label'
    };
    const BaseFieldLayoutComponent = mount(<BaseFieldLayout {...props} />);
    expect(BaseFieldLayoutComponent.prop('checked')).toBeBoolean();
    expect(BaseFieldLayoutComponent.prop('label')).toBeString();
  });
});
