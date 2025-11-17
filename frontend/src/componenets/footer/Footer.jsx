import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white lg:p-15 lg:mt-30' id='footer'>
      <div className='flex flex-col lg:flex-row justify-between '>
        <div className='lg:w-1/3 text-center lg:text-left  p-10'>
         <a href="/"> <img src={assets.photo} alt='error' className='lg:w-20 h-24 mx-auto lg:mx-0  border-none cursor-pointer' /></a> 
          <p className='mt-4 text-sm'>
            Welcome to Food Paradise, your ultimate destination for delectable and wholesome home-cooked meals in Sector-62, Noida. Our tiffin service caters to a diverse clientele, including those residing in PG accommodations.
          </p>
          <div className='flex justify-center lg:justify-start gap-4 mt-4 cursor-pointer'>
            <FaFacebook className='w-8 h-8' />
            <FaInstagramSquare className='w-8 h-8' />
            <FaMapLocationDot
              className='w-8 h-8'
              onClick={() => {
                window.open(
                  'https://www.google.com/viewer/place?sca_esv=b22bf8643ac1f672&output=search&mid=/g/11tf41gb92&pip=ChRmb29kIHBhcmFkaXNlIHNlYyA2MhAC&lqi=ChRmb29kIHBhcmFkaXNlIHNlYyA2Mkii0tzAtLmAgAhaJhAAEAEQAhADGAAYARgCGAMiFGZvb2QgcGFyYWRpc2Ugc2VjIDYykgESYm94X2x1bmNoX3N1cHBsaWVyqgFPEAEqESINZm9vZCBwYXJhZGlzZSgAMh4QASIax-MRo2gP7mFQfUgeLCyFLQLa7-cFY6aYV8IyGBACIhRmb29kIHBhcmFkaXNlIHNlYyA2Mg&phdesc=LTLoZcNs51E&sa=X&ved=2ahUKEwiUv-TR_Z2LAxXVa_UHHTCECmMQkbkFKAB6BAgOEAg',
                  '_blank'
                );
              }}
            />
          </div>
        </div>

        <div className='lg:w-1/3 text-center lg:p-16 p-10'>
          <h2 className='font-extrabold text-lg'>COMPANY</h2>
          <ul className='mt-3 space-y-2'>
           <a href="/"><li>Home</li></a>   
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='lg:w-1/3 text-center lg:text-left lg:p-16 p-10'>
          <h2 className='font-extrabold text-lg'>GET IN TOUCH</h2>
          <ul className='mt-3 space-y-2'>
            <li>+91 9899630323</li>
            <li>
              56, NCR, Block B, Industrial Area, Sector 62, Noida, Ghaziabad <br /> Uttar Pradesh 201309
            </li>
           <a href="mailto:foodparadisenoida@gmail.com"> <li >foodparadisenoida@gmail.com</li></a> 
          </ul>
        </div>
      </div>

      <hr className='lg:my-6 lg:w-[85vw] w-75  lg:ml-10 ml-7 border-gray-600' />

      <div className='lg:text-sm text-[15px] lg:p-0 p-5 text-center'>
        <p>Copyright  © {new Date().getFullYear()} FoodParadise | All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
