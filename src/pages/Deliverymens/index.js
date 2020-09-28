import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import Table from '~/components/Table';
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions'

import { PageTitle } from '~/styles/PageTitle';

import {
  Container,
  Button,
  Avatar,
  LetterAvatar
} from './styles';

import { createLetterAvatar } from '~/util/letterAvatar';


export default function Deliverymens() {
  const [deliverymens, setDeliverymens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const parserDlvmen = useCallback((data) => {
    return data.map((deliverymen, index) => {

      deliverymen.idText = deliverymen.id > 9 ? `#${deliverymen.id}` : `#0${deliverymen.id}`

      if(!deliverymen.avatar) {
        deliverymen.letterAvatar = createLetterAvatar(deliverymen.name, index)
      }

      return deliverymen
    })
  }, []);

  useEffect(() => {
    async function loadWorkers() {
      setLoading(true);

      const response = await api.get('deliverymen');
      const data = parserDlvmen(response.data);

      setDeliverymens(data);

      setLoading(false);
    }
    loadWorkers();
  }, []);

  async function updateWorkers() {
    setLoading(true);

    const response = await api.get('deliverymen');
    const data = parserDlvmen(response.data);

    setDeliverymens(data);
    setLoading(false);
  }

  async function onChange(event) {
    const response = await api.get(`deliverymen?dname=${event.target.value}`);

    const data = parserDlvmen(response.data);

    setDeliverymens(data);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete(deliverymen) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      `Você tem certeza que deseja excluir o entregador '${deliverymen.name}'?`
    );

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`deliverymen/${deliverymen.id}`);
      updateWorkers();
      toast.success(`Entregador '${deliverymen.name}' excluído com sucesso.`);
    } catch (err) {
      console.tron.log(err);
      toast.error('Erro ao excluir entregador.');
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <PageTitle>Gerenciamento de entregadores</PageTitle>
          </header>

          <div>
            <SearchInput onChange={onChange} placeholder="entregador" />
            <Link to="/deliverymen/new">
              <MdAdd color="#FFFFFF" size={36} />
              Cadastrar
            </Link>
          </div>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymens.map((deliverymen) => (
                <tr key={deliverymen.id}>
                  <td>{deliverymen.idText}</td>
                  <td id="deliverymenimg">
                  {deliverymen.avatar ? (
                    <Avatar src={deliverymen.avatar.url} />
                  ) : (
                    <LetterAvatar color={deliverymen?.letterAvatar.color}>
                      {deliverymen?.letterAvatar.letters}
                    </LetterAvatar>
                  )}
                  </td>
                  <td>{deliverymen.name}</td>
                  <td>{deliverymen.email}</td>
                  <td>
                    <Actions>
                    <Button
                              onClick={() => {
                                history.push(
                                  `/deliverymen/edit/${deliverymen.id}`
                                );
                              }}
                            >
                              <MdEdit color="#4D85EE" size={24} />
                              <p>Editar</p>
                            </Button>
                            <Button
                              onClick={() => {
                                handleToggleVisible();
                                handleDelete(deliverymen);
                              }}
                            >
                              <MdDeleteForever color="#DE3B3B" size={24} />
                              <p>Excluir</p>
                            </Button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
