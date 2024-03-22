import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: fit-content;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-radius: 5px;
`;

export const EmptyStub = () => {
  return <Container>По выбранным критериям нет билетов :(</Container>;
};
