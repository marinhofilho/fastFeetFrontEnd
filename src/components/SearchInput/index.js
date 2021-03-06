import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Container } from './styles';

export default function SearchInput({ onChange, placeholder, ...rest }) {
  return (
    <Container>
      <div>
      <FontAwesomeIcon icon={faSearch} className="icon" />
        <input
          type="text"
          placeholder={`Buscar ${placeholder}`}
          onChange={(event) => onChange(event)}
          {...rest}
        />
      </div>
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
