import React, { Children } from 'react'
import BottomNav from './components/BottomNav'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='layout-container'>
       <Outlet></Outlet>
     <div className='bottom-container'>  <BottomNav></BottomNav></div>
        
        </div>
  )
}

export default Layout