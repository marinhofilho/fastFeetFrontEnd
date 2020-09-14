import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import { MdMoreHoriz, MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';

import { toast } from 'react-toastify';
import { PageTitle } from '~/styles/PageTitle'
import {
  Container,
  LastItem,
  OptionsContainer,
  Badge,
  OptionsList,
  Option,
  Button,
  ModalContainer,
  Title,
  LastOption,
} from './styles';

import api from '~/services/api';

import Table from '~/components/Table';
import Loading from '~/components/Loading';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);

      const response = await api.get('problems');
      const { data } = response;

      setProblems(data);

      setLoading(false);
    }
    loadProblems();
  }, []);

  async function updateProblems() {
    setLoading(true);

    const response = await api.get('problems');
    const { data } = response;

    setProblems(data);
    setLoading(false);
    console.tron.log(data);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete(order_id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir esta encomenda?'
    );
    // ok returns true (1)
    // cancel return false (0)
    if (!confirm) {
      return;
    }
    try {
      await api.delete(`orders/${order_id}`);
      updateProblems();
      toast.success('Encomenda excluída com sucesso.');
    } catch (err) {
      console.tron.log(err);
      toast.error('Erro ao excluir encomenda.');
    }
  }

  // handleDelete needs to be elaborated to delete the order (check xd adobe)

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <PageTitle>Gerenciamento de problemas</PageTitle>
          </header>
          <Table>
            <thead>
              <tr>
                <th>Encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem) => (
                <tr updateProblems={updateProblems} key={problem.id}>
                  {problem.order && problem.order_id ? (
                    <td>#{problem.order_id}</td>
                  ) : (
                    <td>Excluída</td>
                  )}
                  <td>{problem.description}</td>
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
                                handleToggleVisible();
                                setModalOpen(true);
                              }}
                            >
                              <MdRemoveRedEye color="#8E5BE8" size={16} />
                              <p>Visualizar</p>
                            </Button>
                            <Modal
                              isOpen={modalOpen}
                              onRequestClose={() => {
                                setModalOpen(false);
                              }}
                              ariaHideApp={false}
                              shouldCloseOnOverlayClick
                              shouldCloseOnEsc
                              shouldReturnFocusAfterClose
                              style={{
                                overlay: {
                                  background: 'Rgba(0,0,0,0.4)',
                                },
                                content: {
                                  background: '#fff',
                                  width: 450,
                                  top: '50%',
                                  left: '50%',
                                  right: 'auto',
                                  bottom: 'auto',
                                  marginRight: '-50%',
                                  transform: 'translate(-50%, -50%)',
                                  // transform can be use to change position, rotation, scale and more of elements
                                },
                              }}
                            >
                              <ModalContainer>
                                <div>
                                  <Title>Problema</Title>
                                  <span>
                                    <p>{problem.description}</p>
                                  </span>
                                </div>
                              </ModalContainer>
                            </Modal>
                          </Option>
                          <LastOption>
                            <Button
                              onClick={() => {
                                handleToggleVisible();
                                handleDelete(problem.order_id);
                              }}
                            >
                              <MdDeleteForever color="#DE3B3B" size={16} />
                              <p>Cancelar encomenda</p>
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
