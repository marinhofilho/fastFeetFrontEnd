import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Input from '~/components/Input';
import AvatarInput from './AvatarInput';
import Loading from '~/components/Loading';

import {
  Container,
  Button,
  InitialContent,
  PageContent,
  InputContent,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('É preciso cadastrar um nome'),
  avatar_id: Yup.number(),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('É preciso cadastrar um email'),
});

export default function DeliverymenNew() {
  const [loading, setLoading] = useState(false);

  function handleGoBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data) {
    try {
      console.log(`here is the${data}`);
      console.log(data);
      await api.post('deliverymen', data);
      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error(
        'Não foi possível realizar o cadastro, verifique seus dados.'
      );
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form schema={schema} onSubmit={handleSubmit}>
            <InitialContent>
              <strong>Cadastro de entregadores</strong>
              <aside>
                <Button type="button" onClick={handleGoBack}>
                  <MdKeyboardArrowLeft size={24} />
                  Voltar
                </Button>
                <Button color="#7D40E7" type="submit">
                  <MdDone size={24} />
                  Salvar
                </Button>
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
        </>
      )}
    </Container>
  );
}
