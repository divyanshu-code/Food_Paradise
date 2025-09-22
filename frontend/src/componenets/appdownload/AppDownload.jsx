import React from 'react';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='flex flex-col items-center mt-10 text-center' id='app'>
      <p className='font-semibold text-2xl md:text-4xl mt-10'>For Better Experience Download</p>
      <p className='mt-2 text-xl md:text-2xl'>FoodParadise App</p>

      <div className='playstore'>
        <img 
          src={assets.play_store} 
          alt='Play Store' 
          className='w-32 md:w-40 lg:w-48 ' 
        />
        <img 
          src={assets.app_store} 
          alt='App Store' 
          className='w-32 md:w-40 lg:w-48' 
        />
      </div>
    
    </div>
  );
};

export default AppDownload;