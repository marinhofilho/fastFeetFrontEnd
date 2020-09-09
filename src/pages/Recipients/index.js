import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

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

import history from '~/services/history';
import api from '~/services/api';

import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import AddButton from '~/components/AddButton';

import { PageTitle } from '~/styles/PageTitle';

export default function Recipients({ recipient }) {
  const [ŕecipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadRecipients() {
      setLoading(true);

      const response = await api.get('recipients');
      const { data } = response;

      setRecipients(data);

      setLoading(false);
    }
    loadRecipients();
  }, []);

  async function updateRecipients() {
    setLoading(true);

    const response = await api.get('recipients');
    const { data } = response;

    setRecipients(data);
    setLoading(false);
    console.tron.log(data);
  }

  async function onChange(event) {
    const response = await api.get(
      `recipients?recipientName=${event.target.value}`
    );

    const { data } = response;
    setRecipients(data);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir este destinatário?'
    );
    // ok returns true (1)
    // cancel return false (0)
    if (!confirm) {
      return;
    }
    try {
      await api.delete(`recipients/${id}`);
      updateRecipients();
      toast.success('Destinatário excluído com sucesso.');
    } catch (err) {
      console.tron.log(err);
      toast.error('Erro ao excluir destinatário.');
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <PageTitle>Gerenciando Destinatários</PageTitle>
          </header>
            <div>
              <SearchInput onChange={onChange} placeholder="destinatário" />
              <Link to="/recipient/new">
              <MdAdd color="#FFFFFF" size={36} />
              Cadastrar
              </Link>            
            </div>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ŕecipients.map((recipient) => (
                <tr
                  updateRecipients={updateRecipients}
                  key={recipient.id}
                >
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    Rua {recipient.street},&#160;
                    {recipient.number},&#160;
                    {recipient.addition},&#160;
                    {recipient.state},&#160;
                    {recipient.city},&#160; CEP - {recipient.cep}
                  </td>
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
                                  `/recipient/edit/${recipient.id}`
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
                                handleDelete(recipient.id);
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
