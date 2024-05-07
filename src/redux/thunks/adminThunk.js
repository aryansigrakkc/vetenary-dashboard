import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";
const token = window.localStorage.getItem('token');
const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials) => {
    const response = await utility.post(`admin/login`,credentials);
    return response.data;
  }
);

const logoutAdmin = createAsyncThunk(
  "admin/logout",
  async (credentials) => {
    const response = await utility.post(`admin/logut`,{},{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
);

export  {loginAdmin,logoutAdmin};