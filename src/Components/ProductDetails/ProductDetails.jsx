import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Slider from "react-slick";
import { Slide, toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext'

export default function ProductDetails() {

    let { userToken } = useContext(AuthContext)

    async function addProductToCart(productId) {
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            { productId: productId },
            { headers: { token: userToken } })
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
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let { id } = useParams()

    const [productDetails, setProductDetails] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProductDetails()
    }, [])

    async function getProductDetails() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id)
        setProductDetails(data.data);
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ? <LoadingScreen /> : <div class="bg-white">
                <main class="my-8">
                    <div class="container mx-auto px-6">
                        <div class="md:flex md:items-center">
                            <div class="w-full md:w-[50%] lg:w-[40%]">


                                <Slider {...settings}>
                                    {productDetails?.images.map((img) => {
                                        return <img class=" w-16 rounded-md object-contain max-w-lg mx-auto" src={img} alt=" " />
                                    })}
                                </Slider>
                            </div>
                            <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                                <h3 class="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                                <span class="text-gray-500 mt-3">${productDetails?.price}</span>
                                <hr class="my-3" />

                                <div class="mt-3">
                                    <div className="flex items-center mt-2.5 mb-5">
                                        {[1, 2, 3, 4, 5].map((rate) => {
                                            return <svg className={productDetails?.ratingsAverage >= rate ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-gray-300"} fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                </path>
                                            </svg>
                                        })}

                                        <span className="bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-teal-200 dark:text-teal-800 ml-1">{productDetails?.ratingsAverage ?? 0}</span>
                                    </div>
                                    <label class="text-gray-700 text-sm font-bold" for="count">Description:</label>
                                    <h3 className='font-light'>{productDetails?.description}</h3>
                                    <br />
                                    <label class="text-gray-700 text-sm font-bold" for="count">Category:</label>
                                    <h3 className='font-light'>{productDetails?.category.name}</h3>
                                    <h3 className='font-light'>{productDetails?.subcategory[0].name}</h3>
                                    <br />
                                    <label class="text-gray-700 text-sm font-bold"
                                        for="count">Brand:</label>
                                    <h3 className='font-light'>{productDetails?.brand.name}</h3>

                                </div>



                                <div class="flex items-center mt-6">
                                    <button class="px-8 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-500 focus:outline-none focus:bg-teal-500">Order Now</button>
                                    <button onClick={()=>addProductToCart(productDetails._id)} class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                        <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>}
        </>
    )
}
