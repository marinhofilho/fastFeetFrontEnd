import styled from 'styled-components';
import { Form as UnForm } from '@rocketseat/unform';
/* necessary to customize the Form - https://unform.dev/recipes/styled-components/ */
import { darken } from 'polished';

export const Form = styled(UnForm)`
  max-width: 1200px;
  min-width: 500px;
  /* less width and the form deforms */
  margin: 0 auto;

  header {
    margin-bottom: 2rem;
    /* root element inherit */
    display: flex;
    flex-direction: row;
    align-items: baseline;
    button {
      &:nth-child(2) {
        margin-left: auto;
      }
      &:nth-child(3) {
        margin-left: 16px;
      }
    }
  }
`;

export const Button = styled.button.attrs((props) => ({
  color: props.color || '#CCCCCC',
}))`
  height: 36px;
  background: ${(props) => props.color};
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 20px;
  border-radius: 4px;
  border: none;
  transition: background 300ms;
  svg {
    margin-right: 6px;
  }
  &:hover {
    background: ${(props) => darken(0.2, props.color)};
  }
`;

export const Card = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 30px 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* below are the inputs styles */
  > div {
    padding-left: 8px;
    padding-right: 8px;
    &:nth-child(1),
    &:nth-child(2) {
      width: 50%;
    }
    &:last-child {
      width: 100%;
    }
  }
`;

export const EmptyOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 30vh auto;
  text-align: center;
`;
