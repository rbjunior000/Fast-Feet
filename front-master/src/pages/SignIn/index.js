import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo-fastfeet.png';
import { Text } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />
      <Form onSubmit={handleSubmit}>
        <Text>
          {' '}
          <b>SEU E-MAIL</b>{' '}
        </Text>
        <Input name="email" type="email" placeholder="Digite seu email" />
        <Text>
          {' '}
          <b>SUA SENHA</b>{' '}
        </Text>
        <Input name="password" type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar no sistema</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
