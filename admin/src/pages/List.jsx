import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Zoom } from 'react-toastify'

const List = ({ url }) => {

  const [list, setlist] = useState([])

  const fetchlist = async () => {
    const response = await axios.get(`${url}/food/list`);
     
    if (response.status === 200) {
      setlist(response.data.data);
    } else {
      toast.error('Error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  }

  const deleteItem = async (id) => {
    const response = await axios.post(`${url}/food/remove/` , { id });
    if (response.status === 200) {
      toast.success('Food Item deleted successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      await fetchlist();

    } else {
      toast.error('Error deleting Food Item', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  }

  useEffect(() => {
    fetchlist();
  }, [])


  return (
    <>

      <div className='lg:w-[850px] flex flex-col m-10'>

        <p>All Food List</p>

        <div id='head' className='table lg:mt-2'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item , index) => {
          return (
            <div key={index} className='table'>
              <img src={`${url}/images/` + item.image} className='w-[50px] h-[50px] rounded' alt="error" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => deleteItem(item._id)} className='cursor-pointer text-red-600'>X</p>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default List