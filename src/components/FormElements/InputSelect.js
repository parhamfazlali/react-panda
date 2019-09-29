// @flow
import React, { PureComponent } from 'react';
import { Select } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  placeholder: String,
  options: Array<Object>,
  afterChange?: Function,
  optionGroup: Array<Object>,
  label: String,
  defaultValue: String
} & FormProps;

export default class InputSelect extends PureComponent<Props> {
  handleChange = (value: string) => {
    const { input, afterChange } = this.props;
    input.onChange(value || null);
    if (afterChange) {
      afterChange(value);
    }
  };

  render() {
    const {
      options,
      placeholder,
      input,
      optionGroup,
      label,
      meta: { initial, error, touched },
      className = '',
      disabled,
      ...rest
    } = this.props;

    return (
      <StyleWrapper>
        <div
          className={`c-input select ${className} ${
            touched && error ? ' hasError' : ''
          } ${input.value ? ' hasValue' : ''}`}
        >
          {label && (
            <span
              className={`labelText select-input-label ${className} ${
                touched && error ? ' hasError' : ''
              }`}
            >
              {label}
            </span>
          )}

          <Select
            {...input}
            {...rest}
            className={`${className} ${touched && error ? ' hasError' : ''}`}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.handleChange}
            value={input.value || initial}
            getPopupContainer={trigger => trigger.parentNode}
          >
            {options &&
              options.map(option => (
                <Select.Option
                  disabled={disabled}
                  key={option.key ? String(option.key) : option.id}
                >
                  {option.label ? option.label : option.name}
                </Select.Option>
              ))}
          </Select>

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
