import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import Input from '../../components/Header/InputUnform';
import { Container, Wrapper, Nav } from './styles';
import api from '../../services/api';
import insert from '../../assets/ic_insert_photo_24px.svg';
import left from '../../assets/left.svg';
import done from '../../assets/ic_done_24px.svg';

export default function App(props) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState('');
  const [delivery, setDelivery] = useState({});
  const ref = useRef();
  console.log(preview);

  const handleSubmit = async (data, { reset }) => {
    try {
      if (props.match.params.id) {
        const response = await api.put(
          `deliveryForm/update/${props.match.params.id}`,
          { ...data, avatar_id: file }
        );
      } else {
        const response = await api.post('delivery', {
          ...data,
          avatar_id: file,
        });
      }
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const handleChange = async e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    console.log(response.data)
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  };

  const fetch = async () => {
    const response = await api.get(`deliveryById/${props.match.params.id}`);
    setPreview(response.data.File.url);
    setFile(response.data.File.id);
    setDelivery({ name: response.data.name, email: response.data.email });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <Nav>
        <h1>Cadastro de entregadores</h1>
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
          <label htmlFor="avatar">
            <img
              className={preview ? 'preview' : null}
              src={preview || insert}
              alt=""
            />
            {preview ? null : <span>Adicionar foto</span>}
            <Input
              name="avatar_id"
              type="file"
              id="avatar"
              accept="image/*"
              data-file={file}
              onChange={handleChange}
              ref={ref}
            />
          </label>
          <div className="display">
            <span>Nome</span>
            <Input
              className="normal"
              name="name"
              defaultValue={delivery.name}
            />
            <span className="margin">Email</span>
            <Input
              className="normal"
              name="email"
              defaultValue={delivery.email}
            />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}
