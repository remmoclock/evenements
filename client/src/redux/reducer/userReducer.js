import { REGISTER_USER } from "../types/types";

const initState = {
  user: null,
  loading: true,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
