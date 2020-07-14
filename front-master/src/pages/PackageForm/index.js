import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import Input from '../../components/Header/InputUnform';
import Select from '../../components/Header/SelectUnform';
import { Container, Wrapper, Nav } from './styles';
import api from '../../services/api';
import left from '../../assets/left.svg';
import done from '../../assets/ic_done_24px.svg';

export default props => {
  const [destinatarios, setDestinatarios] = useState([]);
  const [entregadores, setEntregadores] = useState([]);

  const [entregador, setEntregador] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [product, setProduct] = useState('');

  const loadPackage = async () => {
    try {
      const response = await api.get(`package/${props.match.params.id}`);
      setEntregador(response.data[7].delivery);
      setDestinatario(response.data[7].recipient);
      setProduct(response.data[7].product);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDestinatarios = async () => {
    try {
      const response = await api.get('recipientForm');
      setDestinatarios(response.data);
    } catch (err) {}
  };

  const fetchEntregadores = async () => {
    try {
      const response = await api.get('deliveryForm');
      setEntregadores(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    props.match.params.id && loadPackage();
    fetchDestinatarios();
    fetchEntregadores();
  }, []);

  const handleSubmit = async (data, { reset }) => {
    if (props.match.params.id) {
      const response = await api.put(
        `package/update/${props.match.params.id}`,
        data
      );
    } else {
      const response = await api.post('package', data);
    }
    reset();
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
          <div className="first">
            <div className="column">
              <span> Destinatario</span>
              <Select name="recipient_id">
                {props.match.params.id ? null : (
                  <option value="" disabled selected>
                    Selecione o destinatário
                  </option>
                )}
                {destinatarios
                  ? destinatarios.map(item => (
                      <option
                        selected={item.name === destinatario}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))
                  : null}
              </Select>
            </div>
            <div className="column">
              <span> Entregador</span>
              <Select name="deliveryman_id">
                {props.match.params.id ? null : (
                  <option value="" disabled selected>
                    Selecione o entregador
                  </option>
                )}
                {entregadores
                  ? entregadores.map(item => (
                      <option
                        selected={item.name === entregador}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))
                  : null}
              </Select>
            </div>
          </div>
          <div className="second">
            <span> Nome do produto</span>
            <Input name="product" defaultValue={product} />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};
