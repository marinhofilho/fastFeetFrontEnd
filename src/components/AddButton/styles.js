import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 40px;
  align-items: end;

  button {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 170px;
    height: 100%;
    border: 0;
    border-radius: 4px;
    background: #7159c1;
    margin-right: 15px;

    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }

    svg {
    }
    span {
      color: #fff;
    }
  }
`;
