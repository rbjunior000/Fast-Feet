import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import Input from '../../components/Header/InputUnform';
import { Container, Wrapper, Nav } from './styles';
import api from '../../services/api';
import left from '../../assets/left.svg';
import done from '../../assets/ic_done_24px.svg';

export default props => {
  const [recipient, setRecipient] = useState({});

  const fetch = async () => {
    const response = await api.get(`recipient/${props.match.params.id}`);
    setRecipient(response.data);
  };

  useEffect(() => {
    if (props.match.params.id) {
      fetch();
    }
  }, []);

  const handleSubmit = async (data, { reset }) => {
    try {
      if (props.match.params.id) {
        const response = await api.put(
          `recipient/${props.match.params.id}`,
          data
        );
        toast.success(response.data.message);
        reset();
      } else {
        const response = await api.post('recipient', data);
        toast.success(response.data.message);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Nav>
        <h1> Cadastro de encomendas</h1>
        <div>
          <button type="button" className="primeiro">
            <img src={left} alt="left" />
            <span>VOLTAR</span>
          </button>
          <button type="submit" form="form1" value="Submit">
            <img src={done} alt="done" />
            <span>SALVAR</span>
          </button>
        </div>
      </Nav>
      <Wrapper>
        <Form id="form1" onSubmit={handleSubmit}>
          <div className="name">
            <strong>Nome </strong>
            <Input name="name" defaultValue={recipient.name} />
          </div>
          <div style={{ display: 'flex', marginTop: '9px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Rua</strong>
              <Input
                name="rua"
                defaultValue={recipient.rua}
                style={{ width: '519px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0px 18px 0px 14px',
              }}
            >
              <strong>Número</strong>
              <Input
                name="numero"
                defaultValue={recipient.numero}
                style={{ width: '150px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Complemento</strong>
              <Input
                name="complemento"
                defaultValue={recipient.complemento}
                style={{ width: '140px' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '9px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Cidade</strong>
              <Input
                name="cidade"
                defaultValue={recipient.cidade}
                style={{ width: '269px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0px 16px',
              }}
            >
              <strong>Estado</strong>
              <Input
                name="estado"
                defaultValue={recipient.estado}
                style={{ width: '269px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>CEP</strong>
              <Input
                name="cep"
                defaultValue={recipient.cep}
                style={{ width: '269px' }}
              />
            </div>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};
