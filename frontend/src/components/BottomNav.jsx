import React from 'react'
import {NavLink} from "react-router-dom"
import { House, Landmark, Settings } from 'lucide-react'
import "../styles/BottomNav.css"
import { useLocation } from "react-router-dom"
function BottomNav() {
const location = useLocation()
console.log(location.pathname)

const isActive = (path) => location.pathname === path
let x=5
  return (
    <div className='nav-container'>
      <NavLink to= "/home">
         <House />
        {location.pathname=="/home" && <span>home</span>}
      </NavLink>

      <NavLink to= "/transaction">
         <Landmark />
         {location.pathname == "/transaction" && <span>transaction</span>}
      </NavLink>

      <NavLink to= "/settings">
         <Settings />
        {location.pathname == "/settings" &&  <span>Settings</span>}
      </NavLink>
    </div>
  )
}

export default BottomNav