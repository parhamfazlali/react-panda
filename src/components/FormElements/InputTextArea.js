// @flow
import React, { PureComponent } from 'react';
import type { FormProps } from 'redux-form';
import { Input } from 'antd';

import StyleWrapper from './input.style';

type Props = {
  className: string,
  label: string
} & FormProps;

export default class InputTextArea extends PureComponent<Props> {
  handleBlur = (event: Object) => {
    const { input, afterChange } = this.props;
    input.onBlur();
    const value = event.target.value.trim();
    input.onChange(value);
    if (afterChange) afterChange(value);
  };

  handleChange = (event: Object) => {
    const { input, afterChange } = this.props;
    input.onChange(event);
    if (afterChange) {
      afterChange(event.target.value);
    }
  };

  render() {
    const {
      input,
      className,
      label,
      placeholder,
      meta: { touched, error },
      afterChange,
      ...reset
    } = this.props;

    return (
      <StyleWrapper>
        <div
          className={`c-input textarea ${className} ${
            touched && error ? ' hasError' : ''
          }`}
        >
          <label htmlFor={input.name}>
            {label && <span className="labelText">{label}</span>}

            <Input.TextArea
              {...input}
              {...reset}
              id={input.name}
              className="roundInput textareaInput"
              rows={5}
              style={{ width: '100%' }}
              placeholder={placeholder}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </label>
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </StyleWrapper>
    );
  }
}
