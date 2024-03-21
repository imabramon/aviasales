import { ActionTypes } from './actionTypes';
import { makeTiketData, sortTikets } from '../utils/tikets';

const initialState = {
  maxView: 5,
  currentSort: 'Самый дешевый',
  currentFilter: { Все: true },
  tikets: [],
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  console.log(action);
  console.log(state);
  switch (type) {
    case ActionTypes.load: {
      const { currentSort } = state;
      const { tikets } = action.payload;
      console.log(tikets);
      return {
        ...state,
        tikets: sortTikets(tikets, currentSort),
        maxView: 5,
      };
    }
    case ActionTypes.changeSort: {
      const { sort } = action.payload;
      const { tikets } = state;
      return {
        ...state,
        currentSort: sort,
        tikets: sortTikets(tikets, sort),
        maxView: 5,
      };
    }

    case ActionTypes.changeFilter: {
      const { filter } = action.payload;
      const { currentFilter } = state;
      const newFilter = { ...currentFilter };

      if (filter in currentFilter) {
        delete newFilter[filter];
      } else {
        newFilter[filter] = true;
      }

      return { ...state, currentFilter: newFilter };
    }

    case ActionTypes.loadMore: {
      const { maxView, tikets } = state;
      if (maxView > tikets.length) {
        return {
          ...state,
          maxView: tikets.length - maxView,
        };
      }
      return { ...state, maxView: maxView + 5 };
    }
    default:
      return state;
  }
};
