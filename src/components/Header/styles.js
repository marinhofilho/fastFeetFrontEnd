import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      width: 25%;
      height: auto;
      /* height and width are used to define the size of the logo */
    }
  }
`;

export const NavBar = styled.div`
  border-left: 1px solid #ddd;
  padding-left: 25px;
  height: 32px;
  display: flex;
  align-items: center;

  a {
    margin-right: 20px;
    font-size: 15px;
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

  strong {
    text-align: right;
    color: #666666;
    margin-bottom: 5px;
  }

  a {
    color: #de3b3b;
    align-self: flex-end;

    &:hover {
      color: ${darken(0.15, '#de3b3b')};
    }
  }
`;
