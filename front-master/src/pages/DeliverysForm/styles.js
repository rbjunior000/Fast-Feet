// import styled from 'styled-components';

// export const Container = styled.div`
//   max-width:720px;
//   margin:auto;
//   padding-top:80px;

//   body {
//   font: 14px sans-serif;
// }

// form {
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
// }
// img {
//       height:120px;
//       width:120px;
//       border-radius: 50%;
//       border: 3px solid rgba(255,255,255,0.3);
//       background: #eee;
//     }

// label {
//   align-self:center;
//   display: block;
//   font-weight: bold;
//   margin-bottom: 5px;
//   cursor: pointer;
//     &:hover {
//       opacity: 0.7;
//     }
// }

// input {
//   width: 100%;
//   margin-bottom: 15px;
//   padding: 12px 16px;
//   border-radius: 4px;
//   border: 2px solid #ddd;
//   font-size: 15px;
//   color: #444;
//   transition: border-color 0.2s;
// }

// .inputblock {
//   display:none;
// }

// select {
//   width: 100%;
//   margin-bottom: 15px;
//   padding: 12px 16px;
//   border-radius: 4px;
//   border: 2px solid #ddd;
//   font-size: 15px;
//   color: #444;
//   transition: border-color 0.2s;
// }

// input:focus {
//   border-color: #111;
// }

// button {
//   display: block;
//   background: #111;
//   color: #fff;
//   border: 0;
//   cursor: pointer;
//   border-radius: 4px;
//   width: 100%;
//   padding: 16px;
//   font-weight: bold;
//   font-size: 15px;
//   transition: background-color 0.2s;
// }

// button:hover {
//   background-color: #000;
// }

// `;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  align-items: center;

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
  height: 400px;
  background-color: #fff;
  border-radius: 4px;

  h1 {
    font-size: 24px;
    font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
    color: #444444;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 840px;
      height: 45px;
      border: 1px solid #dddddd;
      border-radius: 4px;
    }

    div.display {
      display: flex;
      flex-direction: column;

      span {
        font-size: 14px;
        font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
        color: #444444;
        font-weight: bold;
        margin-bottom: 7px;
      }
      span.margin {
        margin-top: 18px;
      }
    }

    label {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 150px;
      height: 150px;
      border: 1px dashed #dddddd;
      border-radius: 50%;
      margin-top: 26px;
      margin-bottom: 23px;
      opacity: 1;

      img.preview {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.3);
        background: #eee;
      }
      span {
        letter-spacing: 0;
        color: #dddddd;
        opacity: 1;
      }
      input {
        display: none;
      }
    }
  }
`;
