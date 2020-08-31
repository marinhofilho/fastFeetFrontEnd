import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';
import { Container, NavBar, Profile } from './styles';

export default function Header() {
  const userName = useSelector((state) => state.user.profile.name);

  return (
    <Container>
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
    </Container>
  );
}
