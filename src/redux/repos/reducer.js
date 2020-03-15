import * as TYPES from "./actionTypes";

const initialState = {
  repos: [],
  bookmarks: [],
  pageCount: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_REPOS: {
      return Object.assign({}, state, {
        repos: [...action.repos]
      });
    }
    case TYPES.GET_REPOS_BY_NAME: {
      return Object.assign({}, state, {
        repos: [...action.repos]
      });
    }
    case TYPES.GET_TOTAL_COUNT_REPOS: {
      return Object.assign({}, state, {
        pageCount: action.pageCount
      });
    }
    case TYPES.RESET_TOTAL_COUNT_REPOS: {
      return Object.assign({}, state, {
        pageCount: null
      });
    }

    case TYPES.ADD_REPO_TO_BOOKMARKS: {
      return Object.assign({}, state, {
        bookmarks: [
          ...state.bookmarks,
          { repoData: action.repoData, categories: [action.category] }
        ]
      });
    }
    case TYPES.REMOVE_REPO_FROM_BOOKMARKS: {
      const delRepoIndex = state.bookmarks.findIndex(
        x => x.repoData.id === action.id
      );

      return Object.assign({}, state, {
        bookmarks: [
          ...state.bookmarks.slice(0, delRepoIndex),
          ...state.bookmarks.slice(delRepoIndex + 1)
        ]
      });
    }
    case TYPES.ADD_CATEGORY: {
      const foundRepo = state.bookmarks.find(x => x.repoData.id === action.id);
      const foundRepoInd = state.bookmarks.findIndex(
        x => x.repoData.id === action.id
      );

      return Object.assign({}, state, {
        bookmarks: [
          ...state.bookmarks.slice(0, foundRepoInd),
          {
            ...foundRepo,
            categories: [...foundRepo.categories, action.category]
          },
          ...state.bookmarks.slice(foundRepoInd + 1)
        ]
      });
    }
    case TYPES.REMOVE_CATEGORY: {
      const foundRepo = state.bookmarks.find(x => x.repoData.id === action.id);
      foundRepo.categories = foundRepo.categories.filter(
        x => x !== action.category
      );
      const foundRepoInd = state.bookmarks.findIndex(
        x => x.repoData.id === action.id
      );

      return Object.assign({}, state, {
        bookmarks: [
          ...state.bookmarks.slice(0, foundRepoInd),
          foundRepo,
          ...state.bookmarks.slice(foundRepoInd + 1)
        ]
      });
    }
    case TYPES.SHOW_LOADER: {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case TYPES.HIDE_LOADER: {
      return Object.assign({}, state, {
        loading: false
      });
    }
    default:
      return state;
  }
};
