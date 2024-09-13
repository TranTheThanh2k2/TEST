import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../axiosClient';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosClient.get('/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axiosClient.post('/products', newProduct);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axiosClient.delete(`/products/${productId}`);
  return productId; 
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  const { id, ...productData } = updatedProduct;
  const response = await axiosClient.put(`/products/${id}`, productData);
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); 
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; 
        }
      });
  },
});

export default productSlice.reducer;
