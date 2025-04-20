import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  
  const filteredList = category === "All"
    ? food_list
    : food_list.filter(item => item.category === category);

  return (
    <div className='mt-12 px-4 sm:px-8 md:px-16'>
      <div className="relative my-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-12"></div>
        </div>
      </div>
      <h2 className='text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-wide'>
        Top Dishes near You
      </h2>
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-10 animate-fadeIn'>
        {filteredList.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
