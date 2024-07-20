import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createBanner = createAsyncThunk(
  "banner/create",
  async (e) => {
    const response = await utility.post(`banner/create/banner`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchBanner = createAsyncThunk(
  "banner/all",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`banner/all/banner`);
    const response = await utility.get(url);
    return response.data;
  }
);


const fetchInactiveBanner = createAsyncThunk(
  "banner/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`banner/get-all-inactive/banner`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedBanner = createAsyncThunk(
  "banner/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch},`banner/get-all-deleted/banner`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeBannerStatus = createAsyncThunk(
  "banner/status",
  async (e) => {
    const response = await utility.patch(`banner/update-status/banner`,e);
    return response.data;
  }
);

const restoreBanner = createAsyncThunk(
  "banner/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`banner/restore/deleted/banner/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteBanner = createAsyncThunk(
  "banner/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`banner/delete/banner/${mainObjectId}`);
    return response.data;
  }
);

const changeBannerImage = createAsyncThunk(
  "banner/changeImage",
  async (e) => {
    const response = await utility.patch(`banner/update-image/banner`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateBanner = createAsyncThunk(
  "banner/update",
  async (e) => {
    const response = await utility.patch(`banner/update/banner`,e);
    return response.data;
  }
);


export  {createBanner,fetchBanner,changeBannerStatus,fetchInactiveBanner,fetchDeletedBanner,restoreBanner,deleteBanner,changeBannerImage,updateBanner};