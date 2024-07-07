import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Define the async thunk for fetching groceries
export const fetchProductsByCategories = createAsyncThunk(
  'products/fetchGroceries',
  async ({ skip = 5, limit = 4, category } = {}) => {
    console.log(category);
    const response = await axiosInstance.get(`/products/category/${category}?skip=${skip}&limit=${limit}`);
    return response.data.products;
  }
);


const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const grocerieSlice = createSlice({
  name: 'groceries',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategories.pending, (state) => {
        console.log('fetchGroceries pending');
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategories.fulfilled, (state, action) => {

        state.status = 'succeeded';
        state.items = action.payload;
        console.log('fetchGroceries fulfilled', state.items);
      })
      .addCase(fetchProductsByCategories.rejected, (state, action) => {
        console.log('fetchGroceries rejected', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectGroceries = (state) => state.groceries;

export default grocerieSlice.reducer;
