// @flow
import React, { PureComponent } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import type { FormProps } from 'redux-form';

type Props = {
  label: string,
  timeFormat: string,
  afterChange?: (date: string) => void,
  input: any
} & FormProps;

export default class InputTime extends PureComponent<Props> {
  onChange = (_: any, time: any) => {
    const { input, afterChange } = this.props;
    input.onChange(time);
    if (afterChange) {
      afterChange(time);
    }
  };

  render() {
    const {
      timeFormat,
      input,
      label,
      meta: { touched, error },
      ...rest
    } = this.props;

    const value = input.value ? moment(input.value, timeFormat) : null;

    return (
      <div className="c-input datepicker">
        {label && <span className="labelText"> {label} </span>}
        <TimePicker
          {...input}
          {...rest}
          onChange={this.onChange}
          value={value}
          format={timeFormat}
          getPopupContainer={trigger => trigger.parentNode}
        />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    );
  }
}
