import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleAdd = () => {
    addToCart(id);
    toast.success(`${name} added to cart!`);
  };

  const handleRemove = () => {
    removeFromCart(id);
    toast.info(`${name} removed from cart.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={name}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white bg-opacity-80 rounded-full px-2 py-1 shadow-md">
          {!cartItems[id] ? (
            <img
              className="w-8 cursor-pointer hover:scale-110"
              onClick={handleAdd}
              src={assets.add_icon_white}
              alt="add"
            />
          ) : (
            <>
              <img
                className="w-6 cursor-pointer hover:scale-110"
                onClick={handleRemove}
                src={assets.remove_icon_red}
                alt="remove"
              />
              <p className="text-sm font-semibold text-gray-800">{cartItems[id]}</p>
              <img
                className="w-6 cursor-pointer hover:scale-110"
                onClick={handleAdd}
                src={assets.add_icon_green}
                alt="add"
              />
            </>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-900">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="w-20" />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{description}</p>
        <p className="text-lg font-bold text-orange-500">₹{price}</p>
      </div>
    </motion.div>
  );
};

export default FoodItem;