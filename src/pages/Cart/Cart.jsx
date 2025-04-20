import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DELIVERY_FEES = {
  Downtown: 2.99,
  Suburbs: 4.99,
  Outskirts: 7.99,
  Other: 5.99,
};

const Cart = () => {
  const { cartItems, food_list, removeFromCart , getTotalCartAmount } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [location, setLocation] = useState("Downtown");

  const deliveryFee = DELIVERY_FEES[location] || DELIVERY_FEES.Other;

  const itemsInCart = food_list.filter((item) => cartItems[item._id] > 0);
  const subtotal = itemsInCart.reduce(
    (acc, item) => acc + item.price * cartItems[item._id],
    0
  );

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setAppliedCode("SAVE10 (10% OFF)");
    } else if (code === "FLAT5") {
      setDiscount(5);A
      setAppliedCode("FLAT5 ($5 OFF)");
    } else {
      setDiscount(0);
      setAppliedCode("Invalid code ❌");
    }
  };

  const grandTotal = Math.max(subtotal + deliveryFee - discount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] md:w-[80%] mx-auto py-12 min-h-screen"
    >
      <h2 className="text-4xl font-bold mb-10 text-gray-800">🛒 Your Cart</h2>

      {itemsInCart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <p className="text-gray-500 text-xl mb-4">Your cart is empty 🍽️</p>
          <Link to="/">
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
              Browse Menu
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="rounded-xl shadow-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-medium">
              <thead className="text-gray-600 bg-gray-50">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Remove</th>
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
                        className="w-14 h-14 rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="p-4 text-gray-900 font-semibold">
                      {item.name}
                    </td>
                    <td className="p-4 text-gray-700">${item.price.toFixed(2)}</td>
                    <td className="p-4 text-gray-700">{cartItems[item._id]}</td>
                    <td className="p-4 font-semibold text-gray-800">
                      ${(item.price * cartItems[item._id]).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600 text-xl"
                      >
                        ×
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="p-6 border-t text-right bg-gray-50">
            {/* Delivery Location Selector */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mb-4">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-60"
              >
                {Object.keys(DELIVERY_FEES).map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Code Input */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-60"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition"
              >
                Apply
              </button>
            </div>

            {appliedCode && (
              <p className="text-sm text-gray-600 mb-4 italic">{appliedCode}</p>
            )}

            {/* Price Breakdown */}
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>
              <p>Delivery Fee ({location}): <span className="font-semibold">${deliveryFee.toFixed(2)}</span></p>
              {discount > 0 && (
                <p className="text-green-600">
                  Discount: -${discount.toFixed(2)}
                </p>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Grand Total:{" "}
              <span className="text-black">${grandTotal.toFixed(2)}</span>
            </h3>

            <Link to="/order">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition font-semibold shadow-md"
              >
                Place Order
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
