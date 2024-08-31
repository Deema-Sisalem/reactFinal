import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRoute({ children }) {

    const { userToken } = useContext(AuthContext)

    return (
        <>
            {userToken ? children : <Login/>}
        </>
    )
}
