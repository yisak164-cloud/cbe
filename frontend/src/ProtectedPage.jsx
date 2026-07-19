import React from 'react'
import { useUsercontext } from './context/UserContext'
import { Navigate,Outlet } from 'react-router-dom'

function ProtectedPage() {

    const{state}=useUsercontext()
    if(!state.user){
        //if the user doesnot have datalogin return to login
        return <Navigate to={"/login"}></Navigate>
    }
    //if the login is done it should continue the path that is clicked
    return <Outlet></Outlet>
 
}

export default ProtectedPage