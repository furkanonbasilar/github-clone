import * as TYPES from "./actionTypes";

const initialState = {
  searchVal: "",
  optionValue: "ReposByName",
  pageNumber: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SEARCH_VALUE: {
      return Object.assign({}, state, {
        searchVal: action.payload
      });
    }
    case TYPES.SEL_VALUE: {
      return Object.assign({}, state, {
        optionValue: action.payload
      });
    }
    case TYPES.SET_PAGE_NUMBER: {
      return Object.assign({}, state, {
        pageNumber: action.payload
      });
    }
    case TYPES.RESET_PAGE_NUMBER: {
      return Object.assign({}, state, {
        pageNumber: 1
      });
    }
    default:
      return state;
  }
};
