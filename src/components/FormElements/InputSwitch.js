import React from 'react';
import { Switch } from 'antd';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  checked: boolean,
  label: string,
  afterChange?: () => void
} & FormProps;

export default function(props: Props) {
  const {
    checked,
    input,
    labelClassName = 'purple-label',
    label,
    meta: { touched, error },
    afterChange,
    ...rest
  } = props;

  function onChange(...args: any) {
    input.onChange(...args);
    if (afterChange) {
      afterChange(...args);
    }
  }

  return (
    <StyleWrapper>
      <div className="c-switch">
        <label
          htmlFor={input.name}
          className={`noselect uppercase${labelClassName}`}
        >
          <span className="switch--label">{label}</span>
          <Switch
            {...input}
            {...rest}
            checked={checked === undefined ? input.value : checked}
            id={input.name}
            type="checkbox"
            onChange={onChange}
            onBlur={() => {}}
          />
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
