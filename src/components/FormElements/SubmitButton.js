// @flow
import React, { PureComponent } from 'react';
import { Button } from 'antd';

import StyleWrapper from './input.style';

type Props = {
  id: string,
  label: string,
  htmlType?: string,
  className?: string,
  submitting: boolean,
  onSubmit: Function
};

export default class SubmitButton extends PureComponent<Props> {
  static defaultProps = { className: '', htmlType: 'submit' };

  render() {
    const {
      id,
      label,
      submitting,
      onSubmit,
      htmlType,
      className = '',
      ...rest
    } = this.props;
    return (
      <StyleWrapper>
        <Button
          id={id || 'submitBtn'}
          htmlType={htmlType}
          onClick={onSubmit}
          loading={submitting}
          className={`c-button ${className}`}
          {...rest}
        >
          <span className="text">{label}</span>
        </Button>
      </StyleWrapper>
    );
  }
}
