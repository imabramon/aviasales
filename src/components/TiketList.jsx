import React from 'react';
import Tiket from './Tiket';
import styled from 'styled-components';

const Container = styled.div``;

const TiketList = (props) => {
  return (
    <Container>
      <Tiket />
      <Tiket />
      <Tiket />
      <Tiket />
      <Tiket />
    </Container>
  );
};

export default TiketList;
