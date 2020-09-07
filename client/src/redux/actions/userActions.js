import axios from "axios";
import { REGISTER_USER } from "../types/types";

export const registerUser = formData => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/users", formData, config);
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
