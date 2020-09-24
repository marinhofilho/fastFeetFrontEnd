import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function LookProblem({ problem, closeCallback }) {
  
  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);

    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, [closeCallback]);

  if(!problem) return <></>;

  function handleCloseModal(e){
    if(e.target.id === 'modal-problem-container') closeCallback();
  }


  return (
    <Container id="modal-problem-container" onClick={handleCloseModal}>
      <div>
        <strong>{`Informações do problema`}</strong>
        <p>{problem.description}</p>
      </div>
    </Container>
  )
}

LookProblem.propTypes = {
  problem: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};