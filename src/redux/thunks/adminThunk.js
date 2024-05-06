import { createAsyncThunk } from "@reduxjs/toolkit";

import utility from "../../services/utility";

const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials) => {
    const response = await utility.post(`admin/login`,credentials);
    return response.data;
  }
);

export  {loginAdmin};