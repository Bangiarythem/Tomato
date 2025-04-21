// Implementation for PlaceOrder.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StoreContext } from '../../context/StoreContext';

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'card',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your request and will begin preparing your delicious meal soon!
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-sm text-gray-500">Estimated delivery: 30-45 minutes</p>
          </div>
          <Link to="/">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition font-medium">
              Return to Home
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-10"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Order summary */}
          <div className="bg-orange-50 p-8 md:w-2/5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{getTotalCartAmount()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₹30</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{(getTotalCartAmount() * 0.05).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹{(getTotalCartAmount() + 30 + getTotalCartAmount() * 0.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Estimated delivery */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-xs text-gray-500">30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Checkout form */}
          <div className="p-8 md:w-3/5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your full address"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span className="text-xs mt-1">Card</span>
                  </div>
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${formData.paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-xs mt-1">Cash</span>
                  </div>
                  <div 
                    className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${formData.paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'wallet'})}
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                    <span className="text-xs mt-1">UPI</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 mt-6">
                <Link to="/cart">
                  <button type="button" className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition">
                    Back to Cart
                  </button>
                </Link>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition font-medium"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PlaceOrder;