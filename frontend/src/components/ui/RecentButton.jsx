import React from 'react'
import { NavLink } from 'react-router-dom'
function RecentButton({ title, icon, path }) {
    const Icon = icon
    return (
        <div className='recent-icon-container'>
            <NavLink className='recent-icon' to={path}>
                <Icon></Icon>
            </NavLink>
            <span>{title}</span>
        </div>
    )
}

export default RecentButton
