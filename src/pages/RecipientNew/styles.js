import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  width: 70%;
  margin: auto;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const Form = styled.form``;

export const Button = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  width: 112px;
  background: #7159c1;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.06, '#7159c1')};
  }

  svg {
    margin-right: 5px;
    margin-left: 8px;
  }

  strong {
    color: #fff;
    font-size: 14px;
    margin: 0 10px 0 0;
  }
`;

export const InitialContent = styled.div`
  display: flex;
  margin-top: 5%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  strong {
    display: flex;
    flex: 3;
    font-size: 24px;
  }

  aside {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
`;

/* export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px auto 0 auto;
  background: #fff;
  padding: 3% 2%;
  border-radius: 4px;

  input {
    margin-left: 1%;
    width: 96%;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    cursor: text;
    min-height: 38px;
    padding: 2px 8px;
  }

  label {
    margin-top: 3%;
    margin-bottom: 1%;
    padding-left: 1%;
    font-weight: bold;
  }
`; */

export const PageContent = styled.div`
  margin-top: 30px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 30px 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    padding-left: 8px;
    padding-right: 8px;
  }
  div:nth-child(1) {
    width: 100%;
    min-width: 300px;
  }
  div:nth-child(2) {
    width: 60%;
    min-width: 300px;
  }
  div:nth-child(3),
  div:nth-child(4) {
    width: 20%;
    min-width: 150px;
  }
  div:nth-child(5),
  div:nth-child(6),
  div:nth-child(7) {
    width: calc(100% / 3);
    min-width: 150px;
  }
  label {
    font-weight: bold;
  }
`;
