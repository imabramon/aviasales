import { ActionTypes } from './actionTypes';
import { sortLowPrice, sortFast, sortOptimal, filterAll, filterTransfer, makeTiketData } from '../utils/tikets';

const sortFnByFilter = {
  'Самый дешевый': sortLowPrice,
  'Самый быстрый': sortFast,
  // prettier-ignore
  'Оптимальный': sortOptimal,
};

const sortTikets = (tikets, filter) => {
  if (!(filter in sortFnByFilter)) {
    throw new Error('Нет такой сортировки');
  }

  return tikets.toSorted(sortFnByFilter[filter]);
};

const filterFnByName = {
  Все: filterAll,
  'Без пересадок': filterTransfer(0),
  '1 пересадка': filterTransfer(1),
  '2 пересадки': filterTransfer(2),
  '3 пересадки': filterTransfer(3),
};

const orFilter = (filterFns) => {
  return (tiket) => {
    for (const filter of filterFns) {
      if (filter(tiket)) return true;
    }
    return false;
  };
};

const filterTikets = (tikets, filter) => {
  const filterFns = Object.keys(filter)
    .map((filter) => filterFnByName[filter])
    .filter((x) => x);
  const filterFn = orFilter(filterFns);

  return tikets.filter(filterFn);
};

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
  // console.log(type);
  switch (type) {
    case ActionTypes.load: {
      const { tikets } = action.payload;
      return { ...state, tikets };
    }
    case ActionTypes.changeSort: {
      const { sort } = action.payload;
      return { ...state, currentSort: sort, tikets: sortTikets(state.tikets, sort) };
    }

    case ActionTypes.changeFilter: {
      const { filter } = action.payload;
      const { currentFilter } = state;

      if (filter in currentFilter) {
        const newFilter = { ...currentFilter };
        delete newFilter[filter];
        const newTikets = filterTikets(state.tikets, filter);

        return { ...state, currentFilter: newFilter, tikets: newTikets };
      }
    }

    case ActionTypes.loadMore: {
      const { currentFilter, currentSort, tikets: oldTikets } = state;
      const { tikets } = action.payload;
      const newTikets = [...oldTikets, ...tikets];
      const sortedTikets = sortTikets(newTikets, currentSort);
      const filtredTikets = filterTikets(sortedTikets, currentFilter);

      return { ...state, tikets: filtredTikets };
    }
    default:
      return state;
  }
};
