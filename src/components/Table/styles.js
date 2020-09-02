import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 21px;
  /* first is left-right second is up-down */
  max-width: 100%;
  /* is it necessary? */

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 5px;
    object-fit: cover;
  }
  thead th {
    color: #444444;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding: 20px;
    padding-bottom: 0px;
    &:last-child {
      text-align: center;
    }
  }
  tbody {
    tr {
      background: #fff;
      border-radius: 4px;

      td {
        padding: 12px 20px;
        color: #666666;
        font-size: 16px;
        height: 35px;
        &:last-child {
          text-align: center;
        }
      }
    }
  }
`;
