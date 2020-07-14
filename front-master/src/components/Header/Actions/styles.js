import styled, { css } from 'styled-components';
import actions from '../../../assets/ic_actions_24px.svg';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.button`
  color: #c6c6c6;
  background: none;
  border: 0;
  ${props =>
    props.visible &&
    css`
      &:last-of-type {
        /* display: none; */
      }
    `}
`;

export const Box = styled.div`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100%);
  background: #ffffff;
  box-shadow: 0px 0px 2px #00000026;
  border-radius: 4px;
  display: ${props => (props.visible ? 'block' : 'none')};

  div.divisor {
    padding: 10px;
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 4.5px);
    top: -7px;
    width: 0;
    height: 0;
    border-left: 4.5px solid transparent;
    border-right: 4.5px solid transparent;
    border-bottom: 7px solid #fff;
    filter: drop-shadow(0px -1px 1px #0000001a);
  }

  img {
  }

  ul {
    li {
      button {
        margin-left: 5.34px;
        border: none;
      }

      button.margin {
        margin-left: 10px;
      }

      button:first-child {
        margin: 0;
      }
      border-bottom: 1px solid #eeeeee;
      padding: 5px 0;
      font-size: 16px;
      font-family: 'Roboto', Verdana, Geneva, Tahoma, sans-serif;
      color: #999999;
    }

    li:last-child {
      border: none;
    }
  }
`;
