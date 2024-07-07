import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, selectProducts } from '../features/products/productsSlice';
import Loader from '../components/loader/loader';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, status, error } = useSelector(selectProducts);

  // Fetch the product details based on the product ID
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  // Extract data from singleProduct and handle loading state
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = singleProduct?.images || [];  // Assuming 'images' is an array in product details
  const title = singleProduct?.title || '';
  const price = singleProduct?.price || 0;
  const description = singleProduct?.description || '';

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        handleNext();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };


  if (status === 'loading') {
    return <div className='flex items-center justify-center h-[70vh]'><Loader /></div>;
  }

  if (status === 'failed') {
    return <section className='h-screen flex justify-center items-center'>Error: {error}</section>;
  }

  if (!singleProduct) {
    return <section className='h-screen flex justify-center items-center'>No Product Found</section>;
  }

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <div className="relative w-full">
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0  transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    data-carousel-item
                  >
                    <img className="max-w-[200px] lg:max-w-sm mx-auto" src={image} alt={title} />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-20 h-20 border rounded-md overflow-hidden ${index === currentIndex ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img className="w-full h-full object-cover" src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>

            </div>

          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
            <p className='mb-8'>{description}</p>
            <button onClick={() => { /* handle add to cart */ }} className='bg-primary py-4 px-8 text-white'>Add To Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
