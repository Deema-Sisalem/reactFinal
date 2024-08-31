import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { Slide, toast } from 'react-toastify'

export default function Products({ product }) {

  let {userToken}=useContext(AuthContext)

  async function addProductToCart(productId ) {
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
      { productId:productId },
      {headers: {token: userToken}})
      console.log(data);
      
      toast.success(data.message, {
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

  return (
    <div className="max-w-2xl mx-auto">


      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <Link to={"/products/" + product?._id}>
          <img className="rounded-t-lg p-8" src={product?.imageCover} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={"/products/" + product?._id}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product?.title}</h3>
            <p className='line-clamp-3 font-thin'>{product?.description}</p>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            {[1, 2, 3, 4, 5].map((rate) => {
              return <svg className={product?.ratingsAverage >= rate ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-gray-300"} fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
              </svg>
            })}

            <span className="bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-teal-200 dark:text-teal-800 ml-1">{product?.ratingsAverage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product?.price}</span>
            <button onClick={()=>addProductToCart(product._id)}
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Add
              to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
