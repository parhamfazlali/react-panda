import styled from 'styled-components';

export default styled.div`
  padding: 0 15px;

  h4 {
    font-weight: bold;
  }

  .ant-table-wrapper {
    width: 70%;
    margin: 60px auto;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 50px 0;
    border-radius: 10px;
    overflow: hidden;

    .ant-pagination {
      padding: 15px 30px;
    }
  }

  .text-right {
    text-align: right;
  }

  .ant-table-thead > tr > th {
    padding: 30px 16px;
    font-size: 15px;
    text-transform: uppercase;
    background-color: #fff;
  }

  .add-user {
    position: absolute;
    top: 30px;
    right: 30px;
  }

  .sections-header {
    text-align: left;
    width: 70%;
    margin: auto;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    position: relative;
    padding-left: 20px;
    color: #53535a;

    &::before {
      content: '';
      width: 7px;
      height: 33px;
      background-color: #1890ff;
      position: absolute;
      top: -2px;
      left: 0;
      border-radius: 40px;
    }

    &::after {
      content: '';
      width: 84%;
      height: 1px;
      background-color: #c9cfdb;
      position: absolute;
      top: 13px;
      right: 0;
    }
  }
`;
