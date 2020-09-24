import styled from 'styled-components';
import { Form as UnForm } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div``

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
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2) {
      width: 60%;
    }
    &:nth-child(3) {
      max-width: 15%;
    }
    &:nth-child(4) {
      width: 25%;
    }
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      width: calc(100% / 3);
    }
  }
`;
