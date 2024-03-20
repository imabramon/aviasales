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
      cites: 'MOW – HKT',
      times: '10:45 – 08:00',
      travelTime: randomTime(),
      transfers: randomTransfers(),
    },
    {
      cites: 'MOW – HKT',
      times: '10:45 – 08:00',
      travelTime: randomTime(),
      transfers: randomTransfers(),
    },
  ],
});
