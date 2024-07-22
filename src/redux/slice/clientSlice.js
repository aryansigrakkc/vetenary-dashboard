import { createSlice } from "@reduxjs/toolkit";
import { changeClientStatus, createClient,fetchClient,fetchDeletedClient,fetchInactiveClient,restoreClient,deleteClient,changeClientImage, updateClient } from "../thunks/clientThunk";

const ClientSlice = createSlice({
  name: "Admin/Client",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New Client---------------*/ 
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Client---------------*/ 
      .addCase(fetchClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All InactiveClient---------------*/ 

      .addCase(fetchInactiveClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted Client---------------*/ 
      .addCase(fetchDeletedClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Client Status---------------*/ 
      .addCase(changeClientStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeClientStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeClientStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted Client---------------*/ 
      .addCase(restoreClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete Client---------------*/ 
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Client Image---------------*/ 
      .addCase(changeClientImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeClientImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeClientImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Client---------------*/ 
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default ClientSlice.reducer;