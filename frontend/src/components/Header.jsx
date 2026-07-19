import React from 'react'
import "../styles/Header.css"
import { LayoutGrid } from "lucide-react"
function Header() {
    return (
        <div className='header-container'>
            <div className='user-info'>
               <div className='icon-container'> 
                    <LayoutGrid />
                </div>
                <div className='user-name'>
                    <span>Hello,</span>
                    <span>Mizan</span>
                </div>
            </div>
            <div className='header-btn'>
                
            </div>
        </div>
    )
}

export default Header
