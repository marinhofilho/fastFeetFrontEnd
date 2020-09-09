import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 112px;
    background: #7159c1;
    border: 0;
    color: #fff;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }

    svg {
      margin-right: 5px;
    }

    strong {
      color: #fff;
      font-size: 14px;
      margin: 0 10px 0 0;
    }
  }
`;
