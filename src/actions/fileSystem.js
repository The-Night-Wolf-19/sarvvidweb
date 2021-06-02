import { ADD_ENTRY, DELETE_ENTRY, SET_ENTRY } from "../utils/constants";

export const addEntry = (entry) => {
  return {
    type: ADD_ENTRY,
    payload: entry,
  };
};

export const deleteEntry = (entry) => {
  return {
    type: DELETE_ENTRY,
    payload: entry,
  };
};

export const setEntry = (entry) => {
  return {
    type: SET_ENTRY,
    payload: entry,
  };
};
