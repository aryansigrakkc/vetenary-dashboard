import { createSlice } from "@reduxjs/toolkit";
import { changeOfferStatus, createOffer,fetchOffer,fetchDeletedOffer,fetchInactiveOffer,restoreOffer,deleteOffer,changeOfferImage, updateOffer } from "../thunks/offerThunk";

const offerSlice = createSlice({
  name: "Admin/Banner",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New Offer---------------*/ 
    builder
      .addCase(createOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Offer---------------*/ 
      .addCase(fetchOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All InactiveOffer---------------*/ 

      .addCase(fetchInactiveOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted Offer---------------*/ 
      .addCase(fetchDeletedOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Offer Status---------------*/ 
      .addCase(changeOfferStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeOfferStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeOfferStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted Offer---------------*/ 
      .addCase(restoreOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete Offer---------------*/ 
      .addCase(deleteOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Offer Image---------------*/ 
      .addCase(changeOfferImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeOfferImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeOfferImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Offer---------------*/ 
      .addCase(updateOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default offerSlice.reducer;