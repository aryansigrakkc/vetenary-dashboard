/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
import { apiWithParams } from "../../utils";

const createClient = createAsyncThunk(
  "client/create",
  async (e) => {
    const response = await utility.post(`client/create/client`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const fetchClient = createAsyncThunk(
  "client/all",
  async ({activepage,recperpage,inputSearch}) => {
  const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`client/all/client`);
    const response = await utility.get(url);
    return response.data;
  }
);
const fetchAllClient = createAsyncThunk(
  "client/all-Client",
  async (name) => {
    const url = apiWithParams({name},`client/fetch/client`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchInactiveClient = createAsyncThunk(
  "client/inactive",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`client/get-all-inactive/client`);
    const response = await utility.get(url);
    return response.data;
  }
);

const fetchDeletedClient = createAsyncThunk(
  "client/deleted",
  async ({activepage,recperpage,inputSearch}) => {
    const url = apiWithParams({"page":activepage,"limit":recperpage,name:inputSearch.trim()},`client/get-all-deleted/client`);
    const response = await utility.get(url);
    return response.data;
  }
);

const changeClientStatus = createAsyncThunk(
  "client/status",
  async (e) => {
    const response = await utility.patch(`client/update-status/client`,e);
    return response.data;
  }
);

const restoreClient = createAsyncThunk(
  "client/restore",
  async ({activepage,recperpage,mainObjectId}) => {
    const response = await utility.patch(`client/restore/deleted/client/${mainObjectId}?limit=${recperpage}&page=${activepage}`);
    return response.data;
  }
);

const deleteClient = createAsyncThunk(
  "client/delete",
  async ({mainObjectId}) => {
    const response = await utility.delete(`client/delete/client/${mainObjectId}`);
    return response.data;
  }
);

const changeClientImage = createAsyncThunk(
  "client/changeImage",
  async (e) => {
    const response = await utility.patch(`client/update-image/client`,e,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
    return response.data;
  }
);

const updateClient = createAsyncThunk(
  "client/update",
  async (e) => {
    const response = await utility.patch(`client/update/client`,e);
    return response.data;
  }
);


export  {createClient,fetchClient,fetchAllClient,changeClientStatus,fetchInactiveClient,fetchDeletedClient,restoreClient,deleteClient,changeClientImage,updateClient};