import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8 uppercase">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500" 
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-300" 
          disabled={isLoading}
        >
          Reset Password {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
        </button>
        
        {message && <p className={message.includes("success") ? 'text-green-500' : 'text-red-500'}>{message}</p>}
      </form>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Remember your password? </span>
        <Link to='/login' className="text-teal-500 hover:text-teal-600">Login</Link>
      </div>
    </div>
  );
}