import React from 'react';

import { Form } from '@unform/web';

import ButtonBack from '~/components/ButtonBack';
import ButtonSave from '~/components/ButtonSave';
import RecipientInput from './RecipientInput';
import DeliverymenInput from './DeliverymenInput';
import Input from '~/components/Form/Input';

import { Container, InitialContent, PageContent, InputContent } from './styles';

export default function OrderNewForm({ onSubmit, title, schema, ...rest }) {
  return (
    <Container>
      <Form onSubmit={onSubmit} {...rest}>
        <InitialContent>
          <strong>{title}</strong>

          <aside>
            <ButtonBack />
            <ButtonSave />
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
