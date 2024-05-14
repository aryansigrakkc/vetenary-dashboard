import { createSlice } from "@reduxjs/toolkit";
import { changeBannerStatus, createBanner,fetchBanner,fetchDeletedBanner,fetchInactiveBanner,restoreBanner,deleteBanner,changeBannerImage, updateBanner } from "../thunks/bannerThunk";

const categorySlice = createSlice({
  name: "Admin/Banner",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New Category---------------*/ 
    builder
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Category---------------*/ 
      .addCase(fetchBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All InactiveCategory---------------*/ 

      .addCase(fetchInactiveBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted Category---------------*/ 
      .addCase(fetchDeletedBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Category Status---------------*/ 
      .addCase(changeBannerStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeBannerStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeBannerStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted Category---------------*/ 
      .addCase(restoreBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete Category---------------*/ 
      .addCase(deleteBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Category Image---------------*/ 
      .addCase(changeBannerImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeBannerImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Category---------------*/ 
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;