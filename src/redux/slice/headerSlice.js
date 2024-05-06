import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'State',
    initialState:{
      sidebarShow: true,
      theme: 'light',
    },
    reducers: {
      changeState(state,action){
        Object.assign(state, action.payload);
      },
    },
  })
  
  export const { changeState } = headerSlice.actions
  export default headerSlice.reducer