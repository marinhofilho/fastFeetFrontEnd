import React from 'react';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import OrderNewForm from '~/components/OrderNewForm';

import api from '~/services/api';
import history from '~/services/history';

export default function OrderNew() {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('É preciso informar o destinatário'),
    deliverymen_id: Yup.number().required('É preciso informar o entregador'),
    product: Yup.number().required('Produto obrigatório'),
  });

  async function handleSubmit({ recipient_id, deliverymen_id, product }) {
    try {
      await api.post('orders', {
        recipient_id,
        deliverymen_id,
        product,
      });

      toast.success('Encomenda cadastrada');
      history.push('/orders');
    } catch ({ response }) {
      console.tron.log(response);
      toast.error(`Erro ao criar encomenda ${response.data.error}`);
    }
  }

  return (
    <OrderNewForm
      title="Cadastro de Encomendas"
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}
