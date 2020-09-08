import { GET_EVENTS } from "../types/types";

const initState = {
  events: null,
  event: null,
  loading: true,
};

const eventReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default eventReducer;
