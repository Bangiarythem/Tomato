import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DELIVERY_FEES = {
  Downtown: 2.99,
  Suburbs: 4.99,
  Outskirts: 7.99,
  Other: 5.99,
};

const PROMO_CODES = {
  "SAVE10": { type: "percentage", value: 0.1, display: "SAVE10 (10% OFF)" },
  "FLAT5": { type: "fixed", value: 5, display: "FLAT5 ($5 OFF)" },
  "FREESHIP": { type: "shipping", value: 1, display: "FREESHIP (Free Delivery)" }
};

const Cart = () => {
  const { cartItems, food_list, removeFromCart, updateCartItemQuantity, getTotalCartAmount } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [location, setLocation] = useState("Downtown");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Filter valid items in cart
  const itemsInCart = food_list.filter((item) => cartItems[item._id] > 0);
  
  // Calculate subtotal
  const subtotal = itemsInCart.reduce(
    (acc, item) => acc + item.price * cartItems[item._id],
    0
  );

  // Calculate delivery fee
  const baseDeliveryFee = DELIVERY_FEES[location] || DELIVERY_FEES.Other;
  const deliveryFee = appliedCode === "FREESHIP (Free Delivery)" ? 0 : baseDeliveryFee;

  // Calculate grand total
  const grandTotal = Math.max(subtotal + deliveryFee - discount, 0);

  // Handle promo code application
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const promoDetails = PROMO_CODES[code];
    
    if (promoDetails) {
      if (promoDetails.type === "percentage") {
        setDiscount(subtotal * promoDetails.value);
        setAppliedCode(promoDetails.display);
      } else if (promoDetails.type === "fixed") {
        setDiscount(promoDetails.value);
        setAppliedCode(promoDetails.display);
      } else if (promoDetails.type === "shipping") {
        setDiscount(0); // No direct discount but free shipping
        setAppliedCode(promoDetails.display);
      }
    } else {
      setDiscount(0);
      setAppliedCode("Invalid code ❌");
      
      // Auto-clear invalid code message after 3 seconds
      setTimeout(() => {
        if (appliedCode === "Invalid code ❌") {
          setAppliedCode("");
        }
      }, 3000);
    }
  };

  // Detect Enter key press for promo code
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  // Update quantity handler
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  // Simulate checkout process
  const handleCheckout = () => {
    if (itemsInCart.length === 0) return;
    
    setIsCheckingOut(true);
    // Reset after animation completes
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto py-8 px-4 min-h-screen"
    >
      <h2 className="text-4xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <span className="text-3xl">🛒</span> Your Cart
      </h2>

      {itemsInCart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100"
        >
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 rounded-xl shadow-md border border-gray-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-medium">
                <thead className="text-gray-600 bg-gray-50 border-b">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Total</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsInCart.map((item) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t hover:bg-gray-50 transition-all"
                    >
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-sm"
                        />
                      </td>
                      <td className="p-4 text-gray-900 font-semibold">
                        {item.name}
                      </td>
                      <td className="p-4 text-gray-700">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center space-x-2">
                          <span className="w-8 text-center">{cartItems[item._id]}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        ${(item.price * cartItems[item._id]).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-xl shadow-md border border-gray-200 bg-white p-6 h-fit sticky top-6"
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h3>
            
            {/* Delivery Location Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black transition"
              >
                {Object.keys(DELIVERY_FEES).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc} (${DELIVERY_FEES[loc].toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Code Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black transition"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition text-sm font-medium"
                >
                  Apply
                </button>
              </div>
              {appliedCode && (
                <p className={`text-sm mt-2 ${appliedCode.includes("Invalid") ? "text-red-500" : "text-green-600"}`}>
                  {appliedCode}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={`font-medium ${deliveryFee === 0 ? "line-through text-gray-400" : ""}`}>
                  ${baseDeliveryFee.toFixed(2)}
                </span>
              </div>
              {deliveryFee === 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Discount</span>
                  <span className="font-medium text-green-600">-${baseDeliveryFee.toFixed(2)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/order">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full bg-black text-white py-3 rounded-lg font-medium shadow-sm 
                  ${isCheckingOut ? "opacity-75" : "hover:bg-gray-800"} transition flex items-center justify-center gap-2`}
              >
                {isCheckingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Checkout</>
                )}
              </motion.button>
            </Link>

            {/* Continue Shopping Link */}
            <Link to="/">
              <button className="w-full mt-4 text-gray-600 py-2 font-medium text-sm hover:text-black transition">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;