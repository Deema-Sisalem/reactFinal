import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  let { userToken ,setUserToken} = useContext(AuthContext)
  const navigate = useNavigate()


   function signOut(){
    setUserToken("");
    localStorage.removeItem("token")
    navigate('/login')
   }


  return (

    <header className="bg-teal-800 absolute w-full">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className='flex items-center'>
            <div className="text-white font-bold me-7 text-xl">
              <h1>FreshCart</h1 >
            </div>
            {userToken && <div className="hidden md:block">
              <ul className="flex items-center space-x-3">
                <li><NavLink to={'/'} className="text-white">Home</NavLink></li>
                {/* <li><NavLink to={'/products'} className="text-white">Products</NavLink></li> */}
                <li><NavLink to={'/categories'} className="text-white">Categories</NavLink></li>
                <li><NavLink to={'/brands'} className="text-white">Brands</NavLink></li>
                <li><NavLink to={'/cart'} className="text-white">Cart</NavLink></li>
              </ul>
            </div>}

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className='flex items-center'>
            {/* EDIT : Add social media icons here */}
            <div className="social-media me-4">
            <a href='https://facebook.com' target='_blank'><i className="fa-brands text-white mx-2 fa-facebook-f"></i></a>
            <a href='https://twitter.com' target='_blank'><i className="fa-brands text-white mx-2 fa-twitter"></i></a>
            <a href='https://youtube.com' target='_blank'> <i className="fa-brands text-white mx-2 fa-youtube"></i></a>
            <a href='https://tiktok.com' target='_blank'><i className="fa-brands text-white mx-2 fa-tiktok"></i></a>
            </div>
            <div>
              <ul className='flex gap-1'>
                {!userToken && <><li><NavLink to={'/login'} className="block px-2 py-2 text-white rounded">Login</NavLink></li>
                  <li><NavLink to={'/register'} className="block px-2 py-2 text-white rounded">Register</NavLink></li></>}
                {userToken && <li><button onClick={signOut} className="block px-2 py-2 text-white rounded">Signout</button></li>}
                {/* style of the signout */}

              </ul>
            </div>
          </div>
        </div>
        {userToken && <div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu md:hidden hidden"}>
          <ul className="mt-4 space-y-4">
            <li><NavLink to={'/'} className="block px-2 py-2 text-white bg-teal-900 rounded">Home</NavLink></li>
            {/* <li><NavLink to={'/products'} className="block px-2 py-2 text-white bg-teal-900 rounded">Products</NavLink></li> */}
            <li><NavLink to={'/categories'} className="block px-2 py-2 text-white bg-teal-900 rounded">Categories</NavLink></li>
            <li><NavLink to={'/brands'} className="block px-2 py-2 text-white bg-teal-900 rounded">Brands</NavLink></li>
            <li><NavLink to={'/cart'} className="block px-2 py-2 text-white bg-teal-900 rounded">Cart</NavLink></li>
          </ul>
        </div>}

      </nav>
    </header>
  )
}
