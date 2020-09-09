import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function AddButton({ onClick }) {
  return (
    <Container>
      <button type="button" onClick={() => onClick()}>
        <MdAdd color="#fff" size={22} />
        <span>
          <strong>Cadastrar</strong>
        </span>
      </button>
    </Container>
  );
}
