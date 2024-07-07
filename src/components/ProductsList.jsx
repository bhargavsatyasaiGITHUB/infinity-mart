import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategories, selectGroceries } from '../features/products/groceriesSlice';
import Loader from './loader/loader';
import Product from './ProductCard';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(selectGroceries);

  useEffect(() => {
    dispatch(fetchProductsByCategories(category));
  }, [dispatch, category]);

  return (
    <div className='p-4 w-full max-w-screen-xl mx-auto'>
      {status === 'loading' && (
        <div className="h-96 w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div className=' max-w-screen-xl  p-4'>
          <h2 className='mb-2 text-xl font-semibold'>Groceries</h2>
          <hr class="h-px mb-4 bg-[#FF7F00] border-0"></hr>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>

      )}
    </div>
  );
};

export default ProductList;
