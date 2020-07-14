import styled from 'styled-components';
import search from '../../assets/ic_search_24px.svg';
import add from '../../assets/ic_add_24px.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 1200px;

  h1 {
    font-size: 24px;
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    color: #444444;
    font-weight: bold;
    margin-top: 34px;
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    padding-left: 40px;
    width: 237px;
    height: 36px;
    background: #ffffff url(${search}) no-repeat 16px center;
    border: 1px solid #dddddd;
    border-radius: 4px;
    opacity: 1;
    outline: 0;
  }

  button {
    padding-left: 30px;
    width: 142px;
    height: 36px;
    background-color: #7d40e7;
    background: #7d40e7 url(${add}) no-repeat 21px center;
    border-radius: 4px;
    opacity: 1;
    font-size: 14px;
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    color: #fff;
    font-weight: bold;
  }
`;

export const Table = styled.ul`
  text-align: left;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;
  color: #666666;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
  text-align: left;

  img.avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  div.header {
    display: flex;
    justify-content: space-between;
    height: 57px;
    background-color: #fff;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 21px;
  }
  div.header:first-child {
    background-color: #f5f5f5;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 14px;
    font-weight: bold;
  }
  div.avatar {
    display: flex;
    align-items: center;
  }

  span.status-text {
    color: #de3b3b;
    font-size: 14px;
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    padding-left: 5px;
  }

  div.bolinha {
    display: flex;
    align-items: center;
    width: 10px;
    height: 10px;
    background-color: #de3b3b;
    border-radius: 50%;
  }
`;

export const Status = styled.div`
    display: flex;
    align-items: center;
    height:25px;
    justify-content: center;
    border-radius: 12px;
    font-weight: bold;
    ${props =>
      props.name === 'CANCELADA'
        ? {
            width: '110px',
            backgroundColor: '#FAB0B0',
          }
        : null}
    ${props =>
      props.name === 'PENDENTE'
        ? {
            width: '102px',
            backgroundColor: '#F0F0DF',
          }
        : null}
    ${props =>
      props.name === 'RETIRADA'
        ? {
            width: '97px',
            backgroundColor: '#BAD2FF',
          }
        : null}
    ${props =>
      props.name === 'ENTREGUE'
        ? {
            width: '99px',
            backgroundColor: '#DFF0DF',
          }
        : null}

`;

export const StatusBall = styled.div`
  display: flex;
  align-items: center;
  width:10px;
  height:10px;
  border-radius:50%;
  ${props =>
    props.name === 'CANCELADA'
      ? {
          backgroundColor: '#DE3B3B',
        }
      : null}
    ${props =>
      props.name === 'PENDENTE'
        ? {
            backgroundColor: '#C1BC35',
          }
        : null}
    ${props =>
      props.name === 'RETIRADA'
        ? {
            backgroundColor: '#4D85EE',
          }
        : null}
    ${props =>
      props.name === 'ENTREGUE'
        ? {
            backgroundColor: '#2CA42B',
          }
        : null}
`;

export const StatusSpan = styled.span`
  font-size:14px;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
  padding-left: 5px;
  ${props =>
    props.name === 'CANCELADA'
      ? {
          color: '#DE3B3B',
        }
      : null}
    ${props =>
      props.name === 'PENDENTE'
        ? {
            color: '#C1BC35',
          }
        : null}
    ${props =>
      props.name === 'RETIRADA'
        ? {
            color: '#4D85EE',
          }
        : null}
    ${props =>
      props.name === 'ENTREGUE'
        ? {
            color: '#2CA42B',
          }
        : null}
      
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 16px;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
  color: #a28fd0;
  background: #f4effc 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
