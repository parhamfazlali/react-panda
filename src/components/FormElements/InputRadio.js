// @flow
import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import type { FormProps } from 'redux-form';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

type Props = {
  button: boolean,
  options: Array<Object>,
  afterChange?: Function,
  label: String
} & FormProps;

export default class InputRadio extends PureComponent<Props> {
  handleChange = (value: string) => {
    const { input, afterChange } = this.props;
    input.onChange(value);
    if (afterChange) {
      afterChange(value);
    }
  };

  render() {
    const { button, options, input, label, meta, ...rest } = this.props;

    return (
      <div className="c-input">
        {label && <span className="labelText radio-input-label">{label}</span>}
        <RadioGroup
          {...input}
          {...rest}
          onChange={this.handleChange}
          value={input.value || meta.initial}
        >
          {button
            ? options.map(option => (
                <RadioButton key={option.value} value={option.value}>
                  {option.title}
                </RadioButton>
              ))
            : options.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.title}
                </Radio>
              ))}
        </RadioGroup>
      </div>
    );
  }
}
