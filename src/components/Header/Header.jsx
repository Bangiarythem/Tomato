import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center relative overflow-hidden
      mx-4 md:mx-8 my-6 rounded-2xl shadow-xl"
      style={{ backgroundImage: `url(${assets.header_img})` }}
      id="home"
    >
      {/* Dark overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      
      {/* Content container with animation */}
      <div 
        className={`relative max-w-xl text-left p-6 md:p-10 ml-4 md:ml-16 rounded-xl 
        transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } fade-in`}
      >
        {/* "Special Offer" badge */}
        <div className="inline-block px-3 py-1 bg-orange-500 text-white text-sm rounded-full mb-6 font-medium">
          Limited Time Offer 🔥
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="text-orange-500 hover:text-orange-400 transition cursor-pointer">
            Order
          </span>{' '}
          your Favourite 
          <span className="block mt-2">Food Here</span>
        </h1>
        
        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 font-medium max-w-md">
          Choose from a diverse menu featuring dishes crafted with the finest 
          ingredients. Elevate your dining experience, one delicious meal at a time.
        </p>
        
        {/* Call-to-action buttons */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={scrollToMenu}
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 
            transition text-sm sm:text-base font-medium flex items-center gap-2 shadow-lg"
          >
            View Menu
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex gap-6 mt-10">
          <div className="text-center">
            <p className="text-orange-500 font-bold text-xl md:text-2xl">4.9</p>
            <p className="text-white text-xs">Star Rating</p>
          </div>
          <div className="text-center">
            <p className="text-orange-500 font-bold text-xl md:text-2xl">30</p>
            <p className="text-white text-xs">Min Delivery</p>
          </div>
          <div className="text-center">
            <p className="text-orange-500 font-bold text-xl md:text-2xl">300+</p>
            <p className="text-white text-xs">Dishes</p>
          </div>
        </div>
      </div>
      
      {/* Floating food images with animations */}
      <div className="hidden lg:block absolute right-20 top-1/2 transform -translate-y-1/2">
        <div className="relative">
          <div className="absolute -right-20 -top-40 animate-pulse" style={{animationDuration: '3s'}}>
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full bg-cover bg-center" 
                style={{backgroundImage: `url(${assets.food_1 || assets.header_img})`}}></div>
            </div>
          </div>
          <div className="absolute right-0 top-20 animate-pulse" style={{animationDuration: '4s'}}>
            <div className="w-40 h-40 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full bg-cover bg-center" 
                style={{backgroundImage: `url(${assets.food_2 || assets.header_img})`}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

export default Header;