import Axios from "../network/Axios";

const events = async () => {
  const response = await Axios.get("/events");
  return response.data;
};

export const eventsService = {
  events,
};
