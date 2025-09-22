import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Zoom } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setimage] = useState(false);
    const [data, setdata] = useState({
        name: "",
        description: "",
        category: "Parathas",
        price: ""
    });

    const changehandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setdata((data) => ({ ...data, [name]: value }));
    }

    const submithandler = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('image', image);
        formdata.append('name', data.name);
        formdata.append('description', data.description);
        formdata.append('category', data.category);
        formdata.append('price', Number(data.price));

        const response = await axios.post(`${url}/food/add`, formdata);

        if (response.status === 200) {
            setdata({
                name: "",
                description: "",
                category: "Parathas",
                price: ""
            });
            setimage(false);
            toast.success('Product added successfully!', {
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
        } else {

            toast.error('Product not added!', {
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

    return (
        <>
            <div className='ml-[7%] lg:mt-[3%] h-screen mt-12'>
                <form className='hero flex flex-col gap-5' onSubmit={submithandler}>

                    <div className='flex flex-col gap-3'>
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img className='w-[120px] cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="error" />
                        </label>
                        <input type="file" onChange={(e) => setimage(e.target.files[0])} hidden required id="image" />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <p>Food Name</p>
                        <input onChange={changehandler} value={data.name} className='lg:w-[400px] w-[65vw] p-2 rounded text-sm' type="text" required name='name' placeholder='Type food name' />
                    </div>
                    <div className='flex flex-col gap-3  '>
                        <p>Food Description</p>
                        <textarea onChange={changehandler} value={data.description} className='lg:w-[400px] w-[65vw] border p-2 rounded text-sm resize-none' required name='description' rows="6" placeholder='Type food description'></textarea>
                    </div>

                    <div className='flex lg:gap-10 gap-5'>
                        <div className='flex flex-col gap-3 '>
                            <p>Food Category</p>
                            <select required name='category' onChange={changehandler} value={data.category} className='lg:w-[140px] w-[30vw] p-1 px-3 mt-1'>
                                <option value="Parathas">Parathas</option>
                                <option value="Sabji">Sabji</option>
                                <option value="Paneer">Paneer</option>
                                <option value="Chapatis">Chapatis</option>
                                <option value="Daal">Daal</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <p>Food Price</p>
                            <input onChange={changehandler} value={data.price} type="number" className='lg:w-[140px] w-[25vw] p-1 rounded lg:px-3' required name='price' placeholder='Price' />
                        </div>
                    </div>
                    <button className='border-none lg:w-[140px] w-[35vw] px-1 py-2 cursor-pointer rounded lg:p-2 bg-blue-500 text-white' type="submit">Add Item</button>
                </form>
            </div>
        </>
    )
}

export default Add