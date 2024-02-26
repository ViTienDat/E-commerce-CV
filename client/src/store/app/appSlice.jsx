import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(login.pending, (state) => {
    //   // Bật trạng thái loading
    //   state.isLoading = true;
    // });

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.message;
    });
  },
});

export const {} = appSlice.actions;

export default appSlice.reducer;