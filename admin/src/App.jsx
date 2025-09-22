import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4000";
  return (
    <>
      <div>
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
          theme="light"
          transition={Zoom}
        />
        <Navbar />
        <hr />

        <div className='flex'>
          <Sidebar />

          <Routes>
            <Route path='/add' element={<Add  url={url} />}></Route>
            <Route path='/list' element={<List  url={url}/>}></Route>
            <Route path='/order' element={<Order url={url} />}></Route>
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App