import * as TYPES from "./actionTypes";

const bookmarkTags = {
  android: [],
  angular: [],
  artIntel: [],
  intresting: [],
  react: [],
  all: []
};

const initialState = { repos: [], bookmarks: [bookmarkTags], pageCount: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_REPOS: {
      return Object.assign({}, state, {
        repos: [...action.repos]
      });
    }
    case TYPES.GET_REPOS_BY_NAME: {
      console.log(action.repos);
      return Object.assign({}, state, {
        repos: [...action.repos]
      });
    }
    case TYPES.GET_TOTAL_COUNT_REPOS: {
      console.log(action.pageCount);
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
      const temp = state.bookmarks[0][action.key];
      return Object.assign({}, state, {
        repos: [...state.repos],
        bookmarks: [
          {
            ...state.bookmarks[0],
            [action.key]: [...temp, action.value],
            all: [...state.bookmarks[0].all, action.value]
          }
        ]
      });
    }
    default:
      return state;
  }
};
