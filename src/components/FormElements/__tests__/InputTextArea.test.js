import React from 'react';
import { mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { get } from 'lodash';
import SampleForm from '../SampleForm';

global.Input = require('antd').Input;

describe('<SampleForm /> on InputTextArea', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    wrapper = mount(
      <Provider store={store}>
        <SampleForm id="formelement" />
      </Provider>
    );
  });

  afterEach(() => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Test InputTextArea with isFill validation error', () => {
    const InputTextArea = wrapper.find('InputTextArea').instance();
    const input = wrapper.find('#bio');
    input.at(0).simulate('blur', { target: { value: '' } });
    expect(get(InputTextArea, 'props.meta.error', false)).toBe('Required');
    expect(get(InputTextArea, 'props.meta.touched', false)).toBeTruthy();
  });

  it('Test InputTextArea in change without afterChange props', () => {
    const input = wrapper.find('#bio');
    input.at(0).simulate('change', { target: { value: 'sample' } });
    expect(input.at(0).text()).toEqual('sample');
  });

  it('Test InputTextArea Change event with afterChange props', () => {
    const input = wrapper.find('SampleForm').instance();
    input.setState({ afterChangeState: true });
    const textArea = wrapper.find('#bio');
    textArea.at(0).simulate('change', { target: { value: 'sample' } });
    expect(textArea.at(0).text()).toEqual('sample');
  });

  it('Test InputTextArea in blur event with afterChange', () => {
    const input = wrapper.find('SampleForm').instance();
    input.setState({ afterChangeState: true });
    const textArea = wrapper.find('#bio');
    textArea.at(0).simulate('blur', { target: { value: ' Sample ' } });
    expect(textArea.at(0).text()).toEqual('Sample');
  });
  it('Test InputTextArea in blur event without afterChange', () => {
    const input = wrapper.find('SampleForm').instance();
    input.setState({ afterChangeState: false });
    const textArea = wrapper.find('#bio');
    textArea.at(0).simulate('blur', { target: { value: ' Sample ' } });
    expect(textArea.at(0).text()).toEqual('Sample');
  });
});
