import Axios from "../network/Axios";

const register = async (email, username, password) => {
  const response = await Axios.post("/login", {
    email: email,
    username: username,
    password: password,
  });
  return response.data;
};

export const registerService = {
  register,
};
