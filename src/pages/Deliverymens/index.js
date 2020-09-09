import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdEdit, MdDeleteForever, MdMoreHoriz } from 'react-icons/md';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import Table from '~/components/Table';
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import { PageTitle } from '~/styles/PageTitle';

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

export default function Deliverymens() {
  const [deliverymens, setDeliverymens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadWorkers() {
      setLoading(true);

      const response = await api.get('deliverymen');
      const { data } = response;

      setDeliverymens(data);

      setLoading(false);
    }
    loadWorkers();
  }, []);

  async function updateWorkers() {
    setLoading(true);

    const response = await api.get('deliverymen');
    const { data } = response;

    setDeliverymens(data);
    setLoading(false);
  }

  async function onChange(event) {
    const response = await api.get(`deliverymen?dname=${event.target.value}`);

    const { data } = response;

    setDeliverymens(data);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir este entregador?'
    );

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`deliverymen/${id}`);
      updateWorkers();
      toast.success('Entregador excluído com sucesso.');
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
            <PageTitle>Gerenciando entregadores</PageTitle>
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
                  <td>#{deliverymen.id}</td>
                  <td>{deliverymen.avatar_id}</td>
                  <td>{deliverymen.name}</td>
                  <td>{deliverymen.email}</td>
                  <td>
                    <LastItem>
                      <OptionsContainer>
                        <Badge onClick={handleToggleVisible}>
                          <MdMoreHoriz color="#333" size={25} />
                        </Badge>
                        <OptionsList visible={visible}>
                          <Option>
                            <Button
                              onClick={() => {
                                history.push(
                                  `/deliverymen/edit/${deliverymen.id}`
                                );
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
                                handleDelete(deliverymen.id);
                              }}
                            >
                              <MdDeleteForever color="#DE3B3B" size={16} />
                              <p>Excluir</p>
                            </Button>
                          </LastOption>
                        </OptionsList>
                      </OptionsContainer>
                    </LastItem>
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
