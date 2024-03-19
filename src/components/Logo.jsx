import React from 'react';
import logoSrc from '../assets/Logo.svg';
import styled from 'styled-components';

const Image = styled.img``;

const Logo = () => {
  return <Image src={logoSrc} />;
};

export default Logo;
