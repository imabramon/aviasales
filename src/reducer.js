import { ActionTypes } from './actionTypes';
import { makeTiketData } from './makeTiketData';

const initialState = {
  currentFilter: 'Самый быстрый',
  transferFilters: [],
  tikets: Array.from({ length: 5 })
    .fill(0)
    .map((_, index) => makeTiketData(index)),
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  console.log(type);
  switch (type) {
    case ActionTypes.applyFilter:
      const { filter } = action.payload;
      return { ...state, currentFilter: filter };
    case ActionTypes.applyTransferFilter:
      return state;
    case ActionTypes.loadMore:
      return state;
    default:
      return state;
  }
};
