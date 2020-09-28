// import Async from 'react-async' can also be used

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SelectComponent({
  label,
  placeholder,
  name,
  options,
  onChange,
  defaultValue,
}) {
  const customStyles = {
    control: () => ({
      display: 'flex',
      border: '1px solid #ccc',
      borderRadius: '4px',
      height: '45px',
      width: '100%',
      padding: '0 7px',
      color: '#999',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#999',
      padding: '10px',
    }),
    singleValue: (provided) => {
      const color = '#999';
      return { ...provided, color };
    },
  };


  return (
    <Container>
      <strong>{label}</strong>
      <Select
        name={name}
        styles={customStyles}
        // isSearchable={false}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={defaultValue?.label || placeholder}
      />
    </Container>
  );
}

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
