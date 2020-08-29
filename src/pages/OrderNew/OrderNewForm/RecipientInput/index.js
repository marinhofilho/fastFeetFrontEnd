// understand async select and its properties and components
// https://github.com/enrickdaltro/fastfeet/blob/master/frontend/src/components/DeliveryForm/RecipientInput/index.js

import React, { useState, useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@unform/core';

import api from '~/services/api';

export default function RecipientInput({ name, ...rest }) {
  const [recipients, setRecipients] = useState([]);

  const selectRef = useRef(null);
  const { registerField, defaultValue, fieldName } = useField(name);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('recipients', {
        params: {
          name: '',
        },
      });
      /* const response = await api.get('recipients'); */

      const data = response.data.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }

    loadData();
  }, []);

  const filterColors = (inputValue) => {
    return recipients.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <AsyncSelect
      ref={selectRef}
      cacheOptions
      defaultOptions={recipients}
      placeholder="Selecione"
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}
