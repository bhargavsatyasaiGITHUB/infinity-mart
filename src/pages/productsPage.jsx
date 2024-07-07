import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setSearchQuery, selectProducts } from '../features/products/productsSlice';
import Product from '../components/ProductCard';
import Loader from '../components/loader/loader'
import Pagination from '../components/pagination';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, status, error, searchQuery } = useSelector(selectProducts);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    if (items) {
      setItemsCount(items.length);
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        items.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [items, searchQuery]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=''>
      {status === 'loading' ? (
        <div className='h-[90vh] flex items-center justify-center'>
          <Loader />
        </div>

      ) : (
        <div className='flex items-center flex-col justify-start'>
          <div className='flex items-center justify-between pt-10 px-4 w-full max-w-screen-xl'>
            <form className="flex items-center w-[400px] ">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                  </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5   dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search branch name..." required />
              </div>
              <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>

            <Pagination />
          </div>

          <div className="grid grid-cols-1 max-w-screen-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
            {filteredItems.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>

      )}
    </div>
  );
};

export default ProductsPage;
