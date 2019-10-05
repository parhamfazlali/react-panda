// @flow
import React from 'react';
import { InputNumber } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  disabled: boolean,
  className: string,
  label: string,
  tabIndex: string,
  type: string,
  readOnly: boolean,
  min: number | null,
  max: number | null,
  step: number | null
} & FormProps;

export default function(props: Props) {
  const {
    input,
    label,
    className = '',
    meta: { touched, error },
    readOnly = false,
    ...rest
  } = props;

  function handleChange(value: Object) {
    const { min, max, step, afterChange } = props;
    if (
      !value ||
      (typeof value === 'number' &&
        (!min || value >= min) &&
        (!max || value <= max) &&
        (!step || value % step === 0))
    ) {
      const previousValue = input.value;
      input.onChange(value);
      if (afterChange && previousValue !== value) {
        afterChange(value);
      }
    }
  }

  return (
    <StyleWrapper>
      <div
        className={`c-input number ${className} ${
          readOnly ? ' readOnly-field' : ''
        }`}
      >
        {label && <span className="labelText">{label}</span>}

        <InputNumber {...input} {...rest} onChange={handleChange} />

        {touched && error && (
          <div className="text-danger">
            <span className="text-danger--text">{error}</span>
          </div>
        )}
      </div>
    </StyleWrapper>
  );
}
