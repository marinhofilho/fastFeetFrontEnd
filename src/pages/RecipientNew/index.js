import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
// import {PropTypes} from 'prop-types';

import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { PageTitle } from '~/styles/PageTitle';
import Input from '~/components/Input';
import InputMask from "react-input-mask";

import api from '~/services/api';
import history from '~/services/history';
import Loading from '~/components/Loading';

import { Container, Button, Form, Card } from './styles';

export default function RecipientNew({ match }) {
  const id = match.params.id ? decodeURIComponent(match.params.id) : null;
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {

    async function getRecipient(){
      try {
        if(id){
          setLoading(true)
          const { data} = await api.get(`recipient/${id}`);
          setLoading(false)
          setRecipient(data);
        }
      } catch (err){
        toast.error('Falha ao carregar destinatário');
        history.push('/recipients');
      }
    }
    getRecipient();
    }, [id]);
  
  function handleGoBack() {
    history.push('/recipients');
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('É preciso informar o nome do destinatário'),
    street: Yup.string().required(
      'É preciso informar o endereço do destinatário'
    ),
    number: Yup.number().typeError('É preciso informar um número').required('É preciso informar o número do endereço'),
    addition: Yup.string(),
    state: Yup.string().required('É preciso informar o Estado do destinatário'),
    city: Yup.string().required('É preciso informar a cidade do destinatário'),
    cep: Yup.string().required('Informe um CEP'),
  });

  async function handleSubmit(data) {
    if (id) {
      try {
        await api.put(`recipients/${id}`, data);
        toast.success('Destinatário alterado com sucesso!');
        history.push('/recipients');
      } catch (err) {
        toast.error(
          'Não foi possível realizar a alteração, verifique seus dados'
        );
      }
    } else {
      try {
        await api.post('recipients', data);
        toast.success('Destinatário cadastrado com sucesso!');
        history.push('/recipients');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro, verifique seus dados'
        );
      }
    }
  }
  
  /* 
  function handleCep(value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1') 
  } */

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form schema={schema} onSubmit={handleSubmit} initialData={recipient || undefined}>
            <header>
              <PageTitle>{recipient ? 'Edição de destinário' : 'Cadastro de destinatários'}</PageTitle>
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
              <Input
                type="text"
                placeholder="Ludwig van Beethoven"
                title="Nome"
                name="name"
              />
              <Input
                type="text"
                placeholder="Rua das Flores"
                title="Logradouro"
                name="street"
              />
              <Input
                type="number"
                placeholder="01234"
                title="Numero"
                name="number"
              />
              <Input
                type="text"
                placeholder="Apto 01"
                title="Complemento"
                name="addition"
              />
              <Input
                type="text"
                placeholder="Bauru"
                title="Cidade"
                name="city"
              />
              <Input
                type="text"
                placeholder="São Paulo"
                title="Estado"
                name="state"
              />
              <InputMask
                mask="99999-999"
                maskPlaceholder={recipient?.cep || null}>
                  <Input
                  type="text"
                  placeholder="12345-789"
                  title="Cep"
                  name="cep"
                  pattern="[0-9]{5}-[0-9]{3}"
              />
              </InputMask>
              
            </Card>
          </Form>
        </>
      )}
    </Container>
  );
}
