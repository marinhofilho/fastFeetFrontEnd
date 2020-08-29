/*
change: make header light up with selected option - navlink
see if https://github.com/LucasSiqz/FastFeet-Web/blob/master/src/pages/Orders/OrderItem/index.js header is collapsing
*/

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, NavBar, Profile } from './styles';

export default function Header() {
  const userName = useSelector((state) => state.user.profile.name);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavBar>
            <NavLink to="/orders">PEDIDOS</NavLink>
            <NavLink to="/deliverymen">ENTREGADORES</NavLink>
            <NavLink to="/recipient">DESTINATÁRIOS</NavLink>
            <NavLink to="/problems">PROBLEMAS</NavLink>
          </NavBar>
        </nav>
        <Profile>
          <strong>{userName}</strong>
          <Link to="/">Sair</Link>
        </Profile>
      </Content>
    </Container>
  );
}
