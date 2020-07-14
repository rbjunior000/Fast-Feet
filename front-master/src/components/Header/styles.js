import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dddddd;
  opacity: 1;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;

  div {
    display: flex;
  }

  img {
    border-right: 1px solid #dddddd;
    padding-right: 30px;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;

    li:first-child {
      margin-left: 30px;
    }

    li {
      margin: 0 10.5px;
    }
  }

  div.right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    button {
      border: none;
      font-size: 14px;
      font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
      color: #de3b3b;
    }
  }
`;

export const Profile = styled.div``;

export const Teste = styled.a`
  font-size: 15px;
  color: ${props => (props.active ? '#444444' : '#999999')};
  font-weight: bold;
`;
