import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Input from '~/components/Input';
import AvatarInput from './AvatarInput';
import Loading from '~/components/Loading';
import { PageTitle } from '~/styles/PageTitle';

import { Container, Form, Button, Card } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('É preciso cadastrar o nome'),
  avatar_id: Yup.number(),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('É preciso cadastrar o email'),
});

export default function DeliverymenNew({ match }) {
  const [loading, setLoading] = useState(false);
  const id = match.params.id ? decodeURIComponent(match.params.id) : null;
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get(`deliverymen/${id}`);
        setDeliverymen(data);
      } catch (err) {
        history.push('/deliverymen');
        toast.error('Não foi possível localizar este entregador');
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  function handleGoBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data) {
    if (id) {
      try {
        await api.put(`deliverymen/${id}`, data);
        toast.success('Entregador atualizado com sucesso!');
        history.push('/deliverymen');
      } catch (err) {
        toast.error(
          'Não foi possível atualizar o entregador. Confira os dados'
        );
      }
    } else {
      try {
        await api.post('deliverymen', data);
        toast.success('Entregador cadastrado com sucesso');
        history.push('/deliverymen');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro. Verifique seus dados'
        );
      }
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form
            schema={schema}
            onSubmit={handleSubmit}
            initialData={deliverymen || undefined}
          >
            <header>
              <PageTitle>
                {deliverymen
                  ? 'Edição de entregadores'
                  : 'Cadastro de Entregadores'}
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
              <AvatarInput name="avatar_id" />
              <Input title="name" placeholder="John Doe" name="name" />
              <Input
                type="email"
                title="Email"
                placeholder="example@email.com.br"
                name="email"
              />
            </Card>
          </Form>
        </>
      )}
    </Container>
  );
}
DeliverymenNew.propTypes = {
  match: PropTypes.object.isRequired,
};
