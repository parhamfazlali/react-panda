// @flow
import React, { PureComponent } from 'react';
import type { FormProps } from 'redux-form';
import { InputNumber } from 'antd';

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

export default class InputNumberSpinner extends PureComponent<Props> {
  handleChange = (value: Object) => {
    const { input, afterChange, min, max, step } = this.props;
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
  };

  render() {
    const {
      input,
      label,
      className = '',
      meta: { touched, error },
      readOnly = false,
      ...rest
    } = this.props;

    return (
      <div
        className={`c-input number${className} ${
          readOnly ? ' readOnly-field' : ''
        }`}
      >
        <InputNumber {...input} {...rest} onChange={this.handleChange} />
        {label && <span className="labelText">{label}</span>}
        {touched && error && (
          <div className="text-danger">
            <span className="text-danger--text">{error}</span>
          </div>
        )}
      </div>
    );
  }
}
