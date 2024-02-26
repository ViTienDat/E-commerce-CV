import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getProducts = createAsyncThunk(
  "products/all",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
