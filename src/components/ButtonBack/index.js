import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { Container } from './styles';

import history from '~/services/history';

export default function ButtonBack({ ...rest }) {
  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
        {...rest}
      >
        <MdChevronLeft size={32} />
        <strong>Voltar</strong>
      </button>
    </Container>
  );
}
