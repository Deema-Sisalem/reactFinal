import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products in Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product.imageCover} alt={product.title} className="w-full h-48 object-contain " />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
              <p className="text-gray-600 mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}