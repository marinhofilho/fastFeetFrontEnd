import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { MdMoreHoriz, MdEdit, MdDeleteForever } from 'react-icons/md';
import {
  Container,
  InitialContent,
  ListHead,
  RecipientsList,
  DataContainer,
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
import AddButton from '~/components/AddButton';

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
          <InitialContent>
            <strong>Gerenciando Destinatários</strong>
            <aside>
              <SearchInput onChange={onChange} placeholder="destinatário" />
              <AddButton onClick={() => history.push('/recipient/new')} />
            </aside>
          </InitialContent>
          <RecipientsList>
            <thead>
              <ListHead>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </ListHead>
            </thead>
            <tbody>
              {ŕecipients.map((recipient) => (
                <DataContainer
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
                                  `/recipients/edit/${recipient.id}`
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
                </DataContainer>
              ))}
            </tbody>
          </RecipientsList>
        </>
      )}
    </Container>
  );
}
