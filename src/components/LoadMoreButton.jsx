import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions';

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

function LoadMoreButton({ loadMore, areMoreTikets }) {
  if (!areMoreTikets) return null;

  return <Button onClick={() => loadMore()}>Показать еще 5 билетов</Button>;
}

const mapStateToProps = ({areMoreTikets}) => ({
  areMoreTikets
});

const mapDispatchToProps = (dispatch) => {
  const { viewMore } = bindActionCreators(actions, dispatch);

  return {
    loadMore: viewMore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreButton);
