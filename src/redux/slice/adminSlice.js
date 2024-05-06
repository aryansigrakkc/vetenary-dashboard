import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../thunks/adminThunk";

const adminSlice = createSlice({
  name: "Dashboard",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
      
  },
});

export default adminSlice.reducer;