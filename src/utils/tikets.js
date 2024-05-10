import { v4 as uuid } from 'uuid';

export const getTime = (tiket) => tiket.flights.map(({ travelTime }) => travelTime).reduce((sum, x) => sum + x, 0);

export const sortLowPrice = (a, b) => a.price - b.price;

export const sortFast = (a, b) => getTime(a) - getTime(b);

const getTrasfersCount = (tiket) =>
  tiket.flights.map(({ transfers }) => transfers.length).reduce((prev, x) => Math.max(prev, x), 0);

const getOptimalValue = (tiket) => (getTime(tiket) / 60) * 1000 + tiket.price + getTrasfersCount(tiket) * 3000;

export const sortOptimal = (a, b) => getOptimalValue(a) - getOptimalValue(b);

export const filterAll = () => true;

export const filterTransfer = (transferCount) => (tiket) => {
  const tiketTransferCount = getTrasfersCount(tiket);
  return tiketTransferCount === transferCount;
};

const mapSortNameToKey = (name) => {
  switch (name) {
    case 'Самый дешевый':
      return 'chippest';
    case 'Самый быстрый':
      return 'fastest';
    case 'Оптимальный':
      return 'optimal';
    default:
      throw new Error('Нет такого имени в сортировках');
  }
};

const sortFnByFilter = {
  chippest: sortLowPrice,
  fastest: sortFast,
  optimal: sortOptimal,
};

export const sortTikets = (tikets, filter) => {
  const filterKey = mapSortNameToKey(filter);
  if (!(filterKey in sortFnByFilter)) {
    throw new Error('Нет такой сортировки');
  }
  return tikets.toSorted(sortFnByFilter[filterKey]);
};

const mapFilterNameToKey = (name) => {
  switch (name) {
    case 'Все':
      return 'all';
    case 'Без пересадок':
      return 'without';
    case '1 пересадка':
      return 'transfer1';
    case '2 пересадки':
      return 'transfer2';
    case '3 пересадки':
      return 'trasnfer3';
    default:
      throw new Error('Нет такого имени в фильтрах');
  }
};

const filterFnByName = {
  all: filterAll,
  without: filterTransfer(0),
  transfer1: filterTransfer(1),
  transfer2: filterTransfer(2),
  transfer3: filterTransfer(3),
};

const orFilter = (filterFns) => (tiket) => {
  for (const filter of filterFns) {
    if (filter(tiket)) return true;
  }
  return false;
};

export const filterTikets = (tikets, filter) => {
  const filterFns = Object.keys(filter)
    .map((filter) => filterFnByName[mapFilterNameToKey(filter)])
    .filter((x) => x);
  const filterFn = orFilter(filterFns);

  return tikets.filter(filterFn);
};

const makeCompanyLogoSrc = (name) => `https://pics.avs.io/99/36/${name}.png`;

export const makeTiketFromJSON = (json) => ({
  id: uuid(),
  price: json.price,
  companyLogoSrc: makeCompanyLogoSrc(json.carrier),
  flights: json.segments.map((segment) => ({
    cites: [segment.origin, segment.destination],
    dateData: segment.date,
    travelTime: segment.duration,
    transfers: segment.stops,
  })),
});
