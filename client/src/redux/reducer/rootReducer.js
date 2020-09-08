import { combineReducers } from "redux";
import user from "./userReducer";
import event from "./eventReducer";

const allReducers = combineReducers({
  user,
  event,
});

export default allReducers;
