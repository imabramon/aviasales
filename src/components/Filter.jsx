import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 8px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Filter = (props) => {
  const { selected } = props;

  const filtersName = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'];

  const filters = filtersName.map((name, index) => <Item key={index}>{name}</Item>);

  return <Container>{filters}</Container>;
};

export default Filter;
