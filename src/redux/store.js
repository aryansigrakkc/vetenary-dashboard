import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slice/headerSlice";
import adminSlice from "./slice/adminSlice";
import categorySlice from "./slice/categorySlice";
import brandSlice from "./slice/brandSlice";
import subCategorySlice from "./slice/subCategorySlice";
import bannerSlice from "./slice/bannerSlice";
import productSlice from "./slice/productSlice";
import offerSlice from "./slice/offerSlice";
import orderSlice from "./slice/orderSlice";

const store = configureStore({
    reducer:{
      header:headerSlice,
      admin:adminSlice,
      category:categorySlice,
      subcategory:subCategorySlice,
      brand:brandSlice,
      banner:bannerSlice,
      product:productSlice,
      offer:offerSlice,
      order:orderSlice,

    }
  });

export default store;