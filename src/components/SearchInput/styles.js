import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 50%;

  div {
    height: 36px;
  }

  .icon {
    position: relative;
    right: 28px;
    font-size: 18px;
  }

  input {
    width: 55%;
    height: 100%;
    border: 0;
    border-radius: 4px;
    padding: 15px;

    &:hover {
      background: ${darken(0.09, '#fff')};
    }
  }
  input::placeholder {
    color: #333;
  }
`;
