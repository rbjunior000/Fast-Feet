import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Container, Content, Teste } from './styles';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const historx = useHistory();
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="Logo" />
          <ul>
            <li>
              <Teste
                href="/dashboard"
                active={historx.location.pathname.search('dashboard') === 1}
              >
                ENCOMENDAS{' '}
              </Teste>{' '}
            </li>
            <li>
              <Teste
                href="/entregadores"
                active={historx.location.pathname.search('entregadores') === 1}
              >
                ENTREGADORES{' '}
              </Teste>{' '}
            </li>
            <li>
              <Teste
                href="/recipients"
                active={historx.location.pathname.search('recipient') === 1}
              >
                DESTINATÁRIOS{' '}
              </Teste>{' '}
            </li>
            <li>
              <Teste
                href="/problems"
                active={historx.location.pathname.search('problems') === 1}
              >
                PROBLEMAS{' '}
              </Teste>{' '}
            </li>
          </ul>
        </div>
        <div className="right">
          <strong>Admin FastFeet</strong>
          <button onClick={handleSignOut}>sair do sistema</button>
        </div>
      </Content>
    </Container>
  );
}
