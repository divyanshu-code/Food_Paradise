import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Zoom } from 'react-toastify'
import { BsFillBoxFill } from "react-icons/bs";

const Order = ({ url }) => {

  const [data, setdata] = useState([])

  const fetchdata = async () => {

    const response = await axios.get(url + "/order/list-user-order", {});

    if (response.data.success) {
      setdata(response.data.data)

    } else {

      toast.error(response.data.message, {
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

  const statushandler = async (e, orderId) => {

    const response = await axios.post(url + "/order/updatestatus", {
      orderId,
      status: e.target.value
    });

    if (response.data.success) {

      await fetchdata()
    }

  }

  useEffect(() => {

    fetchdata();

  }, [])


  return (
    <>
      <div className='ml-[7%] lg:mt-[3%] mt-5 lg:w-[60vw] w-[70vw] h-screen'>

        {data.length > 0 ? (
          <>
            <h3 className='font-bold text-xl'>
              Order Page
            </h3>

            <div>
              {data.map((order, index) => {
                return (
                  <div key={index} className='order'>
                    <BsFillBoxFill size={35} />

                    <div>
                      <p className='font-semibold'>{order.items.map((item, index) => {

                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity
                        } else {
                          return item.name + " x " + item.quantity + ", "
                        }

                      })}
                      </p>

                      <p className='font-semibold mt-5 mb-1'>{order.address.firstname + " " + order.address.lastname}</p>
                      <div className='mb-3'>
                        <p>{order.address.street + ", "}</p>
                        <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                      </div>

                      <p>{order.address.phone}</p>
                    </div>

                    <p>Items:{order.items.length}</p>
                    <p>₹{order.amount}.00</p>



                    <p><span className={`inline-block w-2 h-2 rounded-full  ${order.payment ? 'bg-green-500' : 'bg-red-500'}`}></span> <b>{order.payment ? "Paid" : "Unpaid"}</b></p>
                    <select onChange={(e) => {
                      statushandler(e, order._id)
                    }} value={order.status} className='text-center lg:px-2 lg:py-2 border p-1  lg:w-[10vw] w-[15vw] outline-none  font-semibold rounded bg-green-200' >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered" >Delivered</option>
                    </select>
                  </div>

                )
              })}
            </div>
          </>
        ) : (

          <div className="flex flex-col items-center justify-center mt-10 ">
            <BsFillBoxFill size={40} className="text-gray-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700">No orders found</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default Order