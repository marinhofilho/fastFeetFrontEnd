import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import {
  Container,
  Button,
} from './styles';


import history from '~/services/history';
import api from '~/services/api';

import Actions from '~/components/Actions'
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';

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

  async function handleDelete(recipient) {
    console.log(recipient)
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      `Você tem certeza que deseja excluir o destinatário '${recipient.name}' ?`
    );
    // ok returns true (1)
    // cancel return false (0)
    if (!confirm) {
      return;
    }
    try {
      await api.delete(`recipients/${recipient.id}`);
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
            <PageTitle>Gerenciamento de destinatários</PageTitle>
          </header>
            <div>
              <SearchInput onChange={onChange} placeholder="destinatário" />
              <Link to="/recipients/new">
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
                  <td>{recipient.id > 9 ? `#${recipient.id}` : `#0${recipient.id}`}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {`
                      ${recipient.street}, 
                      ${recipient.number}, 
                      ${recipient.addition ? recipient.addition + ',' : ''} 
                      ${recipient.state}, 
                      ${recipient.city}, 
                      CEP - ${recipient.cep}  
                    `}
                  </td>
                  <td>
                    <Actions>
                            <Button
                              onClick={() => {
                                history.push(
                                  `/recipient/edit/${recipient.id}`
                                );
                              }}
                            >
                              <MdEdit color="#4D85EE" size={24} />
                              <p>Editar</p>
                            </Button>
                            <Button
                              onClick={() => {
                                handleToggleVisible();
                                handleDelete(recipient);
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
