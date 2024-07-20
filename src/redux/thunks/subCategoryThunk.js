import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createSubCategory = createAsyncThunk(
  "subcategory/create",
  async (e) => {
    const response = await utility.post(`subcategory/create/subcategory`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchSubCategory = createAsyncThunk(
  "subcategory/all",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`subcategory/all/subcategory`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchAllSubCategory = createAsyncThunk(
  "subcategory/all-subcategory",
  async (categoryId) => {
    const response = await utility.get(`subcategory/fetch/subcategory/${categoryId}`);
    return response.data;
  }
);

const fetchInactiveSubCategory = createAsyncThunk(
  "subcategory/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`subcategory/get-all-inactive/subcategory`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedSubCategory = createAsyncThunk(
  "subcategory/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`subcategory/get-all-deleted/subcategory`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeSubCategoryStatus = createAsyncThunk(
  "subcategory/status",
  async (e) => {
    const response = await utility.patch(`subcategory/update-status/subcategory`,e);
    return response.data;
  }
);

const restoreSubCategory = createAsyncThunk(
  "subcategory/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`subcategory/restore/deleted/subcategory/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteSubCategory = createAsyncThunk(
  "subcategory/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`subcategory/delete/subcategory/${mainObjectId}`);
    return response.data;
  }
);

const changeSubCategoryImage = createAsyncThunk(
  "subcategory/changeImage",
  async (e) => {
    const response = await utility.patch(`subcategory/update-image/subcategory`,e,{
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
    const response = await utility.patch(`subcategory/update/subcategory`,e);
    return response.data;
  }
);


export  {createSubCategory,fetchSubCategory,changeSubCategoryStatus,fetchInactiveSubCategory,fetchDeletedSubCategory,restoreSubCategory,deleteSubCategory,changeSubCategoryImage,updateSubCategory,fetchAllSubCategory};