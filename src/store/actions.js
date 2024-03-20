import { ActionTypes } from './actionTypes';

export const loadMore = () => ({
  type: ActionTypes.loadMore,
});

export const applyFilter = (filter) => ({
  type: ActionTypes.applyFilter,
  payload: { filter },
});

export const applyTransferFilter = (filter) => ({
  type: ActionTypes.applyTransferFilter,
  payload: { filter },
});
