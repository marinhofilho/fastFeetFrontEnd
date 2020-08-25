import React from 'react';
import { MdSend } from 'react-icons/md';

import { Container } from './styles';

export default function ButtonSave({ ...rest }) {
  return (
    <Container>
      <button type="submit">
        <MdSend size={26} />
        <strong>Salvar</strong>
      </button>
    </Container>
  );
}
