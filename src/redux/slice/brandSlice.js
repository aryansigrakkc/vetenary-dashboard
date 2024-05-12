import { createSlice } from "@reduxjs/toolkit";
import { changeBrandStatus, createBrand,fetchBrand,fetchDeletedBrand,fetchInactiveBrand,restoreBrand,deleteBrand,changeBrandImage, updateBrand } from "../thunks/brandThunk";

const brandSlice = createSlice({
  name: "Admin/Brand",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New Brand---------------*/ 
    builder
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Brand---------------*/ 
      .addCase(fetchBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Inactive Brand---------------*/ 

      .addCase(fetchInactiveBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted Brand---------------*/ 
      .addCase(fetchDeletedBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Brand Status---------------*/ 
      .addCase(changeBrandStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeBrandStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeBrandStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted Brand---------------*/ 
      .addCase(restoreBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete Brand---------------*/ 
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Brand Image---------------*/ 
      .addCase(changeBrandImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeBrandImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeBrandImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Brand---------------*/ 
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default brandSlice.reducer;