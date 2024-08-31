import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Products from '../Products/Products'

export default function Home() {

const [products, setProducts] = useState([])

useEffect(()=>{
  getProducts()
},[])

async function getProducts() {
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  setProducts(data.data)
}

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>

      {products.map((product,index)=>{
        return <Products product={product} key={index}/>
      })
      }
    </div>
  )
}
