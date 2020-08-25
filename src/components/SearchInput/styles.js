import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 50%;

  div {
    height: 40px;
    margin-left: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon {
    font-size: 25px;
    margin-left: 4px;
  }

  input {
    width: 50%;
    height: 100%;
    border: 0;
    border-radius: 4px;
    text-indent: 10px;

    &:hover {
      background: ${darken(0.09, '#fff')};
    }
  }
  input::placeholder {
    color: #333;
  }
`;
