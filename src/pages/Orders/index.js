// search input makes avatar letter crash

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';
import Actions from '~/components/Actions'
import LookOrder from './LookOrder'

import { PageTitle } from '~/styles/PageTitle';
import { orderStatus } from '~/styles/colors';

import {
  Container,
  DeliverymenImg,
  Avatar,
  LetterAvatar,
  OrderStatus,
  Button,
} from './styles';

import { createLetterAvatar } from '~/util/letterAvatar';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [looking, setLooking] = useState(null);
  const [loading, setLoading] = useState(false);

  /* useCallBack receives a callback and an array as arguments
    returns a version of the callback that only changes if one of
    the entries is modified
    https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback */
  const parserOrders = useCallback((data) => {
    function takeOutDate(dt) {
      if (dt === null) {
        return '';
      }
      const timeElapsed = formatDistanceToNow(parseISO(dt), {
        locale: ptBR,
      });
      return timeElapsed;
    }

    return data.map((order, index) => {
      // possible change for a 'for...in' loop?
    
      order.idText = order.id > 9 ? `#${order.id}` : `#0${order.id}`

      if (order.deliverymen) {
        order.deliverymen.letterAvatar = createLetterAvatar(order.deliverymen.name, index)
      }


    if (order.canceled_at) {
        order.status = {
          color: orderStatus.canceled,
          text: 'CANCELADA',
          timeCanceled: `Produto cancelado há ${takeOutDate(order.canceled_at)} - ${format(
            parseISO(order.canceled_at),
            'dd/MM/yyyy'
          )}.`
        };
      }
      else if (order.start_date && !order.end_date) {
        order.status = {
          color: orderStatus.takeout,
          text: 'RETIRADA',
          timePassed: `Produto cadastrado há ${takeOutDate(order.created_at)} - ${format(
            parseISO(order.created_at),
            'dd/MM/yyyy'
          )}`,
          timeTakeout: `Produto retirado há ${takeOutDate(order.start_date)} - ${format(
            parseISO(order.start_date),
            'dd/MM/yyyy'
          )}`,
          notDone: 'Em processamento.',
        };
      }
      else if (order.end_date) {
        order.status = {
          color: orderStatus.delivered,
          text: 'ENTREGUE',
          timePassed: `Produto cadastrado há ${takeOutDate(order.created_at)} - ${format(
            parseISO(order.created_at),
            'dd/MM/yyyy'
          )}`,
          timeTakeout: `Produto retirado há ${takeOutDate(order.start_date)} - ${format(
            parseISO(order.start_date),
            'dd/MM/yyyy'
          )}`,
          timeFinished: `Produto entregue há  ${takeOutDate(order.end_date)} - ${format(parseISO(order.end_date), 'dd/MM/yyyy')}.`
        };
      }               
      else {
        order.status = {
          color: orderStatus.pending,
          text: 'PENDENTE',
          timePassed: `Produto cadastrado há ${takeOutDate(order.created_at)} - ${format(
            parseISO(order.created_at),
            'dd/MM/yyyy'
          )}`,
          timePending: 'Produto ainda não retirado.',
          notDone: 'Produto ainda não retirado.'
        };
      }
      return order;
    });
  }, []);
  // empty array in the end means it will be executed only one time

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);

      const response = await api.get('orders');
      const data = parserOrders(response.data);

      setOrders(data);
      setLoading(false);
    }

    loadOrders();
  }, [parserOrders]);
  // it only executes when parserOrders is executed/changed
  // empty array in the end means it will be executed only one time
  // without the array it is always executed

  async function updateOrders() {
    setLoading(true);

    const response = await api.get('orders');
    const data = parserOrders(response.data);

    setOrders(data);
    setLoading(false);
  }
  // probably violating DRY

  async function onChange(event) {
    const response = await api.get(
      `orders?searchproduct=${event.target.value}`
    );

    const data = parserOrders(response.data);
    
    setOrders(data);
  }

  const handleLook = useCallback((order) => {
    setLooking(order);
  }, []);

  async function handleDelete(order) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que quer deletar este pedido?'
    );
    // ok returns true (1)
    // cancel return false (0)

    if (!confirm) return

    try {
      await api.delete(`orders/${order.id}`);
      updateOrders();
      toast.success(`Encomenda '${order.idText}' do produto '${order.product}' foi excluída com sucesso`);
    } catch (err) {
      toast.error('Erro ao excluir encomenda.');
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <PageTitle>Gerenciamento de pedidos</PageTitle>
          </header>
          <div>
            <SearchInput onChange={onChange} placeholder="encomenda" />
            <Link to="/orders/new">
              <MdAdd color="#FFFFFF" size={36} />
              Cadastrar
            </Link>
          </div>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Entregador</th>
                <th>Destinatário</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ deliverymen, status, ...order }) => (
                /* deliverymen shows despite not having express mention in a
                function above. Probably because of models relations */
                <tr key={order.id}>
                  <td>{order.idText}</td>
                    {deliverymen ?
                      <DeliverymenImg>
                        {deliverymen && (
                          <>
                          {deliverymen.avatar ? (
                            <Avatar src={deliverymen.avatar.url} />
                          ) : (
                            <LetterAvatar color={deliverymen?.letterAvatar.color}>
                              {deliverymen?.letterAvatar.letters}
                            </LetterAvatar>
                          )}
                          {deliverymen.name}
                          </>
                        )}
                        </DeliverymenImg> : (
                          <td>Não cadastrado</td>
                        )
                    }
                  {/* order.recipient && order.recipient.name*/}
                  {order.recipient?.name ? (
                    <td>{order.recipient.name}</td>
                  ) : (
                    <td>Não cadastrado</td>
                  )}
                  {/* <td>{order.deliverymen.name}</td>
                  this one breaks if the deliverymen is deleted.
                  the working version needs to check if there is a deliverymen first
                  'order.deliverymen' and not just the value it searches (in the example 'name')
                   */}
                  {/* order.recipient && order.recipient.city*/}
                  {order.recipient?.city ? (
                    <td>{order.recipient.city}</td>
                  ) : (
                    <td>Não cadastrada</td>
                  )}
                  {order.recipient?.state ? (
                    <td>{order.recipient.state}</td>
                  ) : (
                    <td>Não cadastrado</td>
                  )}
                  <td>
                    <OrderStatus color={status.color}>
                      {status.text}
                    </OrderStatus>
                  </td>
                  <td>
                    <Actions>
                            <Button
                              onClick={() => {
                                handleLook({ ...order, status });
                              }}
                            >
                              <MdRemoveRedEye color="#8E5BE8" size={24} />
                              <p>Visualizar</p>
                            </Button>
                            <Button
                              onClick={() => {
                                history.push(`/orders/edit/${order.id}`);
                              }}
                            >
                              <MdEdit color="#4D85EE" size={24} />
                              <p>Editar</p>
                            </Button>
                            <Button
                              onClick={() => {
                                handleDelete(order);
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
          {looking && (
            <LookOrder
            order={looking}
            closeCallback={() => setLooking(null)}
          />
          )}
        </>
      )}
    </Container>
  );
}
