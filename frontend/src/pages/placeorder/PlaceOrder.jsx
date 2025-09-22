import React, { useContext, useEffect } from 'react'
import { StoreContent } from '../../context/StoreContent'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { total, token, item, setitem, url, food_list } = useContext(StoreContent)

  const navigate = useNavigate()

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((food) => {
      if (item[food._id] > 0) {
        let iteminfo = { ...food, quantity: item[food._id] };
        orderItems.push(iteminfo);
      }
    });

    const orderData = {
      cart: orderItems,
      amount: total() > 0 ? total() + 2 : 0,
      address: data,
      paymentMethod: paymentMethod
    };

    if (paymentMethod === "cod") {
      try {
        const response = await axios.post(url + "/order/place-cod", orderData, {
          headers: { Authorization: `bearer ${token}` }
        });

        if (response.data.success) {
          toast.success("Order placed successfully", {
            position: "top-center",
            autoClose: 4000,
            theme: "colored",
            transition: Zoom,
          });

          setitem([]);
          localStorage.removeItem("cart");

          setTimeout(() => {
            navigate('/myorder')
          }, 1500);
        } else {
          toast.error("Failed to place COD order!");
          navigate('/')
        }
      } catch (error) {
        console.error("COD order error", error);
        toast.error("Something went wrong!");
      }
      return;
    }

    // ---- RAZORPAY FLOW ----
    try {
      const response = await axios.post(url + '/order/place', orderData, {
        headers: { 'Authorization': `bearer ${token}` }
      });

      if (response.data.success) {
        const { orderId, amount, currency } = response.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount,
          currency,
          name: "Food Paradise",
          description: "Order Payment",
          order_id: orderId,
          handler: async function (res) {
            try {
              await axios.post(url + "/order/verify", {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
              }, {
                headers: { Authorization: `bearer ${token}` }
              });

              toast.success('Payment successful!', {
                position: "top-center",
                autoClose: 4000,
                theme: "colored",
                transition: Zoom,
              });

              setitem([]);
              localStorage.removeItem("cart");

              setTimeout(() => {
                navigate('/myorder')
              }, 1500);

            } catch (error) {
              console.error("Error verifying payment", error);
              toast.error("Payment verification failed!");
            }
          },
          prefill: {
            name: data.firstname + " " + data.lastname,
            email: data.email,
            contact: data.phone
          },
          notes: {
            address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`
          },
          theme: { color: "#3399cc" }
        };

        const rzp1 = new window.Razorpay(options);
        try {
          // Call backend to delete failed order
          await axios.post(url + "/order/verify", { razorpay_order_id: options.order_id, paymentStatus: "failed" }, { headers: { Authorization: `bearer ${token}` } });

          setitem([]);
          localStorage.removeItem("cart");
          
          setTimeout(() => { navigate('/') }, 1500);

        } catch (err) {
          console.error("Error notifying backend about failed payment:", err);
          toast.error("Failed to handle payment failure!");
        }

        rzp1.open();
      } else {
        toast.error("Failed to place Razorpay order.");
      }
    } catch (error) {
      console.error("Razorpay error", error);
      toast.error("Something went wrong with Razorpay.");
    }
  };


  useEffect(() => {

    if (!token) {
      navigate('/cart');

    } else if (total() === 0) {
      navigate('/cart')
    }

  }, [token])

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start justify-center mt-10 md:mt-20 gap-10 md:gap-20 p-5 w-full max-w-5xl mx-auto">

        <div className="w-full md:w-1/2 bg-white p-5 shadow-lg rounded-lg">
          <p className="font-bold text-xl md:text-2xl mb-4">Delivery Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required onChange={handleChange} name="firstname" value={data.firstname} className="border p-2 rounded w-full" type="text" placeholder="First Name" />
            <input onChange={handleChange} name="lastname" value={data.lastname} className="border p-2 rounded w-full" type="text" placeholder="Last Name" />
          </div>

          <input required onChange={handleChange} name="email" value={data.email} className="border p-2 rounded w-full mt-3" type="email" placeholder="Email Address" />
          <input required onChange={handleChange} name="street" value={data.street} className="border p-2 rounded w-full mt-3" type="text" placeholder="Street" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input required onChange={handleChange} name="city" value={data.city} className="border p-2 rounded w-full" type="text" placeholder="City" />
            <input required onChange={handleChange} name="state" value={data.state} className="border p-2 rounded w-full" type="text" placeholder="State" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input required onChange={handleChange} name="zipcode" value={data.zipcode} className="border p-2 rounded w-full" type="number" placeholder="Zip Code" />
            <input required onChange={handleChange} name="country" value={data.country} className="border p-2 rounded w-full" type="text" placeholder="Country" />
          </div>

          <input required onChange={handleChange} name="phone" value={data.phone} className="border p-2 rounded w-full mt-3" type="number" placeholder="Phone" />
        </div>

        <div className="w-full md:w-1/3 bg-white p-5 shadow-lg rounded-lg">
          <h2 className="font-bold text-xl md:text-2xl">Cart Totals</h2>
          <div className="mt-5">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p><p>₹{total()}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p><p>₹{total() > 0 ? '2' : '0'}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-black">
              <p>Total</p><p>{total() > 0 ? `₹${total() + 2}` : '₹0'}</p>
            </div>
          </div>


          <div className="mt-5">
            <p className="font-semibold mb-2">Select Payment Method</p>
            <label className="flex items-center mb-2">
              <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mr-2" />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input type="radio" value="razorpay" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} className="mr-2" />
              Razorpay
            </label>
          </div>

          <button className="w-full mt-5 bg-red-500 text-white p-3 rounded hover:bg-red-600">
            PLACE ORDER
          </button>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
