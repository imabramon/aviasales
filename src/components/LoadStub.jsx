import React, { useEffect, useReducer } from 'react';
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

export const LoadStub = () => {
  const [dots, dispathDots] = useReducer((state) => {
    switch (true) {
      case state.length < 3:
        return state + '.';
      default:
        return '.';
    }
  }, '...');

  useEffect(() => {
    const id = setInterval(() => {
      dispathDots();
    }, 200);
    return () => {
      console.log('ended');
      clearInterval(id);
    };
  }, []);

  return <Container>Загрузка{dots}</Container>;
};
