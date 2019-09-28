// @flow
import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

type Props = {
  button: boolean,
  options: Array<Object>,
  className: string,
  afterChange?: Function,
  label: String
} & FormProps;

export default class InputRadio extends PureComponent<Props> {
  handleChange = (value: string) => {
    const { input, afterChange } = this.props;
    input.onChange(value);
    if (afterChange) {
      afterChange(value);
    }
  };

  render() {
    const {
      button,
      className = '',
      meta: { touched, error },
      options,
      input,
      label,
      meta,
      ...rest
    } = this.props;

    return (
      <StyleWrapper>
        <div
          className={`c-input radio ${className} ${
            touched && error ? 'hasError' : ''
          }`}
        >
          {label && (
            <span className="labelText radio-input-label">{label}</span>
          )}
          <RadioGroup
            {...input}
            {...rest}
            onChange={this.handleChange}
            value={input.value || meta.initial}
          >
            {button
              ? options.map(option => (
                  <RadioButton key={option.value} value={option.value}>
                    {option.title}
                  </RadioButton>
                ))
              : options.map(option => (
                  <Radio key={option.value} value={option.value}>
                    {option.title}
                  </Radio>
                ))}
          </RadioGroup>

          {touched && error && (
            <div className="text-danger">
              <span className="text-danger--text">{error}</span>
            </div>
          )}
        </div>
      </StyleWrapper>
    );
  }
}
