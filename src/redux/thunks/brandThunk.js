import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";

const createBrand = createAsyncThunk(
  "brand/create",
  async (e) => {
    const response = await utility.post(`brand/create/brand`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchBrand = createAsyncThunk(
  "brand/all",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`brand/all/brand?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);
const fetchAllBrand = createAsyncThunk(
  "fetch/all/brand",
  async () => {
    const response = await utility.get(`brand/fetch/all/brand`);
    return response.data;
  }
);

const fetchInactiveBrand = createAsyncThunk(
  "brand/inactive",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`brand/get-all-inactive/brand?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const fetchDeletedBrand = createAsyncThunk(
  "brand/deleted",
  async ({activepage,recperpage}) => {
    const response = await utility.get(`brand/get-all-deleted/brand?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const changeBrandStatus = createAsyncThunk(
  "brand/status",
  async (e) => {
    const response = await utility.patch(`brand/update-status/brand`,e);
    return response.data;
  }
);

const restoreBrand = createAsyncThunk(
  "brand/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`brand/restore/deleted/brand/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteBrand = createAsyncThunk(
  "brand/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`brand/delete/brand/${mainObjectId}`);
    return response.data;
  }
);

const changeBrandImage = createAsyncThunk(
  "brand/changeImage",
  async (e) => {
    const response = await utility.patch(`brand/update-image/brand`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateBrand = createAsyncThunk(
  "brand/update",
  async (e) => {
    const response = await utility.patch(`brand/update/brand`,e);
    return response.data;
  }
);


export  {createBrand,fetchBrand,fetchAllBrand,changeBrandStatus,fetchInactiveBrand,fetchDeletedBrand,restoreBrand,deleteBrand,changeBrandImage,updateBrand};