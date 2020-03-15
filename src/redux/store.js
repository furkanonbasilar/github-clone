import { combineReducers } from "redux";
import userReducer from "redux/repos/reducer";
import appStateReducer from "redux/appState/reducer";

const rootReducers = combineReducers({
  appState: appStateReducer,
  repos: userReducer
});

export default rootReducers;
