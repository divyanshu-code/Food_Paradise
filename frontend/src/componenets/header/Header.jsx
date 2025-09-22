import React, { useContext, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContent } from '../../context/StoreContent';
import { assets } from '../../assets/assets';
import { BiX, BiMenu } from "react-icons/bi";
import { BiSolidUser } from 'react-icons/bi';
import { FaBagShopping } from 'react-icons/fa6';
import { RiLogoutBoxRFill } from 'react-icons/ri';

const Header = ({ onLogin }) => {
  const [yes, setyes] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { total, token, setToken } = useContext(StoreContent);

  const navigate = useNavigate();

  const logout = () => {

    if (!token) {
      navigate('/');
      return;
    };

    localStorage.removeItem('token');
    setToken("");

    navigate('/');
  }

  return (
    <header className='w-full bg-white shadow-md z-50 relative'>
      <div className='flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-32 py-3'>

        <Link to='/'>
          <img src={assets.logo} alt="Logo" className='lg:w-44 lg:h-24 w-32 h-[12vh]  ' />
        </Link>

        <nav className='hidden md:flex items-center gap-10 font-medium'>
          <Link to='/' onClick={() => setyes('Home')} className={yes === 'Home' ? 'active' : ''}>Home</Link>
          <a href='#exploremenu' onClick={() => setyes('Menu')} className={yes === 'Menu' ? 'active' : ''}>Menu</a>
          <a href='#app' onClick={() => setyes('Mobile app')} className={yes === 'Mobile app' ? 'active' : ''}>Mobile App</a>
          <a href='#footer' onClick={() => setyes('contact us')} className={yes === 'contact us' ? 'active' : ''}>Contact Us</a>
        </nav>


        <div className='hidden md:flex items-center gap-6'>
          <IoIosSearch size={26} className='cursor-pointer' />
          <div className='relative'>
            <Link to='/cart'>
              <FaBasketShopping size={26} className='cursor-pointer' />
            </Link>
            {total() > 0 && <div className='dot'></div>}
          </div>

          {!token ?
            <button onClick={() => { onLogin(true) }} className='border-2 border-red-500 px-5 py-2 rounded-full hover:bg-red-400 hover:text-black transition-all' id='button'>
              Sign In
            </button> :
            <div className='parent relative hover:cursor-pointer'>
              <BiSolidUser size={30} />
              <ul className='child absolute right-0 hidden z-10'>
                <Link to='/myorder' className='flex items-center  gap-3'> <FaBagShopping size={24} />  <span className='hover:text-red-500 mt-1 text-sm'>Orders</span> </Link>
                <hr />
                <li onClick={logout} className='flex items-center gap-3'> <RiLogoutBoxRFill size={24} /> <span className='hover:text-red-500 text-sm'>Logout</span></li>
              </ul>
            </div>
          }
        </div>


        <div className='md:hidden'>
          {menuOpen ? (
            <div className="fixed top-0 right-0 w-full h-screen bg-black/80 text-white flex flex-col gap-5 p-6 z-40">

              <BiX
                className="text-3xl cursor-pointer self-end"
                onClick={() => setMenuOpen(false)}
              />

              <div className='flex flex-col gap-6 font-medium '>
                <Link to='/' onClick={() => { setyes('Home'); setMenuOpen(false); }}>Home</Link>
                <a href='#exploremenu' onClick={() => setMenuOpen(false)}>Menu</a>
                <a href='#app' onClick={() => setMenuOpen(false)}>Mobile App</a>
                <a href='#footer' onClick={() => setMenuOpen(false)}>Contact Us</a>

                <div className='flex items-center gap-4 pt-2 border-t border-gray-700'>
                  <IoIosSearch size={24} className='cursor-pointer' />
                  <div className='relative'>
                    <Link to='/cart'>
                      <FaBasketShopping
                        size={24}
                        className='cursor-pointer'
                        onClick={() => { setMenuOpen(false) }}
                      />
                    </Link>
                    {total() > 0 && <div className='dot'></div>}
                  </div>
                  {!token ?
                    <button onClick={() => { onLogin(true) , setMenuOpen(false)}} className='border-2 border-red-500 px-5 py-2 rounded-full hover:bg-red-400 hover:text-black transition-all' id='button'>
                      Sign In
                    </button> :
                    <div className='parent relative hover:cursor-pointer'>
                      <BiSolidUser size={30} />
                      <ul className='child absolute right-0 hidden mt-1 text-black z-10'>
                        <Link to='/myorder' onClick={() => { setMenuOpen(false) }} className='flex items-center  gap-3'> <FaBagShopping size={24} />  <span className=' mt-1 text-sm'>Orders</span> </Link>
                        <hr />
                        <li  onClick={() => { logout , setMenuOpen(false) }} className='flex items-center gap-3'> <RiLogoutBoxRFill size={24} /> <span className='hover:text-red-500 text-sm'>Logout</span></li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
          ) : (
            <BiMenu
              className="text-3xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
