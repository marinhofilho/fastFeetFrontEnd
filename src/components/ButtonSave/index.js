import React from 'react';
import { MdSend } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ButtonSave({ onClick, ...rest }) {
  return (
    <Container>
      <button type="submit" onClick={() => onClick()} {...rest}>
        <MdSend size={26} />
        <strong>Salvar</strong>
      </button>
    </Container>
  );
}

ButtonSave.propTypes = {
  onClick: PropTypes.func.isRequired,
};
