import styled from 'styled-components';

export default styled.div`
  padding: 0 15px;

  h4 {
    font-weight: bold;
  }

  ul {
    li {
      display: inline-block;
      list-style: none;
      vertical-align: middle;
      width: 150px;
      margin: 20px;

      div {
        display: inline-block;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        vertical-align: middle;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      p {
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
`;
