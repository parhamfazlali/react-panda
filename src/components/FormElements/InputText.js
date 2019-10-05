import React from 'react';
import { Input } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  placeholder: string,
  disabled: boolean,
  className: string,
  label: string,
  search: boolean,
  tabIndex: string,
  type: string
} & FormProps;

export default function(props: Props) {
  const {
    input,
    label,
    placeholder,
    className = '',
    meta: { touched, error },
    type,
    search = false,
    disabled = false,
    ...rest
  } = props;

  const InputComponent = search ? Input.Search : Input;

  return (
    <StyleWrapper>
      <div
        className={`c-input text ${className} ${
          touched && error ? 'hasError' : ''
        }`}
      >
        <label className={`${disabled ? 'disabled' : ''}`} htmlFor={input.name}>
          {label && <span className="labelText">{label}</span>}

          <InputComponent
            {...input}
            {...rest}
            autoComplete="off"
            id={input.name}
            className={`roundInput${disabled ? ' not-allowed' : ''}`}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
          />
        </label>
        {touched && error && (
          <div className="text-danger">
            <span className="text-danger--text">{error}</span>
          </div>
        )}
      </div>
    </StyleWrapper>
  );
}
