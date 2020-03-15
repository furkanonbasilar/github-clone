import * as API from "utils/Api";
import * as TYPES from "./actionTypes";

export const getRepos = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    API.search(getState().appState.searchVal, getState().appState.pageNumber)
      .then(response => {
        dispatch({ type: TYPES.GET_REPOS, repos: response.items });
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getReposByUserName = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    API.getUserRepos(getState().appState.searchVal)
      .then(response => {
        dispatch({ type: TYPES.GET_REPOS_BY_NAME, repos: response });
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getPageCount = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    API.getTotalCountRepo(getState().appState.searchVal)
      .then(response => {
        dispatch({ type: TYPES.GET_TOTAL_COUNT_REPOS, pageCount: response });
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resetTotalRepoCount = () => ({
  type: TYPES.RESET_TOTAL_COUNT_REPOS
});

export const fetchValidData = () => (dispatch, getState) => {
  switch (getState().appState.optionValue) {
    case "ReposByName": {
      dispatch(getRepos()).then(() => {
        dispatch(getPageCount());
      });
      break;
    }
    case "ReposByUserName": {
      dispatch(resetTotalRepoCount());
      dispatch(getReposByUserName());
      break;
    }
  }
};

export const addRepoToBookmarks = (key, value) => ({
  type: TYPES.ADD_REPO_TO_BOOKMARKS,
  key,
  value
});
