import * as TYPES from "./actionTypes";

export const setSearch = value => ({
  type: TYPES.SEARCH_VALUE,
  payload: value
});

export const setSelected = value => ({
  type: TYPES.SEL_VALUE,
  payload: value
});

export const setPageNumber = value => ({
  type: TYPES.SET_PAGE_NUMBER,
  payload: value
});

export const resetPageNumber = () => ({
  type: TYPES.RESET_PAGE_NUMBER
});
