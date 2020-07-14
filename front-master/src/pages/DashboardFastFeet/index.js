import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Actions from '../../components/Header/Actions';
import Modal from '../../components/Header/Modal';
import Visibility from '../../assets/ic_visibility_24px.svg';
import Edit from '../../assets/ic_edit_24px.svg';
import Delete from '../../assets/ic_delete_24px.svg';
import assinatura from '../../assets/assinatura.png';

import {
  Container,
  Nav,
  Wrapper,
  Table,
  Avatar,
  Status,
  StatusBall,
  StatusSpan,
} from './styles';

export default function DashboardFastFeet({ history }) {
  const paginationInitialState = {
    page: 0,
    count: 0,
  };
  const initialState = [['Loading Data...']];

  const [filter, setFilter] = useState('');
  const [id, setId] = useState('');
  const [pagination, setPagination] = useState(paginationInitialState);
  const [data, setData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);

  const handleRedirect = url => history.push(url);

  const fetch = async () => {
    try {
      const response = await api.get(
        `package?page=${pagination.page}&filter=${filter}`
      );
      setData(response.data.items);
      setPagination({ ...pagination, count: response.data.count });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  }, [pagination.page, filter]);

  const setWidth = (minWidth, align) => {
    const textAlign = align;
    return {
      minWidth: `${minWidth}px`,
      textAlign,
    };
  };

  const options = [
    {
      title: 'Visualizar',
      image: Visibility,
      handleClick: async id => {
        setShowModal(!showModal);
        setId(id);
        const response = await api.get(`package/${id}`);
        setList(response.data);
      },
    },
    {
      title: 'Editar',
      image: Edit,
      handleClick: id => {
        handleRedirect(`/package/form/${id}`);
      },
    },
    {
      title: 'Deletar',
      image: Delete,
      handleClick: async id => {
        const agree = window.confirm(
          'Tem certeza que deseja exlcuir essa encomenda?'
        );
        if (agree) {
          try {
            const response = await api.delete(`package/delete/${id}`);
            toast.success(response.data.message);
            fetch();
          } catch (err) {
            console.log(err);
          }
        }
      },
    },
  ];
  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando encomendas</h1>
        <Nav>
          <input
            type="text"
            placeholder="Buscar por encomendas"
            onChange={e => setFilter(e.target.value)}
          />
          <button type="submit" onClick={() => handleRedirect('/package/form')}>
            CADASTRAR
          </button>
        </Nav>
        <Table>
          <div className="header">
            <li style={setWidth('90', 'center')}>ID</li>
            <li style={setWidth('200')}>Destinatario</li>
            <li style={setWidth('230')}>Entregador</li>
            <li style={setWidth('155')}>Estado</li>
            <li style={setWidth('205')}>Cidade</li>
            <li style={setWidth('220')}>Status</li>
            <li style={setWidth('85', 'center')} className="text-center">
              Ações
            </li>
          </div>
          {data
            ? data.map(item => (
                <div className="header">
                  <li style={setWidth('90', 'center')} className="text-center">
                    {item[0]}
                  </li>
                  <li style={setWidth('200')}>{item[1]}</li>
                  <li style={setWidth('230')}>
                    {' '}
                    <div className="avatar">
                      <Avatar>{item[2]}</Avatar>
                      <span className="avatar-text">{item[3]}</span>
                    </div>
                  </li>
                  <li style={setWidth('155')}>{item[4]}</li>
                  <li style={setWidth('205')}>{item[5]}</li>
                  <li style={setWidth('220')}>
                    <Status name={String([item[6]])}>
                      <StatusBall name={String([item[6]])} />
                      <StatusSpan name={String([item[6]])}>
                        {item[6]}
                      </StatusSpan>
                    </Status>
                  </li>
                  <li style={setWidth('85', 'center')} className="text-center">
                    <Actions options={options} id={item[0]} />
                  </li>
                </div>
              ))
            : null}
        </Table>
      </Wrapper>
      <Modal
        active={{
          showModal,
          handleShowModal: () => {
            setShowModal();
          },
        }}
        height={325}
        id={id}
        url="package/"
      >
        <ul>
          <div>
            <strong>Informações da encomenda</strong>
            <li>{`${list[0]}, ${list[1]}`}</li>
            <li>{`${list[2]} - ${list[3]}`}</li>
            <li>{list[4]}</li>
          </div>
          <div>
            <strong>Datas</strong>
            <li>{`Retirada: ${list[5]}`}</li>
            <li>{`Entrega: ${list[5]}`}</li>
          </div>
          <div>
            <strong>Assinatura do destinatário</strong>
            <img src={assinatura} alt="signature" />
          </div>
        </ul>
      </Modal>
    </Container>
  );
}
