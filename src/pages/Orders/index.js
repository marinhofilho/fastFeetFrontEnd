import React, { useState, useEffect } from 'react';

import history from '~/services/history';
import api from '~/services/api';

import OrderItem from './OrderItem';
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import AddButton from '~/components/AddButton';

import { Container, InitialContent, OrdersList, OrderHeader } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);

      const response = await api.get('orders');
      const { data } = response;

      setOrders(data);

      setLoading(false);
    }
    loadOrders();
  }, []);

  async function updateOrders() {
    setLoading(true);

    const response = await api.get('orders');
    const { data } = response;

    setOrders(data);
    setLoading(false);
    console.tron.log(data);
  }

  async function onChange(event) {
    const response = await api.get(
      `orders?searchproduct=${event.target.value}`
    );

    const { data } = response;

    setOrders(data);
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitialContent>
            <strong>Gerenciando Encomendas</strong>
            <aside>
              <SearchInput onChange={onChange} placeholder="encomenda" />
              <AddButton onClick={() => history.push('/orders/new')} />
            </aside>
          </InitialContent>
          <OrdersList>
            <thead>
              <OrderHeader>
                <th>ID</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </OrderHeader>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderItem
                  key={order.id}
                  order={order}
                  updateOrders={updateOrders}
                />
              ))}
            </tbody>
          </OrdersList>
        </>
      )}
    </Container>
  );
}
