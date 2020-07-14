import styled from 'styled-components';

export const Container = styled.div`
  ${props =>
    props.active
      ? {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }
      : {
          display: 'none',
        }}
`;

export const Wrapper = styled.div`
  width: 450px;
  height: ${props => `${props.height}px;`};
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 174px;
  padding: 25px;
  font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;

  ul {
    div {
      font-size: 16px;
      border-bottom: 1px solid #eeeeee;

      strong {
        font-size: 14px;
      }

      li:last-child {
        padding-bottom: 12px;
      }
      li {
        color: #666666;
      }
    }
    div:last-child {
      border: 0;
      /* display:flex;
      flex-direction:column; */

      img {
        display: block;
        margin: 0 auto;
        margin-top: 20px;
      }
    }
  }
`;
