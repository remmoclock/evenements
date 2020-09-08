import axios from "axios";
import { GET_EVENTS } from "../types/types";

export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/events");
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
