import { format, addMinutes } from 'date-fns';

export const formatTravelTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

export const formatFlightTime = (startDate, duration) => {
  const dateFormat = 'H:mm';
  const endDate = addMinutes(startDate, duration);
  return `${format(startDate, dateFormat)} - ${format(endDate, dateFormat)}`;
};

export const formatCities = ([a, b]) => `${a} - ${b}`;

const priceFormatter = new Intl.NumberFormat('RU', { useGrouping: 'always' });

const transferFormatter = (number) => {
  switch (number) {
    case 0:
      return 'пересадок';
    case 1:
      return 'пересадка';
    default:
      return 'пересадки';
  }
};

export const formatPrice = (value) => `${priceFormatter.format(value)} Р`;
export const formatTransfers = (transfers) => transfers.join(', ');
export const formatTransfersCount = (count) => `${count} ${transferFormatter(count)}`;
