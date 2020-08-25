import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: center;
  width: 100%;
  margin: auto;

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
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

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px auto 0 auto;
  background: #fff;
  padding: 3% 2%;
  border-radius: 4px;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

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
  }
`;
