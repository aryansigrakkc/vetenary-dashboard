/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createCategory = createAsyncThunk(
  "category/create",
  async (e) => {
    const response = await utility.post(`category/create/category`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchCategory = createAsyncThunk(
  "category/all",
  async ({activepage,recperpage,inputSearch}) => {
  const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`category/all/category`);
    const response = await utility.get(url);
    return response.data;
  }
);
const fetchAllCategory = createAsyncThunk(
  "category/all-category",
  async (name) => {
    const url = apiWithParams({name},`category/fetch/category`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchInactiveCategory = createAsyncThunk(
  "category/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`category/get-all-inactive/category`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedCategory = createAsyncThunk(
  "category/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`category/get-all-deleted/category`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeCategoryStatus = createAsyncThunk(
  "category/status",
  async (e) => {
    const response = await utility.patch(`category/update-status/category`,e);
    return response.data;
  }
);

const restoreCategory = createAsyncThunk(
  "category/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`category/restore/deleted/category/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteCategory = createAsyncThunk(
  "category/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`category/delete/category/${mainObjectId}`);
    return response.data;
  }
);

const changeCategoryImage = createAsyncThunk(
  "category/changeImage",
  async (e) => {
    const response = await utility.patch(`category/update-image/category`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateCategory = createAsyncThunk(
  "category/update",
  async (e) => {
    const response = await utility.patch(`category/update/category`,e);
    return response.data;
  }
);


export  {createCategory,fetchCategory,fetchAllCategory,changeCategoryStatus,fetchInactiveCategory,fetchDeletedCategory,restoreCategory,deleteCategory,changeCategoryImage,updateCategory};