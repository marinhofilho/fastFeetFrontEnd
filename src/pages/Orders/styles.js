import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  header {
    margin-bottom: 34px;
  }

  header + div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      padding: 0px 16px;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      background: #7f40e7;
      transition: background 300ms;
      border-radius: 4px;
      text-transform: uppercase;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 36px;

      svg {
        margin-right: 4px;
      }

      &:hover {
        background: ${darken(0.2, '#7D40e7')};
      }
    }
  }
`;

export const Content = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 34px;
  }

  input {
    height: 36px;
    width: 237px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 9px 15px;
    margin-left: 5px;
  }
  .newOrder {
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    background: #7159c1;
    padding: 10px;
    color: #fff;
    transition: 0.6s;

    &:hover {
      background: ${darken(0.06, '#7d40e7')};
    }
  }
`;

export const OrdersList = styled.table`
  margin-top: 22px;
  width: 100%;
  border-spacing: 0px 20px;

  td {
    padding-left: 20px;
    color: #707070;
  }

  td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

export const OrderHeader = styled.tr`
  th {
    text-align: left;
    padding-left: 20px;
    font-size: 18px;
    color: #444;
  }
  th:last-child {
    text-align: center;
  }
`;
