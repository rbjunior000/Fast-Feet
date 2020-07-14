import { darken } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-180deg, #9b07fb, #9b07fb);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  height: 370px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 0;
  border-radius: 4px;

  p {
    display: flex;
    padding-bottom: 10px;
    font-family: sans-serif;
    font-size: 12px;
  }

  img {
    width: 230px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  input {
    background: #fff;
    border: 1px solid gray;
    border-radius: 4px;
    margin: 0 0 10px;
    height: 44px;
    width: 280px;
    padding: 0 15px;
    color: black;

    &::placeholder {
      color: black;
    }
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #9b07fb;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    transition: background 0.2;
    &:hover {
      background: ${darken(0.2, '#9B07FB')};
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
