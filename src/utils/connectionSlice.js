/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
  },
});
export const { addConnections, removeConnection } = ConnectionSlice.actions;

export default ConnectionSlice.reducer;
