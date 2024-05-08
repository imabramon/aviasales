import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions';

const Container = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  border-radius: 6px;
  display: flex;
  gap: 0;
  border: 1px #dfe5ec solid;
  width: fit-content;
  box-sizing: border-box;
  overflow: hidden;
`;

// prettier-ignore
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 168px;
  border-right: 1px #dfe5ec solid;
  background-color: ${(props) => (props.$isSelected ? '#2196F3' : 'white')};
  color: ${(props) => (props.$isSelected ? 'white' : 'black')};
  text-transform: uppercase;
  &:last-child {
    border-right: none;
  }
`;

function Filter(props) {
  const { selected, changeSort } = props;
  const filtersName = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'];

  const filters = filtersName.map((name) => (
    <Item
      key={name}
      $isSelected={name === selected}
      onClick={() => {
        changeSort(name);
      }}
    >
      {name}
    </Item>
  ));

  return <Container>{filters}</Container>;
}

const mapStateToProps = (state) => ({
  selected: state.currentSort,
});

const mapDispatchToProps = (dispatch) => {
  const { changeSort } = bindActionCreators(actions, dispatch);
  return {
    changeSort,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
