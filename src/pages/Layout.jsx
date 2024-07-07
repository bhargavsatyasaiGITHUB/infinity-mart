import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import CTABanner from '../components/CTABanner';

function Layout() {
  return (
    <div className='relative w-full spacey-5'>
      <CTABanner />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;
