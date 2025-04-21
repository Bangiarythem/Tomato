import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    addToCart(id);
    toast.success(`${name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleRemove = () => {
    removeFromCart(id);
    toast.info(`${name} removed from cart.`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          className="w-full h-52 object-cover"
          src={image}
          alt={name}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium shadow-lg"
            onClick={handleAdd}
          >
            Add to Cart
          </motion.button>
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-orange-600 font-bold">₹{price}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <img src={assets.rating_starts} alt="rating" className="w-20" />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-medium text-gray-500">
            {Math.floor(Math.random() * 30) + 10} mins • {Math.random() > 0.5 ? 'Free delivery' : '₹30 delivery'}
          </span>
          
          {!cartItems[id] ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-orange-100 p-1.5 rounded-full cursor-pointer"
              onClick={handleAdd}
            >
              <img className="w-6 h-6" src={assets.add_icon_green} alt="add" />
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 bg-orange-100 rounded-full px-1 py-0.5">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 cursor-pointer"
                onClick={handleRemove}
              >
                <img className="w-5 h-5" src={assets.remove_icon_red} alt="remove" />
              </motion.div>
              <p className="text-sm font-semibold text-gray-800 w-5 text-center">{cartItems[id]}</p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 cursor-pointer"
                onClick={handleAdd}
              >
                <img className="w-5 h-5" src={assets.add_icon_green} alt="add" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItem;