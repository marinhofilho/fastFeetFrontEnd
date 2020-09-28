
import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;

  > button {
    border: 0;
    background: none;

    svg {
      color: #c6c6c6;
      transition: color 200ms;
    }
    &:hover {
      svg {
        color: ${darken(0.3, '#C6C6C6')};
      }
    }
  }
`;

export const ActionList = styled.div`
  position: absolute;
  z-index: 2;
  min-width: 150px;
  width: auto;
  left: calc(50% - 75px);
  top: calc(100% + 5px);
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  &::before {
    content: '▲';
    position: absolute;
    left: calc(50% - 5px);
    top: -10px;
    width: 10px;
    height: 10px;
    font-size: 10px;
    color: #fff;
    text-shadow: 1px -1px 0 rgba(0, 0, 0, 0.25);
  }

  button {
    display: flex;
    font-size: 16px;
    align-items: center;
    padding: 6px 0;
    text-decoration: none;
    border: 0;
    background: none;
    width: 100%;
    color: #444444;
    border-radius: 4px;
    
  svg {
    margin-right: 8px;
  }

  &:hover {
    font-weight: bold;
  }

  & + button {
    border-top: 1px solid #e6e6e6;
  }
}

`
