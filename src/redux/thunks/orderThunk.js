import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const fetchOrder = createAsyncThunk(
  "order/all",
  async ({activepage,recperpage,inputSearch,status}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim(),status},`order/all/order`);
    const response = await utility.get(url);
    return response.data;
  }
);

const getOrderDetails = createAsyncThunk(
    "product/details-product",
    async (productId) => {
      const response = await utility.get(`product/get/product/details/${productId}`);
      return response.data;
    }
  );

const changeOrderStatus = createAsyncThunk(
  "order/status",
  async (e) => {
    const response = await utility.patch(`order/update-status/order`,e);
    return response.data;
  }
);


export  {fetchOrder,changeOrderStatus,getOrderDetails};