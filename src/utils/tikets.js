export const getTime = (tiket) => tiket.flights.map(({ time }) => time).reduce((sum, x) => sum + x, 0);

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

export const makeTiketData = (id) => ({
  id,
  price: 13400,
  flights: [
    {
      cites: 'MOW – HKT',
      times: '10:45 – 08:00',
      travelTime: '21ч 15м',
      transfers: ['HKG', 'JNB'],
    },
    {
      cites: 'MOW – HKT',
      times: '10:45 – 08:00',
      travelTime: '21ч 15м',
      transfers: ['HKG', 'JNB'],
    },
  ],
});
