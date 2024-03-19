import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-areas: 'header header' 'aside content';
  width: 756px;
  margin-left: auto;
  margin-right: auto;
  column-gap: 20px;
`;
const Header = styled.div`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
`;
const Content = styled.section`
  grid-area: content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Aside = styled.aside`
  grid-area: aside;
`;

const Layout = (props) => {
  const { header, children, aside } = props;

  return (
    <Container>
      <Header>{header}</Header>
      <Content>{children}</Content>
      <Aside>{aside}</Aside>
    </Container>
  );
};

export default Layout;
