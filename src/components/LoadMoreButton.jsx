import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  box-shadow: none;
  border: none;
  font-family: 'Open Sans';
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  font-weight: 500;
  width: 502px;
  height: 50px;
  background-color: #2196f3;
  color: white;
  border-radius: 5px;
  text-transform: uppercase;
`;

const LoadMoreButton = () => {
  return <Button>Показать еще 5 билетов</Button>;
};

export default LoadMoreButton;
