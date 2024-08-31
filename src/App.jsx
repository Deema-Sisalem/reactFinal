import { useState } from 'react'
import './App.css'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import Layout from './Components/Layout/Layout'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectAuthRoute from './Components/ProtectAuthRoute/ProtectAuthRoute'
import { ToastContainer } from 'react-toastify';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import ForgotPassword from './Components/ForgetPassword/ForgetPassword'
import ProductsByCategory from './Components/ProductsByCategory/ProductsByCategory'

const router = createBrowserRouter([
    {
        path: '', element: <Layout />, children: [
            { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
            { path: 'login', element: <ProtectAuthRoute><Login /> </ProtectAuthRoute>},
            { path: 'register', element: <ProtectAuthRoute><Register /> </ProtectAuthRoute>},
            { path: 'cart', element:<ProtectedRoute> <Cart /></ProtectedRoute> },
            { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>},
            { path: 'categories', element:<ProtectedRoute> <Categories /> </ProtectedRoute>},
            { path: 'categories/:categoryId', element:<ProtectedRoute> <ProductsByCategory /> </ProtectedRoute>},
            { path: 'brands', element:<ProtectedRoute> <Brands /></ProtectedRoute> },
            { path: 'products/:id', element:<ProtectedRoute> <ProductDetails /></ProtectedRoute> },
            { path: 'shippingAddress/:cartId', element:<ProtectedRoute> <ShippingAddress /></ProtectedRoute> },
            // { path: 'forgot-password', element: <ForgetPassword /> },
            { path: 'allorders', element:<ProtectedRoute> <Orders /></ProtectedRoute> },
            { path: '*', element: <Notfound /> },
            
        ]
    }
])

export default function App() {
    return (
        <>
            <AuthContextProvider>
                <RouterProvider router={router}>
                <ToastContainer />
                </RouterProvider>
            </AuthContextProvider>
        </>
    )
}
