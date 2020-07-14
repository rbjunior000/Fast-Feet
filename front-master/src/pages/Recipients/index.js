import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container, Nav, Wrapper, Table } from './styles';
import Actions from '../../components/Header/Actions';
import Edit from '../../assets/ic_edit_24px.svg';
import Delete from '../../assets/ic_delete_24px.svg';

export default ({ history, match }) => {
  const paginationInitialState = {
    page: 0,
    count: 0,
  };
  const initialState = [['Loading Data...']];
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState(paginationInitialState);
  const [data, setData] = useState(initialState);

  const fetch = async () => {
    try {
      const response = await api.get(
        `recipient?page=${pagination.page}&name=${filter}`
      );
      setData(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRedirect = url => history.push(url);

  useEffect(() => {
    fetch();
  }, [filter, pagination.page]);
  const setWidth = (minWidth, align) => {
    const textAlign = align;
    return {
      minWidth: `${minWidth}px`,
      textAlign,
    };
  };

  const options = [
    {
      title: 'Editar',
      image: Edit,
      handleClick: id => {
        handleRedirect(`/recipient/form/${id}`);
      },
    },
    {
      title: 'Deletar',
      image: Delete,
      handleClick: async id => {
        const agree = window.confirm(
          'Tem certeza que deseja exlcuir esse destinatario?'
        );
        if (agree) {
          try {
            const response = await api.delete(`recipient/delete/${id}`);
            toast.success(response.data.message);
            fetch();
          } catch (err) {
            toast.error(
              'Voce nao pode deletar um destinatario que possui encomenda!'
            );
          }
        }
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando entregadores</h1>
        <Nav>
          <input
            type="text"
            placeholder="Buscar por destinatario"
            onChange={e => setFilter(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRedirect('/recipient/form')}
          >
            CADASTRAR
          </button>
        </Nav>
        <Table>
          <div className="header">
            <li style={setWidth('90', 'center')}>ID</li>
            <li style={setWidth('200')}>Nome</li>
            <li style={setWidth('600')}>Endereço</li>
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
                  <li style={setWidth('600')}>{item[2]}</li>
                  <li style={setWidth('85', 'center')} className="text-center">
                    <Actions options={options} id={item[0]} />
                  </li>
                </div>
              ))
            : null}
        </Table>
      </Wrapper>
    </Container>
  );
};
