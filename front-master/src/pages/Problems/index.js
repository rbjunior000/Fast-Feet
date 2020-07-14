import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Nav, Wrapper, Table } from './styles';
import api from '../../services/api';
import Actions from '../../components/Header/Actions';
import Modal from '../../components/Header/Modal';
import Visibility from '../../assets/ic_visibility_24px.svg';
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
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [problem, setProblem] = useState([]);

  const fetch = async () => {
    try {
      const response = await api.get(
        `delivery/problems?page=${pagination.page}&name=${filter}`
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRedirect = () => history.push('/entregadores/form');

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
      title: 'Visualizar',
      image: Visibility,
      handleClick: async id => {
        setShowModal(!showModal);
        setId(id);
        const response = await api.get(`problems/${id}`);
        setProblem(response.data.rows);
      },
    },
    {
      title: 'Cancelar a encomenda',
      image: Delete,
      handleClick: async id => {
        const agree = window.confirm(
          'Tem certeza que deseja cancelar essa encomenda?'
        );
        if (agree) {
          try {
            const response = await api.put(`package/cancel/${id}`);
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
        <h1>Gerenciando entregadores</h1>
        <Table>
          <div className="header">
            <li style={setWidth('180')}>Encomenda</li>
            <li style={setWidth('935')}>Problema</li>
            <li style={setWidth('85', 'center')} className="text-center">
              Ações
            </li>
          </div>
          {data
            ? data.map(item => (
                <div className="header">
                  <li style={setWidth('180', 'center')} className="text-center">
                    {item[0]}
                  </li>
                  <li style={setWidth('935')}>{item[1]}</li>
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
        height={425}
        id={id}
        url="problems/"
        problems
      >
        <div>
          <strong>VISUALIZAR PROBLEMA</strong>
          {problem.map(item => (
            <p>{item.description}</p>
          ))}
        </div>
      </Modal>
    </Container>
  );
};
