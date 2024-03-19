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

const initialState = Array.from({ length: 5 })
  .fill(0)
  .map((_, index) => makeTiketData(index));

export const reducer = (state = initialState, action) => {
  const { type } = action;
  // console.log(type);
  switch (type) {
    case ActionTypes.load: {
      const { data } = action.payload;
      return [...state, ...data];
    }
    case ActionTypes.reaload: {
      const { data } = action.payload;
      return [...data];
    }
    case ActionTypes.sort:
      const { filter } = action.payload;
      return sortTikets(state, filter);
    default:
      return state;
  }
};
