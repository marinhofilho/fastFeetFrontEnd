import React from 'react';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { Form } from '@unform/web';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import Input from '~/components/Form/Input';
import AvatarInput from '~/components/AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

import { Container, InitialContent, PageContent, InputContent } from './styles';

export default function DeliverymenNew() {
  const schema = Yup.object().shape({
    name: Yup.string().required('É preciso cadastrar um nome'),
    avatar_id: Yup.number(),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('É preciso cadastrar um email'),
  });

  async function handleSubmit({ name, avatar_id, email }) {
    try {
      await api.post('deliverymen', {
        name,
        avatar_id,
        email,
      });

      toast.success('Entregador cadastrado');
      history.push('/deliverymen');
    } catch ({ response }) {
      console.tron.log(response);
      toast.error(`Erro ao cadastrar entregador ${response.data.error}`);
    }
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <InitialContent>
          <strong>Cadastro de entregadores</strong>
          <aside>
            <ButtonBack />
            <ButtonSave />
          </aside>
        </InitialContent>
        <PageContent>
          <AvatarInput name="avatar_id" />
          <InputContent>
            <Input
              type="text"
              placeholder="John Doe"
              label="Nome"
              name="name"
            />
            <Input
              type="email"
              placeholder="example@email.com.br"
              label="E-mail"
              name="email"
            />
          </InputContent>
        </PageContent>
      </Form>
    </Container>
  );
}
