import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import type { FormProps } from 'redux-form';

import StyleWrapper from './input.style';

type Props = {
  label: string,
  dateFormat: string,
  afterChange?: (date: string) => void,
  input: any
} & FormProps;

export default function(props: Props) {
  const {
    dateFormat,
    input,
    label,
    meta: { touched, error },
    ...rest
  } = props;

  function onChange(_: any, date: any) {
    const { afterChange } = props;
    input.onChange(date);
    if (afterChange) {
      afterChange(date);
    }
  }

  const value = input.value ? moment(input.value, dateFormat) : null;
  return (
    <StyleWrapper>
      <div className="c-input datepicker">
        {label && <span className="labelText"> {label} </span>}
        <DatePicker
          {...input}
          {...rest}
          onChange={onChange}
          value={value}
          format={dateFormat}
          getPopupContainer={trigger => trigger.parentNode}
        />
        {touched && error && <span className="text-danger--text">{error}</span>}
      </div>
    </StyleWrapper>
  );
}
