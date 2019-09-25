import styled from 'styled-components';

export default styled.div`
  width: 420px;
  margin: 60px auto;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 50px 0;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  text-align: left;

  .c-input {
    margin-bottom: 30px;

    .labelText {
      font-size: 15px;
      color: #000;
      display: block;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .ant-select,
    .ant-calendar-picker {
      width: 100%;
    }

    .checkbox--label--text {
      font-size: 15px;
      color: #000;
      margin-bottom: 3px;
      text-transform: uppercase;
      display: inline-block;
    }

    .checkbox--square {
      display: inline-block;
      margin-left: 5px;
    }
  }

  .ant-btn {
    width: 100%;
    margin-bottom: 15px;
    height: 50px;
  }
`;
