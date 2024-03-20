import React from 'react';
import Tiket from './Tiket';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TiketList = ({ tiketsData }) => {
  const tikets = tiketsData.map((tiket) => {
    console.log(tiket);
    return <Tiket key={tiket.id} {...tiket} />;
  });
  return <Container>{tikets}</Container>;
};

const mapStateToProps = (state) => ({
  tiketsData: state.tikets,
});

export default connect(mapStateToProps)(TiketList);
