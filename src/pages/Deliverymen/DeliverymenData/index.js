import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  Container,
  LastItem,
  OptionsContainer,
  Badge,
  OptionsList,
  Option,
  Button,
  LastOption,
} from './styles';

import api from '~services/api';
import history from '~services/history';

export default function DeliverymenData({ deliverymen, updateWorkers }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir este entregador?'
    );

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`deliverymen/${deliverymen.id}`);
      updateWorkers();
      toast.success('Entregador excluído com sucesso.');
    } catch (err) {
      console.tron.log(err);
      toast.error('Erro ao excluir entregador.');
    }
  }

  return (
    <Container>
      <td>#{deliverymen.id}</td>
      <td>{deliverymen.avatar_id}</td>
      <td>{deliverymen.name}</td>
      <td>{deliverymen.email}</td>
      <LastItem>
        <OptionsContainer>
          <Badge onClick={handleToggleVisible}>
            <MdMoreHoriz color="#333" size={25} />
          </Badge>
          <OptionsList visible={visible}>
            <Option>
              <Button
                onClick={() => {
                  history.push(`/deliverymen/edit/${deliverymen.id}`);
                }}
              >
                <MdEdit color="#4D85EE" size={16} />
                <p>Editar</p>
              </Button>
            </Option>
            <LastOption>
              <Button
                onClick={() => {
                  handleToggleVisible();
                  handleDelete();
                }}
              >
                <MdDeleteForever color="#DE3B3B" size={16} />
                <p>Excluir</p>
              </Button>
            </LastOption>
          </OptionsList>
        </OptionsContainer>
      </LastItem>
    </Container>
  );
}
