import React, { useEffect, useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import { Form, Button, Card } from './styles';
import { PageTitle } from '~/styles/PageTitle';
import Input from '~/components/Input';
import Select from '~/components/Select';

import api from '~/services/api';
import history from '~/services/history';

export default function OrderNew({ match }) {
  const { id } = match.params;
  /* react-router-dom passes a prop - match - in every route that is rendered.
  inside the match object there is a params object
  there we find the :id - key - that was put in the route creation */
  const [order, setOrder] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  // is used to fill the recipient(destinatário) input
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);
  // is used to fill the deliverymen(entregador) input
  // const ref = useRef(null);

  useEffect(() => {
    // is used to fill the input forms from recipient and deliverymen
    async function loadData() {
      try {
        const [recipientResponse, deliverymenResponse] = await Promise.all([
          api.get('recipients'),
          api.get('deliverymen'),
        ]);

        setRecipients(recipientResponse.data);
        setDeliverymen(deliverymenResponse.data);

        if (id) {
          const { data } = await api.get(`orders/${id}`);
          setOrder(data);

          // code below works because of models relations
          setSelectedRecipient(data.recipient);
          setSelectedDeliveryman(data.deliverymen);

          /* ref.current.setFieldValue('recipient.name', {
            value: data.recipient.id,
            label: data.recipient.name,
          })
          ref.current.setFieldValue('deliveryman.name', {
            value: data.deliverymen.id,
            label: data.deliverymen.name,
          }) */
          // code above won't place the placeholder in place
          
        }
      } catch (err) {
        history.push('/orders');
        console.tron.log(err.msg);
        toast.error('Falha ao carregar dados');
      }
    }
    loadData();
  }, [id]);



  // pre-existing data from recipients
  const recipientOptions = useMemo(() => {
    return recipients.map((recipient) => ({
      value: recipient,
      label: recipient.name,
    }));
  }, [recipients]);

  // pre-existing data from deliverymens
  const deliverymenOptions = useMemo(() => {
    return deliverymen.map((deliveryman) => ({
      value: deliveryman,
      label: deliveryman.name,
    }));
  }, [deliverymen]);

  // both recipient and deliverymen inputs only accept pre-existing data
  const handleChangeRecipient = (selectedOption) => {
    const { value } = selectedOption;
    setSelectedRecipient(value);
    
  };

  const handleChangeDeliveryman = (selectedOption) => {
    const { value } = selectedOption;
    setSelectedDeliveryman(value);
  };

  function handleGoBack() {
    history.push('/orders');
  }

  async function handleSubmit(data) {
    if (!selectedRecipient) {
      toast.error('Selecione um destinatário');
      return
    } else if (!selectedDeliveryman) {
      toast.error('Selecione um entregador');
      return
    } else if (!data.product) {
      toast.error('Insira seu produto');
      return
    }
  
    // picks data from the inputs and make then "postable/editable" in backend
    data.recipient_id = selectedRecipient.id;
    data.deliverymen_id = selectedDeliveryman.id;

    if (id) {
      try {
        await api.put(`orders/${id}`, data);
        toast.success('Encomenda atualizada com sucesso!');
        history.push('/orders');
      } catch (err) {
        toast.error(
          'Não foi possível atualizar a encomenda. Verifique os seus dados.'
        );
      }
    } else {
      try {
        await api.post('orders', data);
        toast.success('Encomenda cadastrada com sucesso!');
        history.push('/orders');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro. Verifique os seus dados.'
        );
      }
    }
  }

  /* handle edition of unexistent order
  if (id && !order) {
    return (
      <EmptyOrder>
        <h1>Pedido não encontrado</h1>
        <br />
        <Button type="button" onClick={handleGoBack}>
          <MdKeyboardArrowLeft size={24} />
          Voltar para os pedidos
        </Button>
      </EmptyOrder>
    );
  }
  // unecessary due to error catch in loadData() */

  return (
    // form originates the data that is passed in handlesubmit
    <Form onSubmit={handleSubmit} initialData={order || undefined}>
      <header>
        <PageTitle>
          {order ? 'Edição de encomenda' : 'Cadastro de encomenda'}
        </PageTitle>
        <Button type="button" onClick={handleGoBack}>
          <MdKeyboardArrowLeft size={24} />
          Voltar
        </Button>
        <Button color="#7D40E7" type="submit">
          <MdDone size={24} />
          Salvar
        </Button>
      </header>
      <Card>
        {/* async form can also be done with react-async-form */}
        <Select
          name="recipient.name"
          label="destinatário"
          placeholder={'Selecione um destinatário'}
          options={recipientOptions}
          // when editing order there is a default value available
          defaultValue={
            order
              ? {
                  value: order.recipient ? order.recipient.id : undefined,
                  label: order.recipient ? order.recipient.name: undefined,
                }
              : undefined
          }
          onChange={handleChangeRecipient}
        />
        <Select
          name="deliveryman.name"
          label="Entregador"
          placeholder="Selecione um entregador"
          options={deliverymenOptions}
          // when editing order there is a default value available
          defaultValue={
            order
              ? {
                  value: order.deliverymen ? order.deliverymen.id : undefined,
                  label: order.deliverymen ? order.deliverymen.name: undefined,
                }
              : undefined
          }
          onChange={handleChangeDeliveryman}
        />
        <Input name="product" title="Nome do produto" placeholder="Ex: Livro" />
      </Card>
    </Form>
  );
}

// validation of passed properties
OrderNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
