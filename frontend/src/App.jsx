import React, { useState } from 'react'
import Header from './componenets/header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './componenets/footer/Footer'
import LogIn from './componenets/login/LogIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import Myorders from './componenets/Orders/Myorders'

const App = () => {

  const [login, setlogin] = useState(false)
  const [cart, setcart] = useState(false)

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      {login ? <LogIn setlogin={setlogin} /> : <></>}

      {cart ? <Cart /> : <></>}

      <Header onLogin={setlogin} onCart={setcart} />

      <Routes>
        <Route path='/' element={<Home onLogin={setlogin} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/myorder' element= { <Myorders/>} />
      </Routes>

      <div className='mt-20'>
        <Footer />
      </div>

    </>
  )
}

export default App