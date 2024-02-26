import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(actions.getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
