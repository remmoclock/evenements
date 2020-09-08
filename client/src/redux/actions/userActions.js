import axios from "axios";
import { REGISTER_USER, LOGIN_USER, LOAD_USER, LOGOUT } from "../types/types";
import setAuth from "../../utils/setAuth";

export const registerUser = (formData, history) => async (dispatch) => {
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
    dispatch(loadUser());
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const loginUser = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth", formData, config);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
    dispatch(loadUser());
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.userToken) {
    setAuth(localStorage.userToken);
  }
  try {
    const res = await axios.get("/api/users");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (history) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history.push("/login");
};
