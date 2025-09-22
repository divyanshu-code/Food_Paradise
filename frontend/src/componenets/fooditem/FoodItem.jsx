import React, { useContext } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { StoreContent } from '../../context/StoreContent';
import { assets } from '../../assets/assets';


const FoodItem = ({ id, name, price, description, image , onLogin }) => {


  const { item, addtocart, removefromcart , url } = useContext(StoreContent);

  const handleAddToCart = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // not logged in → redirect
      onLogin(true);
      return;
    } else {
      // logged in → proceed
      addtocart(id);
    }
  };

  return (
    <div
      className='fooditem bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[450px] transition-transform hover:scale-[1.02] duration-200'
      id='check'
    >
      <div className='relative'>
        <img className='w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-xl' src={url+"/images/"+image} alt='food item' />
        
        {!item[id] ? (
          <IoIosAdd 
            className='absolute text-3xl sm:text-4xl bg-white bottom-2 right-2 p-1.5 sm:p-2 rounded-full cursor-pointer hover:scale-105 transition'
            onClick={() => handleAddToCart(id)}
          />
        ) : (
          <div className='absolute bottom-2 right-2 flex items-center space-x-2 bg-white px-3 py-1.5 sm:py-2 rounded-xl shadow-md'>
            <img className='w-5 sm:w-6 cursor-pointer' onClick={() => removefromcart(id)} src={assets.remove} alt='remove' />
            <p className='font-semibold text-sm sm:text-base'>{item[id]}</p>
            <img className='w-5 sm:w-6 cursor-pointer' onClick={() => addtocart(id)} src={assets.addicon} alt='add' />
          </div>
        )}
      </div>

      <div className='p-4'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-base sm:text-lg md:text-xl font-semibold'>{name}</p>
          <img className='w-16 sm:w-20 md:w-24' src={assets.rating} alt='rating' />
        </div>
        <p className='text-sm sm:text-base text-gray-500 font-medium line-clamp-2'>{description}</p>
        <p className='mt-3 text-red-500 font-bold text-lg sm:text-xl md:text-2xl'>₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
