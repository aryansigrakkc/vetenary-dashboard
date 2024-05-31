import { createSlice } from "@reduxjs/toolkit";
import { changeProductStatus, createProduct,fetchProduct,fetchDeletedProduct,fetchInactiveProduct,restoreProduct,deleteProduct,changeProductImage, updateProduct } from "../thunks/productThunk";

const productSlice = createSlice({
  name: "Admin/Product",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New Product---------------*/ 
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All Product---------------*/ 
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All InactiveProduct---------------*/ 

      .addCase(fetchInactiveProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted Product---------------*/ 
      .addCase(fetchDeletedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update Product Status---------------*/ 
      .addCase(changeProductStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProductStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeProductStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted Product---------------*/ 
      .addCase(restoreProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete Product---------------*/ 
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Product Image---------------*/ 
      .addCase(changeProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProductImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeProductImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update Product---------------*/ 
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;