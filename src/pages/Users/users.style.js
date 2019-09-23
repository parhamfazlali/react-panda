import styled from 'styled-components';

export default styled.div`
  padding: 0 15px;

  h4 {
    font-weight: bold;
  }

  .ant-table-wrapper {
    width: 70%;
    margin: 60px auto;
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
    font-size: 14px;
    text-transform: uppercase;
    background-color: #fff;
  }
`;
