import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

import { toast } from 'react-toastify';
import Modal from 'react-modal';
import history from '~/services/history';
import api from '~/services/api';

import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import Table from '~/components/Table';

import { PageTitle } from '~/styles/PageTitle';
import { orderStatus } from '~/styles/colors';

import {
  Container,
  OrderStatus,
  LastItem,
  OptionsContainer,
  Badge,
  OptionsList,
  Option,
  Button,
  ModalContainer,
  Title,
  LastOption,
  ImageContainer,
} from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formattedDates, setFormattedDates] = useState({});

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

    return data.map((order) => {
      if (order.canceled_at)
        order.status = {
          color: orderStatus.canceled,
          text: 'CANCELADA',
        };
      else if (order.end_date)
        order.status = {
          color: orderStatus.delivered,
          text: 'ENTREGUE',
        };
      else if (order.start_date)
        order.status = {
          color: orderStatus.takeout,
          text: 'RETIRADA',
        };
      else {
        order.status = {
          color: orderStatus.pending,
          text: 'PENDENTE',
        };
      }

      const created_at = order.created_at
        ? `Pedido feito há ${takeOutDate(order.created_at)} - ${format(
            parseISO(order.created_at),
            'dd/MM/yyyy'
          )}`
        : null;

      const canceled_at = order.canceled_at
        ? `Produto cancelado há ${takeOutDate(order.canceled_at)} - ${format(
            parseISO(order.canceled_at),
            'dd/MM/yyyy'
          )}`
        : null;
      console.log(canceled_at);

      const start_date = order.start_date
        ? `Produto retirado há ${takeOutDate(order.start_date)} - ${format(
            parseISO(order.start_date),
            'dd/MM/yyyy'
          )}`
        : 'Produto não foi retirado';

      const end_date = order.end_date
        ? format(parseISO(order.end_date), 'dd/MM/yyyy')
        : 'Produto não foi entregue ';

      return order;
    });
  }, []);

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

  async function updateOrders() {
    setLoading(true);

    const response = await api.get('orders');
    const { data } = response;

    setOrders(data);
    setLoading(false);
  }

  async function onChange(event) {
    const response = await api.get(
      `orders?searchproduct=${event.target.value}`
    );

    const { data } = response;

    setOrders(data);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Você tem certeza que quer deletar este pedido?'
    );
    // ok returns true (1)
    // cancel return false (0)

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`orders/${id}`);
      updateOrders();
      toast.success('Encomenda excluída com sucesso.');
    } catch (err) {
      console.tron.log(err);
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
            <PageTitle>Gerenciando Encomendas</PageTitle>
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
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ status, ...order }) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  {order.recipient && order.recipient.name ? (
                    <td>{order.recipient.name}</td>
                  ) : (
                    <td>Não cadastrado</td>
                  )}

                  {order.deliverymen && order.deliverymen.name ? (
                    <td> {order.deliverymen.name} </td>
                  ) : (
                    <td>Não cadastrado</td>
                  )}
                  {/* <td>{order.deliverymen.name}</td>
                  this one breaks if the deliverymen is deleted.
                  the working version needs to check if there is a deliverymen first
                  'order.deliverymen' and not just the value it searches (in the example 'name')
                   */}
                  {order.recipient && order.recipient.city ? (
                    <td>{order.recipient.city}</td>
                  ) : (
                    <td>Não cadastrado</td>
                  )}
                  {order.recipient && order.recipient.state ? (
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
                                  <Title>Informações da encomenda</Title>
                                  <span>
                                    <strong>Produto: </strong>
                                    {order.product}
                                  </span>
                                  {order.recipient ? (
                                    <>
                                      <span>
                                        {order.recipient.street},{' '}
                                        {order.recipient.number}
                                      </span>
                                      <span>
                                        {order.recipient.city} -{' '}
                                        {order.recipient.state}
                                      </span>
                                      <span>{order.recipient.cep}</span>
                                    </>
                                  ) : (
                                    <span>Não cadastrado</span>
                                  )}
                                </div>
                                <aside>
                                  <Title>Datas</Title>
                                  <div>
                                    <strong>Cadastro: </strong>
                                    <span>{formattedDates.created_at}</span>
                                  </div>
                                  <div>
                                    <strong>Retirada: </strong>
                                    <span>
                                      {formattedDates.canceled_at ||
                                        formattedDates.start_date}
                                    </span>
                                  </div>
                                  <div>
                                    <strong>Entrega: </strong>
                                    <span>
                                      {formattedDates.canceled_at ||
                                        formattedDates.end_date}
                                    </span>
                                  </div>
                                </aside>
                                <Title>Assinatura do destinatário </Title>
                                <div>
                                  <ImageContainer>
                                    <br />
                                    {order.signature_id ? (
                                      <img
                                        src={order.signature.url}
                                        alt="assinatura"
                                      />
                                    ) : (
                                      <span>Não possui assinatura</span>
                                    )}
                                  </ImageContainer>
                                </div>
                              </ModalContainer>
                            </Modal>
                          </Option>
                          <Option>
                            <Button
                              onClick={() => {
                                history.push(`/orders/edit/${order.id}`);
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
                                handleDelete(order.id);
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
