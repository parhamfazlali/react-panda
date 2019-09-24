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
      font-size: 14px;
      color: #000;
    }

    .ant-input {
      height: 50px;
    }
  }

  .ant-btn {
    width: 100%;
    margin-bottom: 15px;
    height: 50px;
  }
`;
