import { createSlice } from "@reduxjs/toolkit";
import { changeOrderStatus,fetchOrder,getOrderDetails } from "../thunks/orderThunk";

const OrderSlice = createSlice({
  name: "Admin/Banner",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
      /*-----------Fetch All Order---------------*/ 
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Order Status---------------*/ 
      .addCase(changeOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Get Order Details---------------*/ 
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default OrderSlice.reducer;