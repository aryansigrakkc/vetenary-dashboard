import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createProduct = createAsyncThunk(
  "product/create",
  async (e) => {
    const response = await utility.post(`product/create/product`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchProduct = createAsyncThunk(
  "product/all",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`product/all/product`);
    const response = await utility.get(url);
    return response.data;
  }
);
const fetchAllProduct = createAsyncThunk(
  "product/all-product",
  async () => {
    const response = await utility.get(`product/fetch/product`);
    return response.data;
  }
);

const productDetails = createAsyncThunk(
  "product/details-product",
  async (productId) => {
    const response = await utility.get(`product/get/product/details/${productId}`);
    return response.data;
  }
);

const fetchInactiveProduct = createAsyncThunk(
  "product/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`product/get-all-inactive/product`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedProduct = createAsyncThunk(
  "product/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`product/get-all-deleted/product`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeProductStatus = createAsyncThunk(
  "product/status",
  async (e) => {
    const response = await utility.patch(`product/update-status/product`,e);
    return response.data;
  }
);

const restoreProduct = createAsyncThunk(
  "product/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`product/restore/deleted/product/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`product/delete/product/${mainObjectId}`);
    return response.data;
  }
);

const changeProductImage = createAsyncThunk(
  "product/changeImage",
  async (e) => {
    const response = await utility.patch(`product/update-image/product`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateProduct = createAsyncThunk(
  "product/update",
  async (e) => {
    const response = await utility.patch(`product/update/product`,e);
    return response.data;
  }
);


export  {createProduct,fetchProduct,fetchAllProduct,changeProductStatus,fetchInactiveProduct,fetchDeletedProduct,restoreProduct,deleteProduct,changeProductImage,updateProduct,productDetails};