import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    img {
      align-self: center;
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 1px solid #7159c1;
    }

    input {
      display: none;
    }

    div {
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 2px dashed #ddd;
      padding: 8px;

      strong {
        font-size: 10px;
        color: #ddd;
      }
    }
  }
`;
