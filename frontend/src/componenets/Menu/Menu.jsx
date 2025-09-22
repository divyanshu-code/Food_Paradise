import React from 'react';
import { menu_list } from '../../assets/assets';

const Menu = ({ category, setmenu }) => {
  return (
    <div className='flex flex-col gap-3 px-4 mt-15 lg:mt-5 sm:px-6 md:px-5 lg:px-24 lg:ml-0 ml-1' id='exploremenu'>
      <h1 className='text-3xl md:text-3xl '>Explore our menu</h1>
      <p className='max-w-5xl font-semibold text-sm sm:text-base  mt-3'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

     
      <div
        id='neo'
        className='flex items-center gap-8 sm:gap-12 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-4'
      >
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setmenu((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
            className='flex flex-col items-center justify-center cursor-pointer min-w-[80px] sm:min-w-[100px] snap-center transition-transform hover:scale-105'
          >
            <img
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full shadow-md ${
                category == item.menu_name ? 'border-3 border-red-500 p-0.5' : ''
              }`}
              src={item.menu_image}
              alt='menu item'
            />
            <p className='text-center text-gray-500 font-medium text-xs sm:text-sm mt-2'>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className='border lg:w-full w-[83vw] lg:ml-0 ml-1 border-gray-500 mt-4' />
    </div>
  );
};

export default Menu;
