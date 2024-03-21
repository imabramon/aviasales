import { v4 as uuid } from 'uuid';

export const getTime = (tiket) => tiket.flights.map(({ travelTime }) => travelTime).reduce((sum, x) => sum + x, 0);

export const sortLowPrice = (a, b) => a.price - b.price;

export const sortFast = (a, b) => {
  return getTime(a) - getTime(b);
};

const getTrasfersCount = (tiket) =>
  tiket.flights.map(({ transfers }) => transfers.length).reduce((sum, x) => sum + x, 0);

const getOptimalValue = (tiket) => (getTime(tiket) / 60) * 1000 + tiket.price + getTrasfersCount(tiket) * 3000;

export const sortOptimal = (a, b) => {
  return getOptimalValue(a) - getOptimalValue(b);
};

export const filterAll = () => true;

export const filterTransfer = (transferCount) => (tiket) => {
  const { flights } = tiket;
  const tiketTransferCount = flights.map((flight) => flight.transfers.length).reduce((sum, x) => sum + x, 0);
  return tiketTransferCount === transferCount;
};

const randomPrice = () => Math.floor(Math.random() * 10000 + 10000);

const randomTime = () => Math.floor(Math.random() * 180 + 180);

const randomTransfers = () => {
  const length = Math.floor(Math.random() * 4);
  if (length === 0) return [];
  return Array.from({ length }).fill('YAR');
};

const sortFnByFilter = {
  'Самый дешевый': sortLowPrice,
  'Самый быстрый': sortFast,
  // prettier-ignore
  'Оптимальный': sortOptimal,
};

export const sortTikets = (tikets, filter) => {
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

export const filterTikets = (tikets, filter) => {
  const filterFns = Object.keys(filter)
    .map((filter) => filterFnByName[filter])
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
