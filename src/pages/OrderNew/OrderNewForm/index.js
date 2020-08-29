import React from 'react';

import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';
import RecipientInput from './RecipientInput';
import DeliverymenInput from './DeliverymenInput';
import Input from '~/components/Form/Input';

import {
  Container,
  InitialContent,
  Button,
  PageContent,
  InputContent,
} from './styles';

export default function OrderNewForm({ onSubmit, title, schema, ...rest }) {
  function handleGoBack() {
    history.push('/orders');
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} {...rest}>
        <InitialContent>
          <strong>{title}</strong>

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
          <div>
            <InputContent>
              <p>Destinatário</p>
              {/* shouldn't be doing <label for="recipient">Destinatário</label> */}
              <RecipientInput name="recipient_id" />
            </InputContent>

            <InputContent>
              <p>Entregador</p>
              <DeliverymenInput name="deliverymen_id" />
            </InputContent>
          </div>

          <footer>
            <InputContent>
              <Input
                type="text"
                placeholder="Digite o nome de seu produto"
                label="Nome do Produto"
                name="product"
              />
            </InputContent>
          </footer>
        </PageContent>
      </Form>
    </Container>
  );
}
