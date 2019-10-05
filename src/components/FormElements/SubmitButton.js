import React from 'react';
import { Button } from 'antd';

import StyleWrapper from './input.style';

type Props = {
  id: string,
  label: string,
  htmlType: string,
  className: string,
  submitting: boolean,
  onSubmit: Function
};

export default function(props: Props) {
  const {
    id,
    label,
    submitting,
    onSubmit,
    htmlType = 'submit',
    className = '',
    ...rest
  } = props;

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
