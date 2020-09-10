import axios from "axios"
import { GET_EVENTS, GET_EVENT, UPDATE_EVENT } from "../types/types"

export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/events")
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/events/${id}`)
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const addComment = (eventId, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/events/${eventId}/comment`, text, config)
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    })
  } catch (error) {
    console.log(error.message)
  }
}
