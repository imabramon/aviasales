import { ActionTypes } from './actionTypes';
import { makeTiketData, sortTikets } from '../utils/tikets';

const initialState = {
  maxView: 5,
  currentSort: 'Самый дешевый',
  currentFilter: { Все: true },
  tikets: Array.from({ length: 100 })
    .fill(0)
    .map((_, index) => makeTiketData(index)),
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  console.log(action);
  console.log(state);
  switch (type) {
    case ActionTypes.load: {
      const { tikets } = action.payload;
      return { ...state, tikets };
    }
    case ActionTypes.changeSort: {
      const { sort } = action.payload;
      const { tikets } = state;
      return {
        ...state,
        currentSort: sort,
        tikets: sortTikets(tikets, sort),
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
