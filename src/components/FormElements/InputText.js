// @flow
import React, { PureComponent } from 'react';
import { Input } from 'antd';
import type { FormProps } from 'redux-form';

type Props = {
  placeholder: string,
  disabled: boolean,
  className: string,
  label: string,
  search: boolean,
  tabIndex: string,
  type: string
} & FormProps;

export default class InputText extends PureComponent<Props> {
  handleBlur = (event: Object) => {
    const { input, type, beforeChange, afterChange } = this.props;
    input.onBlur();
    const value =
      type === 'password' ? event.target.value : event.target.value.trim();
    if (!beforeChange || beforeChange(event.target.value)) {
      input.onChange(value);
      if (afterChange) afterChange(value);
    }
  };

  handleChange = (event: Object) => {
    const { input, beforeChange, afterChange } = this.props;
    if (!beforeChange || beforeChange(event.target.value)) {
      input.onChange(event);
      if (afterChange) afterChange(event.target.value);
    }
  };

  render() {
    const {
      input,
      label,
      placeholder,
      className = '',
      meta: { touched, error },
      type,
      search = false,
      disabled = false,
      beforeChange,
      afterChange,
      ...rest
    } = this.props;

    const InputComponent = search ? Input.Search : Input;

    return (
      <div
        className={`c-input text ${className} ${
          touched && error ? ' hasError' : ''
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
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </label>
        {touched && error && (
          <div className="text-danger">
            <span className="text-danger--text">{error}</span>
          </div>
        )}
      </div>
    );
  }
}
