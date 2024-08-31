import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Slide, toast } from 'react-toastify'
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function Cart() {


  const [isLoading, setIsLoading] = useState(false)

  const [cart, setCart] = useState(null)

  useEffect(() => {
    getUserCart()
  }, [])

  async function updateProductCount(productId, count) {
    setIsLoading(true)
    if (count != 0) {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
        count
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setCart(data);
    } else {
      removeProductFromCart(productId)
    }
    setIsLoading(false)

  }

  async function removeProductFromCart(productId) {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCart(data);

    toast.success("The product was successfully removed", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

  }

  async function getUserCart() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCart(data);

  }

  async function clearCart() {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCart(null);
  }

  return (
    cart ? <div className=" pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.data?.products?.map((product, index) => {
            return <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src={product?.product?.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{product?.product?.title} </h2>
                  <p className="mt-1 text-xs text-gray-700">${product?.price} </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <button disabled={isLoading} onClick={() => updateProductCount(product?.product?._id, product?.count - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-teal-500 hover:text-teal-50"> {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "-"}  </button>

                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product?.count} min="1" />

                    <button disabled={isLoading} onClick={() => updateProductCount(product?.product?._id, product?.count + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-teal-500 hover:text-teal-50">  {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "+"} </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{product?.price * product?.count}</p>
                    <svg onClick={() => removeProductFromCart(product?.product?._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          })}
          <button onClick={clearCart} className='text-red-500 border-2 border-red-400 rounded-md px-4 py-2 hover:text-white hover:bg-red-500'>Clear cart</button>
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg  font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-end text-lg font-bold">${cart?.data.totalCartPrice}</p>
              <p className="text-sm text-gray-700 ">including VAT</p>
            </div>
          </div>
          <Link to={"/shippingAddress/" + cart?.data?._id} className="mt-6 block text-center rounded-md bg-teal-500 py-1.5 font-medium text-teal-50 hover:bg-teal-600">Check out</Link>

        </div>
      </div>
    </div> : <h1 className='my-8 font-bold text-center text-2xl text-teal-900'>Your Cart is empty!</h1>
  )
}
