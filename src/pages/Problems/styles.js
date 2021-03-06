import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  header {
    margin-bottom: 34px;
  }

  table tbody td:nth-child(2) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 700px;
  }


`;

export const Button = styled.button`
  background: none;
  border: 0;
  position: relative;
  align-self: center;
  display: flex;
  flex: 1;

  &:hover {
    background: ${darken(0.1, '#fff')};
  }

  .cancelP {
    white-space: nowrap;
    text-align: left;   
  }
`;

export const NoProblems = styled.div`
  display: flex;
  height: 30vw;

  div {
    display: flex;
    flex-direction: column;
    margin: auto;

    h2 {
      margin-bottom: 10px;
    }

    a {
      align-self: center;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

`
