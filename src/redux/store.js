import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slice/headerSlice";
import adminSlice from "./slice/adminSlice";
import categorySlice from "./slice/categorySlice";
import brandSlice from "./slice/brandSlice";
import subCategorySlice from "./slice/subCategorySlice";

const store = configureStore({
    reducer:{
      header:headerSlice,
      admin:adminSlice,
      category:categorySlice,
      subcategory:subCategorySlice,
      brand:brandSlice,
    }
  });

export default store;