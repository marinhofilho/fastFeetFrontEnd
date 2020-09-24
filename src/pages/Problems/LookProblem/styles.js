import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  div {
    background: #fff;
    padding: 25px;
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 4px;

    strong {
      font-size: 20px;
      margin-bottom: 10px;
      margin-top: 10px; 
      display: flex;
      justify-content: center;
    }

    p {
      margin-top: 3px;
      font-size: 16px;
    }
  }
`;
