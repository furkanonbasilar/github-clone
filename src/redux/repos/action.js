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
    dispatch(showLoader());
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
      dispatch(showLoader());
      dispatch(getRepos()).then(() => {
        dispatch(getPageCount());
        dispatch(hideLoader());
      });
      break;
    }
    case "ReposByUserName": {
      dispatch(showLoader());
      dispatch(resetTotalRepoCount());
      dispatch(getReposByUserName());
      dispatch(hideLoader());
      break;
    }
  }
};

export const toggleBookmark = (category, repoData) => (dispatch, getState) => {
  const { bookmarks } = getState().repos;
  const foundAddedRepo = bookmarks.find(x => x.repoData.id === repoData.id);

  if (!foundAddedRepo) {
    dispatch(addRepoToBookmarks(category, repoData));
  } else {
    if (foundAddedRepo.categories.find(x => x === category)) {
      foundAddedRepo.categories.length === 1
        ? dispatch(removeRepoFromBookmarks(repoData.id))
        : dispatch(removeCategory(repoData.id, category));
    } else {
      dispatch(addCategory(repoData.id, category));
    }
  }
};

export const addRepoToBookmarks = (category, repoData) => ({
  type: TYPES.ADD_REPO_TO_BOOKMARKS,
  category,
  repoData
});

export const removeRepoFromBookmarks = id => ({
  type: TYPES.REMOVE_REPO_FROM_BOOKMARKS,
  id
});

export const addCategory = (id, category) => ({
  type: TYPES.ADD_CATEGORY,
  id,
  category
});

export const removeCategory = (id, category) => ({
  type: TYPES.REMOVE_CATEGORY,
  id,
  category
});

export const showLoader = () => ({
  type: TYPES.SHOW_LOADER
});

export const hideLoader = () => ({
  type: TYPES.HIDE_LOADER
});
