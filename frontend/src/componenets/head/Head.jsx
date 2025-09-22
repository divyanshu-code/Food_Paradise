import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from "motion/react"

const Head = () => {
  return (
    <div id='head' className='relative min-h-[50vh] sm:min-h-[50vh] md:min-h-screen flex flex-col justify-center px-4 py-8 sm:px-8 '>
      <img src={assets.back} alt='error' className='absolute top-0 left-0 lg:w-[88vw] lg:h-[88vh] h-full lg:ml-5 object-cover mt-5 rounded-2xl -z-10' />

      <motion.div
        className="max-w-4xl text-left space-y-6 lg:ml-30"
        initial={{ opacity: 0, y: 0 }}   // start invisible & below
        animate={{ opacity: 1, y: 0 }}    // fade in & move up
        transition={{ duration: 1.5, ease: "easeOut" }} // smooth timing
      >
        <motion.h1
          className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl lg:mt-0 mt-5"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          Order your favorite food here
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg font-semibold text-shadow-5"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and
          culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious
          meal at a time.
        </motion.p>

        <a href="#exploremenu">
          <motion.button
            className="border px-6 py-3 rounded-3xl bg-white text-black border-white text-sm sm:text-base cursor-pointer hover:bg-gray-200 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            View Menu
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default Head;
