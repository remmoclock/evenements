import { GET_EVENTS, GET_EVENT, UPDATE_EVENT } from "../types/types"

const initState = {
  events: null,
  event: null,
  loading: true,
}

const eventReducer = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        event: null,
        loading: false,
      }
    case UPDATE_EVENT:
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default eventReducer
