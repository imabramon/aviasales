import React from 'react';
import Tiket from './Tiket';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { sortTikets, filterTikets } from '../utils/tikets';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TiketList = ({ tiketsData }) => {
  const tikets = tiketsData.map((tiket) => {
    // console.log(tiket);
    return <Tiket key={tiket.id} {...tiket} />;
  });
  return <Container>{tikets}</Container>;
};

const mapStateToProps = (state) => {
  const { currentFilter, currentSort, tikets } = state;

  const sortedTikets = sortTikets(tikets, currentSort);
  const filtredTikets = filterTikets(sortedTikets, currentFilter);

  return {
    tiketsData: filtredTikets,
  };
};

export default connect(mapStateToProps)(TiketList);
