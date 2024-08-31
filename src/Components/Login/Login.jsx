import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Contexts/AuthContext';
import { useLocation } from 'react-router-dom';


export default function Login() {

    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    let { setUserToken } = useContext(AuthContext)

    const { handleSubmit, values, errors, touched, handleChange } = useFormik({
        initialValues: {

            "email": "",
            "password": "",

        },
        onSubmit,
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required").email("Enter a valid email"),
            password: Yup.string().required("Password is required"),
        })

    })

    async function onSubmit() {
        setErrorMsg("")
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
            setIsLoading(false)

            if (location.pathname == "/login") {
                navigate("/");
            } else {
                navigate(location.pathname);
            }

            setUserToken(data.token);
            localStorage.setItem("token", data.token)



        }).catch((err) => {
            setIsLoading(false);
            setErrorMsg(err.response?.data?.message || "An error occurred");
        });
        

    }

    return (

        <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8 uppercase">LOGIN</h1>
            <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">


                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                    <input onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    {touched.email && errors.email && <p className='text-red-400'>{errors.email}</p>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                    <input onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    {touched.password && errors.password && <p className='text-red-400'>{errors.password}</p>}
                </div>


                <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-300" disabled={isLoading}>Login {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}</button>
                {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
            </form>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">You don't have an account? </span>
                <Link to={'/register'} className="text-teal-500 hover:text-teal-600">Register</Link>
            </div>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">Forgot your password? </span>
                <Link to='/forgot-password' className="text-teal-500 hover:text-teal-600">Reset password</Link>
            </div>
        </div >

    )
}
