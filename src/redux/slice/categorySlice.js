import { createSlice } from "@reduxjs/toolkit";
import { changeCategoryStatus, createCategory,fetchCategory,fetchDeletedCategory,fetchInactiveCategory,restoreCategory,deleteCategory,changeCategoryImage, updateCategory } from "../thunks/categoryThunk";

const categorySlice = createSlice({
  name: "Admin/Category",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(fetchInactiveCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(fetchDeletedCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      
      .addCase(changeCategoryStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeCategoryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(restoreCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(changeCategoryImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeCategoryImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeCategoryImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      ;
      
      
  },
});

export default categorySlice.reducer;