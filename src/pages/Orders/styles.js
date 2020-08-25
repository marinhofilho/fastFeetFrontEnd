import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

export const InitialContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  strong {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 80px;
  }

  aside {
    display: flex;
    justify-content: space-between;
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

export const Title = styled.div``;

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
