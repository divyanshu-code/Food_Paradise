import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const StoreContent = createContext(null)

const StoreContentProvider = (props) => {


  const [item, setitem] = useState({})
  const [token, setToken] = useState("")
  const [food_list, setfoodlist] = useState([])

  const url = 'https://food-paradise-backend-qqs0.onrender.com'

  const addtocart = async (itemId) => {

    if (!item[itemId]) {
      setitem((prev) => ({ ...prev, [itemId]: 1 }))
    } else {

      setitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      await axios.post(url + '/cart/add', { itemId }, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
    }
  }

  const removefromcart = async (itemId) => {

    setitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    if (token) {
      await axios.post(url + '/cart/remove', { itemId }, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
    }
  }

  const total = () => {

    let totalproduct = 0

    for (const items in item) {

      if (item[items] > 0) {

        let iteminfo = food_list.find((product) => product._id === items);
        totalproduct += iteminfo.price * item[items]
      }
    }
    return totalproduct;
  }

  const ContextValue = {

    food_list,
    item,
    addtocart,
    removefromcart,
    setitem,
    total,
    url,
    token,
    setToken
  }

  const fetchfood = async () => {

    const response = await axios.get(url + '/food/list');
    setfoodlist(response.data.data);

  }

  const loadcart = async (token) => {

    if (token) {
      const response = await axios.post(url + '/cart/get', {}, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })

      setitem(response.data.cartdata);
    }
  }

  useEffect(() => {

    async function loaddata() {

      await fetchfood();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        await loadcart(localStorage.getItem('token'));
      }
    }

    loaddata();

  }, [])



  useEffect(() => {

    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }

  }, [])


  return (

    <>

      <StoreContent.Provider value={ContextValue}>
        {props.children}
      </StoreContent.Provider>

    </>
  )
}


export default StoreContentProvider;