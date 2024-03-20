import { ActionTypes } from './actionTypes';
import { makeTiketData } from '../utils/tikets';

const initialState = {
  searchId: null,
  currentSort: 'Самый дешевый',
  currentFilter: { Все: true },
  tikets: Array.from({ length: 5 })
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
      return { ...state, currentSort: sort };
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
      const { tikets: oldTikets } = state;
      const { tikets } = action.payload;
      const newTikets = [...oldTikets, ...tikets];

      return { ...state, tikets: newTikets };
    }
    default:
      return state;
  }
};
