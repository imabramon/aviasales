import axios from 'axios';
import { makeTiketFromJSON } from '../utils/tikets';

let searchId = null;

export const aviasalesService = axios.create({
  baseURL: 'https://aviasales-test-api.kata.academy/',
});

const setSearchId = async () => {
  const { data } = await aviasalesService.get('search').catch((e) => {});
  searchId = data.searchId;
};

const authorized = (callback) => {
  return async (...args) => {
    if (!searchId) {
      await setSearchId();
      return callback(...args);
    }

    return callback(...args);
  };
};

export const getTikets = authorized(async () => {
  const { data } = await aviasalesService.get(`tickets?searchId=${searchId}`);
  const { tickets } = data;
  return tickets.map((tiket) => makeTiketFromJSON(tiket));
});
