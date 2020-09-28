import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions'

import logo from '~/assets/fastfeet-logo.png';
import { Container, NavBar, Profile, Button } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.profile.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <img src={logo} alt="FastFeet" />
        <NavBar>
          <NavLink to="/orders">PEDIDOS</NavLink>
          <NavLink to="/deliverymen">ENTREGADORES</NavLink>
          <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
          <NavLink to="/problems">PROBLEMAS</NavLink>
        </NavBar>
      </nav>
      <Profile>
        <strong>{userName}</strong>
        <Button onClick={handleSignOut}>Sair</Button>
      </Profile>
    </Container>
  );
}
