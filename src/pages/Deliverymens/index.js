import React, { useState, useEffect } from 'react';

import history from '~/services/history';
import api from '~/services/api';

import DeliverymenData from './DeliverymenData';
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import AddButton from '~/components/AddButton';

import {
  Container,
  InitialContent,
  DeliverymensList,
  DeliverymenHeader,
} from './styles';

export default function Deliverymens() {
  const [deliverymens, setDeliverymens] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <InitialContent>
            <strong>Gerenciando entregadores</strong>
            <aside>
              <SearchInput onChange={onChange} placeholder="entregador" />
              <AddButton onClick={() => history.push('/deliverymen/new')} />
            </aside>
          </InitialContent>
          <DeliverymensList>
            <thead>
              <DeliverymenHeader>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </DeliverymenHeader>
            </thead>
            <tbody>
              {deliverymens.map((deliverymen) => (
                <DeliverymenData
                  key={deliverymen.id}
                  deliverymen={deliverymen}
                  updateWorkers={updateWorkers}
                />
              ))}
            </tbody>
          </DeliverymensList>
        </>
      )}
    </Container>
  );
}
