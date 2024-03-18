import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Header = styled.div``;
const Content = styled.section``;
const Aside = styled.aside``;

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
