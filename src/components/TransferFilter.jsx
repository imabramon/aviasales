import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as actions from '../store/actions';
import { filterAll } from '../utils/tikets';

const List = styled.ul`
  list-style: none;
`;
const ListItem = styled.li``;
const Label = styled.label`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  width: 232px;
  height: 40px;
  background-color: white;
  padding-left: 20px;

  &:hover {
    background-color: #f1fcff;
  }

  &:before {
    position: relative;
    content: url('/checkbox.svg');
    width: 20px;
    height: 20px;
  }

  &:has(:checked)::before {
    content: url('/checkbox--checked.svg');
  }
`;
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;
const LabelTitle = styled.span`
  padding-left: 10px;
  font-size: 13px;
  line-height: 20px;
  color: #4a4a4a;
`;
const Container = styled.div`
  font-family: 'Open Sans';
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 232px;
  height: fit-content;
  padding-top: 20px;
  border-radius: 5px;
  background-color: white;
  overflow: hidden;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 8px;
`;
const Title = styled.h2`
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 20px;
`;

function TransferFilter({ filter, changeFilter, filterAll }) {
  const filtersName = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const filters = filtersName.map((name, index) => (
    <ListItem key={index}>
      <Label>
        <Checkbox checked={filterAll || name in filter} onChange={() => changeFilter(name)} />
        <LabelTitle>{name}</LabelTitle>
      </Label>
    </ListItem>
  ));

  return (
    <Container>
      <Title>Количество пересадок</Title>
      <List>{filters}</List>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  filter: state.currentFilter,
  filterAll: state.filterAll,
});

const mapDispathToProps = (dispatch) => {
  const { changeFilter } = bindActionCreators(actions, dispatch);

  return {
    changeFilter,
  };
};

export default connect(mapStateToProps, mapDispathToProps)(TransferFilter);
