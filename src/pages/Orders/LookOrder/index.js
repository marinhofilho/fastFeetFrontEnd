import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function LookOrder({ order, closeCallback }) {
  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);

    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, []);

    if(!order) return <></>;

    
    function handleCloseModal(e){
    if(e.target.id === 'modal-order-container') closeCallback();
  }

  return (
    <Container id="modal-order-container" onClick={handleCloseModal}>
      <div>
        <strong>{`Informações da encomenda: '${order.product}'`}</strong>
          {order.recipient ? (
            <>
              <h3>Endereço do destinatário</h3>
              <p>
                {order.recipient.street},{' '}
                {order.recipient.number}
              </p>
              <p>{order.recipient.addition}</p>
              <p>
                {order.recipient.city} -{' '}
                {order.recipient.state}
              </p>
              <p>{order.recipient.cep}</p>
            </>
          ) : (
            <p>Não cadastrado</p>
          )}
          <hr/>
          <strong>Datas</strong>
              <h3>Cadastro</h3>
              <p>{order.status.timeCanceled || order.status.timePassed}</p>
              <h3>Retirada</h3>
              <p>{order.status.timeTakeout || order.status.timePending || 'Retirada prejudicada'}</p>
              <h3>Entrega</h3>
              <p>{order.status.timeFinished || order.status.notDone || 'Entrega prejudicada'}</p>
          <hr/>
         <strong>Assinatura do recebimento</strong>
            {order.signature_id ? (
                <>
                <img src={order.signature.url} alt="assinatura"/>
              </>
            ) : (
              <p>Não encontrada</p>
            )}


      </div>
    </Container>
  )
}
LookOrder.propTypes = {
  order: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};