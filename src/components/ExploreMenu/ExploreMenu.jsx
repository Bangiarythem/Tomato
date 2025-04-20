import React from 'react';
import { menu_list } from '../../assets/assets';

function ExploreMenu({ category, setCategory }) {
  return (
    <section className="py-16 px-4 text-center bg-white relative z-0" id="menu">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Explore our menu</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-10 text-base sm:text-lg">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="flex flex-wrap justify-center gap-10 md:grid md:grid-cols-4 max-w-6xl mx-auto px-4">
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110 cursor-pointer relative z-10"
          >
            <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 transition
              ${category === item.menu_name ? "border-orange-700 scale-110" : "border-orange-500 hover:border-orange-600"}`}>
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className={`mt-3 text-sm sm:text-base font-semibold ${category === item.menu_name ? "text-orange-600" : "text-gray-800"}`}>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreMenu;
