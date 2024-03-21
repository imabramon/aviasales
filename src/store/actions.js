import { getTikets } from '../services/aviasalesService';
import { makeTiketData } from '../utils/tikets';
import { ActionTypes } from './actionTypes';

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

export const load = () => async (dispatch) => {
  const tikets = await getTikets();
  dispatch({
    type: ActionTypes.load,
    payload: {
      tikets,
    },
  });
};

export const loadMore = () => ({
  type: ActionTypes.loadMore,
});
