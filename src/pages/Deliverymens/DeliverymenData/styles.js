import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.tr`
  height: 44px;
  background-color: #fff;
`;

export const LastItem = styled.span`
  display: flex;
  justify-content: center;
`;

export const OptionsContainer = styled.span`
  position: relative;
`;

export const Badge = styled.button`
  padding: 14px 28px;
  background: none;
  border: 0;
  position: relative;
  align-content: center;

  &:hover {
    background: ${darken(0.1, '#fff')};
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
`;

export const OptionsList = styled.span`
  position: absolute;
  z-index: 100;
  width: 150px;
  left: calc(50% - 73px);
  top: 100%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  &::before {
    content: '▲';
    position: absolute;
    left: 71px;
    top: -13px;
    width: 0;
    height: 0;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.25);
  }
`;

export const Option = styled.span`
  display: flex;
  align-content: center;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 1px solid #eeeeee;

  svg {
    margin-bottom: 6px;
    margin-top: 6px;
  }

  p {
    font-size: 16px;
    margin-left: 14px;
    font-weight: lighter;
    color: #999999;
    margin-bottom: 6px;
    margin-top: 6px;
  }
`;

export const LastOption = styled.span`
  display: flex;
  align-content: center;
  margin-right: 10px;
  margin-left: 10px;

  svg {
    margin-bottom: 6px;
    margin-top: 6px;
  }

  p {
    font-size: 16px;
    margin-left: 14px;
    font-weight: lighter;
    color: #999999;
    margin-bottom: 6px;
    margin-top: 6px;
  }
`;
