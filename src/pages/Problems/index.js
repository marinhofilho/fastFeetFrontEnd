import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';

import { toast } from 'react-toastify';
import { PageTitle } from '~/styles/PageTitle'
import {
  Container,
  Button,
  NoProblems
} from './styles';

import api from '~/services/api';

import Table from '~/components/Table';
import Loading from '~/components/Loading';
import Actions from '~/components/Actions';
import LookProblem from './LookProblem';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [looking, setLooking] = useState(null);
  const [noData, setNodata] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);

      const response = await api.get('problems');
      const { data } = response;

      if(!data.length) {
        setNodata(true);
      }

      setProblems(data);

      setLoading(false);
    }
    loadProblems();
  }, []);

  async function updateProblems() {
    setLoading(true);

    const response = await api.get('problems');
    const { data } = response;

    if(!data.length) {
      setNodata(true);
    }

    setProblems(data);
    setLoading(false);
  }

  const handleLook = useCallback((problem) => {
    setLooking(problem);
  }, []);

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
          {noData ? (
            <NoProblems>
              <div>
                <h2>Sem problemas...ufa!</h2>
                <Link to="/orders">Veja os pedidos</Link>
              </div>
              </NoProblems>
          ) : (
            <>
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
                <tr key={problem.id}>
                  {problem.order?.id ? (
                    <td>{problem.order.id > 9 ? `#${problem.order.id}` : `#0${problem.order.id}`}</td>
                  ) : (
                    <td>Excluída</td>
                  )}
                  <td>{problem.description}</td>
                  <td>
                    <Actions>
                      <Button 
                              onClick={() => {
                                handleLook({ ...problem })
                              }}
                            >
                              <MdRemoveRedEye color="#8E5BE8" size={24} />
                              <p>Visualizar</p>
                            </Button>
                            <Button 
                              onClick={() => {
                                handleDelete(problem.order_id);
                              }}
                            >
                              <MdDeleteForever color="#DE3B3B" size={24} />
                              <p className="cancelP">Cancelar encomenda</p>
                            </Button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            </>
          )}

          {looking && (
            <LookProblem
              problem={looking}
              closeCallback={() => setLooking(null)}
            />
          )}
        </>
      )}
    </Container>
  );
}
