import React, { useContext, useEffect, useState } from 'react'
import { StoreContent } from '../../context/StoreContent'
import axios from 'axios'
import { BsFillBoxFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Myorders = () => {

    const { url, token } = useContext(StoreContent)

    const navigate = useNavigate()

    const [data, setdata] = useState([])

    const fetchdata = async () => {

        const response = await axios.post(url + '/order/order-item', {}, {
            headers: { Authorization: `bearer ${token}` }
        })

        setdata(response.data.data)

    }

    useEffect(() => {

        if (token) {
            fetchdata();
        } else {
            navigate('/')
        }

    }, [token])

    return (
        <>

            <div className='lg:px-40 m-10  mt-2'>

                {data.length > 0 ? (
                    <>
                        <h2 className='font-bold text-xl '>My Orders</h2>

                        <div className='flex flex-col '>
                            {data.map((order, index) => {
                                return (
                                    <div key={index} className='order mt-8'>
                                        <BsFillBoxFill size={35} />
                                        <p>{order.items.map((item, index) => {

                                            if (index === order.items.length - 1) {
                                                return item.name + " x " + item.quantity
                                            } else {
                                                return item.name + " x " + item.quantity + ", "
                                            }

                                        })}</p>

                                        <p>₹{order.amount}.00</p>
                                        <p>Items:{order.items.length}</p>
                                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                        <button onClick={fetchdata} className='cursor-pointer lg:px-2 lg:py-2 px-5 py-2 border-2 text-white rounded bg-gray-800 '>Track Order</button>
                                    </div>
                                )
                            })}
                        </div>
                    </>

                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <BsFillBoxFill size={50} className="text-gray-400 mb-3 mt-2" />
                        <h3 className="text-lg font-semibold text-gray-700">No orders found</h3>
                        <p className="text-gray-500">You haven’t placed any orders yet.</p>
                    </div>
                )}

            </div >
        </>
    )
}

export default Myorders