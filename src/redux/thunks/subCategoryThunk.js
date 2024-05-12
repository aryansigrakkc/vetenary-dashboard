import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";

const createSubCategory = createAsyncThunk(
  "subcategory/create",
  async (e) => {
    const response = await utility.post(`category/create/category`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchSubCategory = createAsyncThunk(
  "subcategory/all",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`category/all/category?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const fetchInactiveSubCategory = createAsyncThunk(
  "subcategory/inactive",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`category/get-all-inactive/category?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const fetchDeletedSubCategory = createAsyncThunk(
  "subcategory/deleted",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`category/get-all-deleted/category?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const changeSubCategoryStatus = createAsyncThunk(
  "subcategory/status",
  async (e) => {
    const response = await utility.patch(`category/update-status/category`,e);
    return response.data;
  }
);

const restoreSubCategory = createAsyncThunk(
  "subcategory/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`category/restore/deleted/category/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteSubCategory = createAsyncThunk(
  "subcategory/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`category/delete/category/${mainObjectId}`);
    return response.data;
  }
);

const changeSubCategoryImage = createAsyncThunk(
  "subcategory/changeImage",
  async (e) => {
    const response = await utility.patch(`category/update-image/category`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateSubCategory = createAsyncThunk(
  "subcategory/update",
  async (e) => {
    const response = await utility.patch(`category/update/category`,e);
    return response.data;
  }
);


export  {createSubCategory,fetchSubCategory,changeSubCategoryStatus,fetchInactiveSubCategory,fetchDeletedSubCategory,restoreSubCategory,deleteSubCategory,changeSubCategoryImage,updateSubCategory};