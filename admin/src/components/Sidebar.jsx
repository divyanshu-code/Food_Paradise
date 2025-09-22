import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const colorChange = (e) => {
    const links = document.querySelectorAll('.section');
    links.forEach(link => link.classList.remove('bg-green-200'));
    e.currentTarget.classList.add('bg-green-200');
  }
  return (
    <>
      <div className='w-[18%] border-r-2   border-gray-400'>
        <div className=' flex flex-col gap-5 p-12 pl-[18%]  pt-[50px] text-sm'>

          <Link to='/add' onClick={colorChange} className='section flex items-center border-r-0 border-2 gap-3 p-2 rounded-r-none w-[14.2vw] border-gray-400 rounded cursor-pointer'>
            <img src={assets.add_icon} alt="error" />
            <p>Add Food</p>
          </Link>
          <Link to='/list' onClick={colorChange} className='section flex items-center border-r-0 border-2 gap-3 p-2 rounded-r-none w-[14.2vw] border-gray-400 rounded cursor-pointer'>
            <img src={assets.order_icon} alt="error" />
            <p>List Items</p>
          </Link>
          <Link to='/order' onClick={colorChange} className='section flex items-center border-r-0 border-2 gap-3 p-2 rounded-r-none w-[14.2vw] border-gray-400 rounded cursor-pointer'>
            <img src={assets.order_icon} alt="error" />
            <p>Orders</p>
          </Link>
        </div>
      </div>

    </>
  )
}

export default Sidebar