import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  label: string,
  timeFormat: string,
  afterChange?: (date: string) => void,
  input: any
} & FormProps;

export default function(props: Props) {
  const {
    timeFormat,
    input,
    label,
    meta: { touched, error },
    ...rest
  } = props;

  function onChange(_: any, time: any) {
    const { afterChange } = props;
    input.onChange(time);
    if (afterChange) {
      afterChange(time);
    }
  }

  const value = input.value ? moment(input.value, timeFormat) : null;

  return (
    <StyleWrapper>
      <div className="c-input datepicker">
        {label && <span className="labelText"> {label} </span>}
        <TimePicker
          {...input}
          {...rest}
          onChange={onChange}
          value={value}
          format={timeFormat}
          getPopupContainer={trigger => trigger.parentNode}
        />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </StyleWrapper>
  );
}
