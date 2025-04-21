import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const AppDownload = () => {
  const features = [
    { icon: "🚚", text: "Faster delivery tracking" },
    { icon: "💰", text: "Exclusive in-app discounts" },
    { icon: "🔔", text: "Real-time order notifications" },
    { icon: "⭐", text: "Loyalty rewards program" }
  ];

  return (
    <section 
      className="bg-gradient-to-r from-orange-50 to-orange-100 py-16 px-4 sm:px-8 md:px-16 mt-16 rounded-xl shadow-lg mx-4 md:mx-20 overflow-hidden relative"
      id="mobile-app"
    >
      {/* Mobile phone mockup */}
      <div className="absolute -right-12 bottom-0 hidden lg:block">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[380px] w-[200px] bg-black rounded-[40px] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400 to-red-500 opacity-40"></div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center pt-8">
              <div className="w-16 h-2 bg-gray-800 rounded-full"></div>
              <div className="mt-6 w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-4xl">🍅</span>
              </div>
              <div className="mt-4 text-white text-center font-bold">
                <p>Tomato</p>
                <p className="text-xs opacity-80">Food Delivery</p>
              </div>
              <div className="mt-8 w-3/4 h-px bg-white opacity-20"></div>
              <div className="mt-4 w-3/4 h-2 bg-white opacity-20 rounded-full"></div>
              <div className="mt-4 w-3/4 h-2 bg-white opacity-20 rounded-full"></div>
              <div className="mt-4 w-3/4 h-2 bg-white opacity-20 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-orange-200 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">Mobile App</span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-6">
              Enjoy a Better Experience with the <span className="text-orange-500">Tomato App</span>
            </h2>
            
            <p className="text-gray-700 mb-8 text-lg">
              Order your favorite food, track deliveries in real-time, and get exclusive discounts. 
              Download our app now for the best food delivery experience!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center bg-white bg-opacity-60 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <p className="text-gray-800 font-medium">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                <img
                  src={assets.play_store}
                  alt="Google Play"
                  className="w-40 sm:w-44 shadow-md rounded-lg"
                />
                <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-5 rounded-lg transition-all duration-300"></div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                <img
                  src={assets.app_store}
                  alt="App Store"
                  className="w-40 sm:w-44 shadow-md rounded-lg"
                />
                <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-5 rounded-lg transition-all duration-300"></div>
              </motion.div>
              
              <div className="flex items-center ml-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-orange-${i*100} flex items-center justify-center text-xs font-bold text-white`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className="ml-2 text-sm text-gray-700">
                  <strong>10K+</strong> downloads
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QR code for mobile view */}
        <div className="flex justify-center items-center lg:hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
              <div className="w-32 h-32 bg-white p-2">
                <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-0.5">
                  {/* Simple QR code pattern */}
                  {Array(25).fill(null).map((_, i) => (
                    <div 
                      key={i} 
                      className={`${
                        [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24].includes(i) ? 
                        'bg-black' : 'bg-white'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-sm font-medium text-gray-800">Scan to download</p>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-8 -left-8 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-30"></div>
      <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-20"></div>
    </section>
  );
};

export default AppDownload;