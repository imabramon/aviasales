import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tiket from './Tiket';
import { sortTikets, filterTikets } from '../utils/tikets';
import { EmptyStub } from './EmptyStub';
import * as actions from '../store/actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function TiketList({
  tiketsData, maxView, setButtonState, areMoreTikets,
}) {
  if (tiketsData.length === 0) {
    if (areMoreTikets) setButtonState(false);
    return <EmptyStub />;
  }

  if (!areMoreTikets) setButtonState(true);

  const tikets = tiketsData.slice(0, maxView).map((tiket) => <Tiket key={tiket.id} {...tiket} />);
  return <Container>{tikets}</Container>;
}

const mapStateToProps = (state) => {
  const {
    currentFilter, tikets, currentSort, maxView, areMoreTikets,
  } = state;

  const sortedTikets = sortTikets(tikets, currentSort);
  const filtredTikets = filterTikets(sortedTikets, currentFilter);

  return {
    tiketsData: filtredTikets,
    maxView,
    areMoreTikets,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { setButtonState } = bindActionCreators(actions, dispatch);

  return {
    setButtonState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TiketList);
