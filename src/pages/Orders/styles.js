import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  header {
    margin-bottom: 34px;
  }

  header + div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      padding: 0px 16px;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      background: #7f40e7;
      transition: background 300ms;
      border-radius: 4px;
      text-transform: uppercase;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 36px;

      svg {
        margin-right: 4px;
      }

      &:hover {
        background: ${darken(0.2, '#7D40e7')};
      }
    }
  }
`;

export const DeliverymenImg = styled.td`
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  height: auto !important
`
export const LetterAvatar = styled.span`
  background: ${(props) => props.color};
  color: ${(props) => darken(0.3, props.color)};
  width: 36px;
  heigth: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
`

export const OrderStatus = styled.span`
  background: ${(props) => props.color};
  color: ${(props) => darken(0.4, props.color)};
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 6px;
    background: ${(props) => darken(0.4, props.color)};
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