import { ActionTypes } from './actionTypes';
import { makeTiketData } from './makeTiketData';

const getTime = (tiket) => tiket.flights.map(({ time }) => time).reduce((sum, x) => sum + x, 0);

const sortLowPrice = (a, b) => a.price - b.price;

const sortFast = (a, b) => {
  return getTime(a) - getTime(b);
};

const sortOptimal = (a, b) => {
  return (getTime(a) / 60) * 1000 + a.price - (getTime(b) / 60) * 1000 + b.price;
};

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

const filterAll = (tiket) => true;

const filterTransfer = (transferCount) => (tiket) => {
  const { flights } = tiket;
  const tiketTransferCount = flights.map((flight) => flight.transfers.length).reduce((sum, x) => sum + x, 0);
  return tiketTransferCount === transferCount;
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
  currentFilter: {},
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
