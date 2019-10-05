import React from 'react';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  activeLabel: string,
  afterChange: Function,
  checked: boolean,
  className: string,
  id: string,
  input: Object,
  label: string,
  meta: Object
} & FormProps;

export default function(props: Props) {
  const {
    input,
    id,
    className,
    label,
    activeLabel,
    checked,
    meta: { touched, error },
    afterChange,
    ...rest
  } = props;

  function handleChange(event: any) {
    input.onChange(event.target.checked);
    if (afterChange) {
      afterChange(event.target.checked);
    }
  }

  return (
    <StyleWrapper>
      <div className={`c-input checkbox ${className || ''}`}>
        <label className="checkbox--label" htmlFor={input.name}>
          <input
            className="checkbox--input"
            {...input}
            id={id || input.name}
            type="checkbox"
            checked={checked === undefined ? input.value : checked}
            onChange={handleChange}
            {...rest}
          />

          <div className="checkbox--square checkbox--check-section checkbox--select" />

          <span className="checkbox--label--text">
            {activeLabel && input.value ? activeLabel : label}
          </span>
        </label>

        {error && touched && (
          <div className="text-danger">
            <span className="text-danger--text">{error}</span>
          </div>
        )}
      </div>
    </StyleWrapper>
  );
}
