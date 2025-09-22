import React, { useContext } from 'react';
import { StoreContent } from '../../context/StoreContent';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { item, food_list, removefromcart, total  , url} = useContext(StoreContent);
  const navigate = useNavigate();

  return (
    <div className='px-4 sm:px-6 md:px-12 lg:px-32 mt-6 mb-10'>
      
      <div className='hidden md:grid grid-cols-6 items-center text-gray-500 font-semibold text-sm md:text-base mb-3'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className='hidden md:block mb-4' />

      <div className='space-y-4'>
        {food_list.map((items, index) => {
          if (item[items._id] > 0) {
            return (
              <div
                key={index}
                className='grid grid-cols-2 md:grid-cols-6 gap-2 items-center text-sm md:text-base border-b pb-3'
              >
             
                <img className='w-16 sm:w-20 md:w-24' src={url+"/images/"+items.image} alt={items.name} />

         
                <p>{items.name}</p>

           
                <p className='hidden md:block'>₹{items.price}</p>

             
                <p >{item[items._id]}</p>

               
                <p className='hidden md:block'>₹{items.price * item[items._id]}</p>

             
                <p
                  className='cursor-pointer text-red-500 font-bold  text-lg'
                  onClick={() => removefromcart(items._id)}
                >
                  x
                </p>

               
                <div className='col-span-2 md:hidden text-md text-gray-900 flex  justify-between'>
                  <p>₹{items.price} each</p>
                  <p> <span className='font-bold'>Total:</span> ₹{items.price * item[items._id]}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

  
      <div className='mt-10 flex flex-col md:flex-row justify-between gap-8'>

        <div className='w-full md:w-1/2 bg-white rounded shadow p-5'>
          <h2 className='font-bold text-lg md:text-2xl mb-4'>Cart Totals</h2>
          <div className='space-y-3 text-sm md:text-base'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>₹{total()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Delivery Fee</p>
              <p>₹{total() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className='flex justify-between font-bold text-black'>
              <p>Total</p>
              <p>{total() > 0 ? `₹${total() + 2}` : '₹0'}</p>
            </div>
          </div>
          <button
            className='mt-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full rounded transition'
            onClick={() => navigate('/order')}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

       
        <div className='w-full md:w-1/2 bg-white rounded shadow p-5'>
          <p className='text-gray-600 font-semibold text-sm md:text-base mb-3'>
            If you have a promo code, enter it here:
          </p>
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            <input
              className='flex-1 p-2 text-sm border border-gray-300 rounded outline-none focus:ring-2 focus:ring-red-300'
              type='text'
              placeholder='Promo code'
            />
            <button className='bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
