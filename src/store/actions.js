import { getTikets } from '../services/aviasalesService';
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

let erorrsCount = 0;

const getAllTikets = async (dispatch) => {
  try {
    const { tikets, stop } = await getTikets();
    dispatch({
      type: ActionTypes.loadMore,
      payload: {
        tikets,
        stop,
      },
    });

    if (!stop) {
      await getAllTikets(dispatch);
    }
  } catch (e) {
    if (erorrsCount > 3) {
      return;
    }

    erorrsCount += 1;
    getAllTikets(dispatch);
  }
};

export const load = () => async (dispatch) => {
  getAllTikets(dispatch);
};

export const loadMore = () => async (dispatch) => {
  const { tikets, stop } = await getTikets();

  dispatch({
    type: ActionTypes.loadMore,
    payload: { tikets, stop },
  });
};

export const viewMore = () => ({
  type: ActionTypes.viewMore,
});

export const setButtonState = (state) => ({
  type: ActionTypes.setButtonState,
  payload: {
    areMoreTikets: state,
  },
});
