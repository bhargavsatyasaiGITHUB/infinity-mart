import React from 'react';
import ProductsPage from './pages/productsPage'
import { Provider } from 'react-redux'
import store from './store'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import ProductDetails from './pages/productDetails';
import Home from './pages/Home';
import LoginPage from './pages/Sigin'

const App = () => {
  return (
    <Provider store={store}>

      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path="/shopping" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
        <Route path='/sign-in' element={<LoginPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
