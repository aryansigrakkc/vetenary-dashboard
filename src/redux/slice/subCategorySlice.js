import { createSlice } from "@reduxjs/toolkit";
import { changeSubCategoryStatus, createSubCategory,fetchSubCategory,fetchAllSubCategory,fetchDeletedSubCategory,fetchInactiveSubCategory,restoreSubCategory,deleteSubCategory,changeSubCategoryImage, updateSubCategory } from "../thunks/subCategoryThunk";

const subCategorySlice = createSlice({
  name: "Admin/SubCategory",
  initialState: {
    data: {},
    isLoading:false,
    isError:false
  },
  
  reducers: {},
  extraReducers: (builder) => {
    /*-----------Create New SubCategory---------------*/ 
    builder
      .addCase(createSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Fetch All SubCategory---------------*/ 
      .addCase(fetchSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Dropdown SubCategory---------------*/ 
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Inactive SubCategory---------------*/ 

      .addCase(fetchInactiveSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInactiveSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchInactiveSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Fetch All Deleted SubCategory---------------*/ 
      .addCase(fetchDeletedSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeletedSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeletedSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Update SubCategory Status---------------*/ 
      .addCase(changeSubCategoryStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeSubCategoryStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeSubCategoryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      /*-----------Restore Deleted SubCategory---------------*/ 
      .addCase(restoreSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(restoreSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      /*-----------Delete SubCategory---------------*/ 
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update SubCategory Image---------------*/ 
      .addCase(changeSubCategoryImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeSubCategoryImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeSubCategoryImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

    /*-----------Update SubCategory---------------*/ 
      .addCase(updateSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default subCategorySlice.reducer;