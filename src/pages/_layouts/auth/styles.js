import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7c44e4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;

  img {
    display: block;
    margin: 0 auto;
  }

  p {
    font-weight: bold;
    margin: 10px 0 5px;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #f66f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      height: 33px;
      padding: 0 15px;
      margin: 0 0 5px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    button {
      margin: 5px 0 0;
      height: 33px;
      font-weight: bold;
      color: #fff;
      background: #7c44e4;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7c44e4')};
      }
    }
  }
`;
