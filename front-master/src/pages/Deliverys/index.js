/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container, Nav, Wrapper, Table, Avatar } from './styles';
import Actions from '../../components/Header/Actions';
import Edit from '../../assets/ic_edit_24px.svg';
import Delete from '../../assets/ic_delete_24px.svg';

export default ({ history }) => {
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
        `delivery?page=${pagination.page}&name=${filter}`
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
        handleRedirect(`/entregadores/form/${id}`);
      },
    },
    {
      title: 'Deletar',
      image: Delete,
      handleClick: async id => {
        const agree = window.confirm(
          'Tem certeza que deseja exlcuir esse entregador?'
        );
        if (agree) {
          try {
            const response = await api.delete(`delivery/delete/${id}`);
            toast.success(response.data.message);
            fetch();
          } catch (err) {
            toast.error(
              'Voce nao pode deletar um entregador que possui encomenda!'
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
            placeholder="Buscar por entregador"
            onChange={e => setFilter(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRedirect('/entregadores/form')}
          >
            CADASTRAR
          </button>
        </Nav>
        <Table>
          <div className="header">
            <li style={setWidth('90', 'center')}>ID</li>
            <li style={setWidth('200')}>Foto</li>
            <li style={setWidth('230')}>Nome</li>
            <li style={setWidth('300')}>Email</li>
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
                  <li style={setWidth('200')}>
                    {item[1] ? (
                      item[1].length > 4 ? (
                        <img className="avatar" src={item[1]} alt="avatar" />
                      ) : (
                        <Avatar> {item[1]} </Avatar>
                      )
                    ) : null}
                  </li>
                  <li style={setWidth('230')}>{item[2]}</li>
                  <li style={setWidth('300')}>{item[3]}</li>
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
