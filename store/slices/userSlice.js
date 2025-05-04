import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  events: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.events = action.payload.events;
    },
    clearUser(state) {
      state.id = null;
      state.username = null;
      state.events = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
