import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiUrl = 'https://66e43ca0d2405277ed13a2ac.mockapi.io/api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
