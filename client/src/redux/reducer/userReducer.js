import { REGISTER_USER, LOGIN_USER, LOAD_USER, LOGOUT } from "../types/types";

const initState = {
  user: null,
  token: localStorage.getItem("userToken"),
  loading: true,
};

const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("userToken", payload.token);
      return {
        ...state,
        token: localStorage.userToken,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("userToken");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
