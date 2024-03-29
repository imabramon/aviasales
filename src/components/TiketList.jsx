import React from 'react';
import Tiket from './Tiket';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { sortTikets, filterTikets } from '../utils/tikets';
import { EmptyStub } from './EmptyStub';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TiketList = ({ tiketsData }) => {
  if (tiketsData.length === 0) return <EmptyStub />;

  const tikets = tiketsData.map((tiket) => {
    return <Tiket key={tiket.id} {...tiket} />;
  });
  return <Container>{tikets}</Container>;
};

const mapStateToProps = (state) => {
  const { currentFilter, tikets, currentSort } = state;

  const sortedTikets = sortTikets(tikets, currentSort);
  const filtredTikets = filterTikets(sortedTikets, currentFilter);

  return {
    tiketsData: filtredTikets,
  };
};

export default connect(mapStateToProps)(TiketList);
