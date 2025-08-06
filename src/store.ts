import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.ts";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
