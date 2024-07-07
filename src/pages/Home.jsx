import React from 'react'
import banner from '../assets/banner.jpeg'
import ProductList from '../components/ProductsList'

const Home = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <img src={banner} alt="Banner" style={{ width: '1200px' }} className='md:h-96 sm:h-80 h-60 object-cover' />
      <ProductList category="groceries" />
    </div>


  )
}

export default Home
