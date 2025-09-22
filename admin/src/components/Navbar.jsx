import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <>
       <div className='flex  items-center justify-between p-5 lg:px-10 py-2'>
        <img src={assets.logo} className='lg:w-44 lg:h-24 w-32 h-[12vh] ' alt="error" />
         <div>
          <p className='text-3xl font-bold'>Welcome Admin</p>
        </div>

        <img src={assets.profile_image}  className='w-12' alt="error" />
       </div>
    </>
  )
}

export default Navbar