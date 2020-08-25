import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Container } from './styles';

export default function SearchInput({ onChange, placeholder, ...rest }) {
  return (
    <Container>
      <div>
        <input
          type="text"
          placeholder={`Buscar ${placeholder}`}
          onChange={(event) => onChange(event)}
          {...rest}
        />
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </div>
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
