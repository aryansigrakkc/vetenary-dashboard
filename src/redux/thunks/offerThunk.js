import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createOffer = createAsyncThunk(
  "offer/create",
  async (e) => {
    const response = await utility.post(`offer/create/offer`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchOffer = createAsyncThunk(
  "offer/all",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`offer/all/offer`);
    const response = await utility.get(url);
    return response.data;
  }
);


const fetchInactiveOffer = createAsyncThunk(
  "offer/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`offer/get-all-inactive/offer`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedOffer = createAsyncThunk(
  "offer/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`offer/get-all-deleted/offer`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeOfferStatus = createAsyncThunk(
  "offer/status",
  async (e) => {
    const response = await utility.patch(`offer/update-status/offer`,e);
    return response.data;
  }
);

const restoreOffer = createAsyncThunk(
  "offer/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`offer/restore/deleted/offer/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteOffer = createAsyncThunk(
  "offer/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`offer/delete/offer/${mainObjectId}`);
    return response.data;
  }
);

const changeOfferImage = createAsyncThunk(
  "offer/changeImage",
  async (e) => {
    const response = await utility.patch(`offer/update-image/offer`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateOffer = createAsyncThunk(
  "offer/update",
  async (e) => {
    const response = await utility.patch(`offer/update/offer`,e);
    return response.data;
  }
);


export  {createOffer,fetchOffer,changeOfferStatus,fetchInactiveOffer,fetchDeletedOffer,restoreOffer,deleteOffer,changeOfferImage,updateOffer};