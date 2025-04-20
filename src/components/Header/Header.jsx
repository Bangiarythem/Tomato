import React from 'react';
import { assets } from '../../assets/assets';

function Header() {
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-start 
      px-4 sm:px-8 md:pl-16 mx-4 md:mx-[30px] my-6 rounded-2xl shadow-lg"
      style={{ backgroundImage: `url(${assets.header_img})`, borderRadius: '1rem' }} id='home'
    >
      <div className="max-w-xl text-left bg-black/50 p-4 sm:p-6 rounded-xl fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          <span className="text-orange-500 hover:text-orange-400 transition cursor-pointer">
            Order
          </span>{' '}
          your Favourite Food Here
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 font-semibold sm:font-bold">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
          ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate
          your dining experience, one delicious meal at a time.
        </p>
        <button className="bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-orange-700 transition text-sm sm:text-base">
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Header;
