import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  margin: 100px auto;
  padding: auto;
`;

export const NavTable = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const NewPayment = styled.button`
  cursor: pointer;
  margin-bottom: 20px;
  height: 35px;
  width: 200px;
  background: green;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  transition: background 0.2;
  &:hover {
  }
`;

export const Formulario = styled.div`
  background-color: #fff;
  width: 712px;
  height: 160px;
  border: 1px solid white;
  border-radius: 4px;

  .selects {
    display: flex;
    justify-content: space-around;
  }

  .input {
    padding-top: 10px;
    margin-right: 30px;
    margin-left: 14px;
    .MuiInputBase-input .MuiInput-input {
      width: 285px;
    }
    input {
      /* width:100%; */
      /* height:28px;
    border: 1px solid gray;
    border-radius: 4px; */
    }
  }
`;
