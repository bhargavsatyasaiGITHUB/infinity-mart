// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import groceryReducer from './features/products/groceriesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    groceries: groceryReducer
  },
});

export default store;
