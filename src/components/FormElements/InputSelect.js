import React from 'react';
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

export default function(props: Props) {
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
  } = props;

  function handleChange(value: string) {
    const { afterChange } = props;
    input.onChange(value || null);
    if (afterChange) {
      afterChange(value);
    }
  }

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
          onChange={handleChange}
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
