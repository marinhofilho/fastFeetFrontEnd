import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password_hash: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password_hash }) {
    dispatch(signInRequest(email, password_hash));
  }

  return (
    <>
      <img src={logo} alt="fastFeet" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <p>e-mail</p>
        <Input name="email" type="email" placeholder="example@email.com.br" />
        <p>senha</p>
        <Input
          name="password_hash"
          type="password"
          placeholder="*************"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
      </Form>
    </>
  );
}
