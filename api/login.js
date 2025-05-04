// api/login.js
import Axios from "../network/Axios";

const login = async (email, password) => {
  const response = await Axios.get("/login", {
    params: {
      email: email,
      password: password,
    },
  });
  return response.data;
};

const registerUser = async (eventId, userId) => {
  const userResponse = await Axios.get(`/login/${userId}`);
  const currentUser = userResponse.data;

  const updatedEvents = Array.isArray(currentUser.registeredEventIds) // check if registeredEventIds is an array
    ? [...new Set([...currentUser.registeredEventIds, eventId])] // use Set to avoid duplicates
    : [eventId]; // if it's not an array, create a new one with the eventId

  const response = await Axios.put(`/login/${userId}`, {
    registeredEventIds: updatedEvents,
  });
  return response.data;
};

export const loginService = {
  login,
  registerUser,
};
