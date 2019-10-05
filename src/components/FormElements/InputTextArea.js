import React from 'react';
import { Input } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  className: string,
  label: string
} & FormProps;

export default function(props: Props) {
  const {
    input,
    className,
    label,
    placeholder,
    meta: { touched, error },
    afterChange,
    ...reset
  } = props;

  function handleBlur(event: Object) {
    input.onBlur();
    const value = event.target.value.trim();
    input.onChange(value);
    if (afterChange) afterChange(value);
  }

  function handleChange(event: Object) {
    input.onChange(event);
    if (afterChange) {
      afterChange(event.target.value);
    }
  }

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
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </label>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </StyleWrapper>
  );
}
