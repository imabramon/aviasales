import axios from 'axios';
import { makeTiketFromJSON } from '../utils/tikets';

let searchId = null;

export const aviasalesService = axios.create({
  baseURL: 'https://aviasales-test-api.kata.academy/',
});

const setSearchId = async () => {
  const { data } = await aviasalesService.get('search').catch(() => {});
  searchId = data.searchId;
};

const authorized = (callback) => async (...args) => {
  if (!searchId) {
    await setSearchId();
    return callback(...args);
  }

  return callback(...args);
};

export const getTikets = authorized(async () => {
  const res = await aviasalesService.get(`tickets?searchId=${searchId}`);

  const { tickets, stop } = res.data;

  if (stop) return { tikets: tickets, stop };
  return { tikets: tickets.map((tiket) => makeTiketFromJSON(tiket)), stop };
});
