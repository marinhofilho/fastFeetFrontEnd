import React from 'react';

import Loader from 'react-loader-spinner';
import { Container, LoadingMessage } from './styles';

export default function Loading() {
  return (
    <Container>
      <Loader
        type="BallTriangle"
        color="#00BFFF"
        height={100}
        width={100}
        margin-left={52}
      />
      <LoadingMessage>
        <h1>Carregando</h1>
      </LoadingMessage>
    </Container>
  );
}
