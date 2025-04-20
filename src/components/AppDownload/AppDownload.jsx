import React from 'react';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16 px-4 sm:px-8 md:px-16 mt-16 rounded-xl shadow-md mx-4 md:mx-20" id='mobile-app'>
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
          For a Better Experience, Download the <span className="text-orange-500">Tomato App</span>
        </p>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <img
            src={assets.play_store}
            alt="Google Play"
            className="w-40 sm:w-44 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <img
            src={assets.app_store}
            alt="App Store"
            className="w-40 sm:w-44 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
