export const getTime = (tiket) => tiket.flights.map(({ travelTime }) => travelTime).reduce((sum, x) => sum + x, 0);

export const sortLowPrice = (a, b) => a.price - b.price;

export const sortFast = (a, b) => {
  return getTime(a) - getTime(b);
};

export const sortOptimal = (a, b) => {
  return (getTime(a) / 60) * 1000 + a.price - (getTime(b) / 60) * 1000 + b.price;
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

export const makeTiketData = (id) => ({
  id,
  price: randomPrice(),
  flights: [
    {
      cites: ['MOV', 'YAR'],
      date: new Date(),
      travelTime: randomTime(),
      transfers: randomTransfers(),
    },
    {
      cites: ['MOV', 'YAR'],
      date: new Date(),
      travelTime: randomTime(),
      transfers: randomTransfers(),
    },
  ],
});

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

export const makeTiketFromJSON = (json) => ({
  id: Date.now(),
  price: json.price,
  flights: json.segments.map((segment) => ({
    cites: [segment.origin, segment.destination],
    date: new Date(segment.date),
    travelTime: segment.duration,
    transfers: segment.stops,
  })),
});
