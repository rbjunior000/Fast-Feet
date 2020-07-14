import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;

  h1 {
    font-size: 24px;
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    color: #444444;
  }
`;

export const Nav = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 27px 0;

  div {
    span {
      font-size: 14px;
      font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
      color: #ffffff;
      font-weight: bold;
      margin-left: 5px;
    }
  }

  button.primeiro {
    margin-right: 12px;
    border-radius: 4px;
    width: 112px;
    height: 36px;
    background-color: #cccccc;
    opacity: 1;
  }
  button {
    border-radius: 4px;
    width: 112px;
    height: 36px;
    background: #7d40e7 0% 0% no-repeat padding-box;
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 900px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;

  form {
    input {
      height: 45px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 12px 0px 12px 15px;
    }
    strong {
      padding-bottom: 9px;
      color: #444;
    }
    div.name {
      display: flex;
      flex-direction: column;
    }
  }
`;
