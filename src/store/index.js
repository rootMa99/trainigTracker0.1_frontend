import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice";

const store = configureStore({
  reducer: { login: login.reducer },
});

export default store;
