import { makeTiketData } from '../utils/tikets';
import { ActionTypes } from './actionTypes';

export const load = () => {
  const tikets = Array.from({ length: 5 })
    .fill(0)
    .map((_, index) => makeTiketData(index));

  return {
    type: ActionTypes.load,
    payload: {
      tikets,
    },
  };
};

export const changeSort = (sort) => ({
  type: ActionTypes.changeSort,
  payload: {
    sort,
  },
});

export const changeFilter = (filter) => ({
  type: ActionTypes.changeFilter,
  payload: {
    filter,
  },
});

export const loadMore = () => ({
  type: ActionTypes.loadMore,
});
