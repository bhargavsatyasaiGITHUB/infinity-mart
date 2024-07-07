import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axiosInstance.get('/products?limit=50&skip=10');
    return response.data.products;
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

const initialState = {
  items: [],
  singleProduct: null,
  status: 'idle',
  error: null,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;  // Set the search query
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts actions
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;  // Update products list
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Set the error message
      })
      // Handle fetchProductById actions
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleProduct = action.payload;  // Update single product detail
        console.log(action.payload)
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // Set the error message
      });
  },
});

export const { setSearchQuery } = productsSlice.actions;

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
