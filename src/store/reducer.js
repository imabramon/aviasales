import { ActionTypes } from './actionTypes';
import { sortTikets } from '../utils/tikets';

const initialState = {
  isStoped: false,
  currentSort: 'Самый дешевый',
  currentFilter: { Все: true },
  tikets: [],
  maxView: 5,
  areMoreTikets: true,
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
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
      const { tikets } = state;
      const { stop, tikets: newTikets } = action.payload;

      if (stop) return { ...state, isStoped: true };

      return { ...state, tikets: [...tikets, ...newTikets] };
    }

    case ActionTypes.viewMore: {
      const { maxView } = state;
      return { ...state, maxView: maxView + 5 };
    }

    case ActionTypes.setButtonState: {
      const { areMoreTikets } = action.payload;
      return { ...state, areMoreTikets };
    }
    default:
      return state;
  }
};
