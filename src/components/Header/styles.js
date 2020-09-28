// https://stackoverflow.com/questions/43264679/how-to-change-css-when-the-screen-size-changes
// to make css change when reduce screen happen

// Need to use dispatch function to logout!!
import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 6px 30px;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 32px;

  nav {
    display: flex;
    flex-wrap: wrap;
    width: 75vw;

    img {
      padding-right: 20px;
      width: auto;
      height: 26px;
      /* height and width are used to define the size of the logo */
      border-right: 1px solid #ddd;
    }
  }
`;

export const NavBar = styled.div`
  padding-left: 25px;
  height: 32px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  a {
    margin-right: 20px;
    font-size: 1.2em;
    font-weight: bold;
    color: #999;

    &.active {
      color: #444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;

  strong {
    text-align: right;
    color: #666666;
    margin-bottom: 5px;
  }

  a {
    color: #de3b3b;
    align-self: flex-end;


  }
`;

export const Button = styled.button`
  color: #de3b3b;
  background-color: #fff;
  border: none;
  align-self: flex-end;
  font-size: 16px;

  &:hover {
    color: ${darken(0.15, '#de3b3b')};
  }

`
