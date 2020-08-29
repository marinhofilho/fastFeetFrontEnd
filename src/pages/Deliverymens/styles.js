import styled from 'styled-components';

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

export const DeliverymensList = styled.table`
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

  td:nth-child(2) {
    width: 30%;
    text-align: center;
  }

  td:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
`;
export const DeliverymenHeader = styled.tr`
  th {
    text-align: left;
    padding-left: 20px;
    font-size: 18px;
    color: #444;
  }
  th:last-child {
    text-align: center;
  }
  th:nth-child(2) {
    text-align: center;
  }
`;
