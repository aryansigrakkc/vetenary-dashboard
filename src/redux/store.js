import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slice/headerSlice";
import adminSlice from "./slice/adminSlice";

const store = configureStore({
    reducer:{
      header:headerSlice,
      admin:adminSlice
    }
  });

export default store;