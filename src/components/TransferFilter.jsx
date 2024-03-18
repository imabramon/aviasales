import React from 'react';
import styled from 'styled-components';

const List = styled.ul``;
const ListItem = styled.li``;
const Label = styled.label``;
const Checkbox = styled.input.attrs({ type: 'checkbox' })``;
const LabelTitle = styled.span``;
const Container = styled.div``;
const Title = styled.h2``;

const TransferFilter = () => {
  const filtersName = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const filters = filtersName.map((name) => (
    <ListItem>
      <Label>
        <Checkbox />
        <LabelTitle>{name}</LabelTitle>
      </Label>
    </ListItem>
  ));

  return (
    <Container>
      <Title>Количество пересадок</Title>
      <List>{filters}</List>
    </Container>
  );
};

export default TransferFilter;
