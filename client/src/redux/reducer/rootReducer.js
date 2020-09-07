import { combineReducers } from "redux";
import user from "./userReducer";

const allReducers = combineReducers({
  user,
});

export default allReducers;
