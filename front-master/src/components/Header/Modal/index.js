import React from 'react';
import { Container, Wrapper } from './styles';

export default function Modal({
  children,
  active,
  height,
  id,
  url,
  problems = false,
}) {
  return (
    <Container
      active={active.showModal}
      onClick={() => active.handleShowModal(false)}
    >
      <Wrapper height={height}>{children}</Wrapper>
    </Container>
  );
}
