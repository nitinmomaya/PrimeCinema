import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../slice/homeSlice";
import userSlice from "../slice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    home: homeSlice,
  },
});

export default store;
