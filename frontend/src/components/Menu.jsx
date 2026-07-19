import React from 'react'
import "../styles/Menu.css"
import { Minus, Dot, MessageCircleMore } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { recentState } from '../assets/data'
import RecentButton from './ui/RecentButton'
import TransactionCard from './TransactionCard'
import { MenuState } from '../assets/data'
import BottomNav from './BottomNav'
function Menu() {
    return (
        <div className='menu-container'>
            <div className='slider'>
                <Minus size={40} />
                <Dot size={20} />
                <Dot size={20} />
            </div>
 <div className='card-wrapper'>
               <div className='recent-container'>
                {
                    recentState.states.map((state, index) => (
                        <RecentButton key={index} icon={state.icon}
                            title={state.title} path={state.path} >

                        </RecentButton>
                    ))
                }
            </div>
            <TransactionCard></TransactionCard>
            <div className='menu-cards'>
                {
                MenuState.states.map((state,index)=>{
                    const Icon= state.icon
                    return (
                        <NavLink className='menu-card ' key={index} to={state.path}>
                            <Icon></Icon>
                            {state.title}
                        </NavLink>
                    )
                })
              }
 </div>
              
            </div>
           
        </div>
    )
}

export default Menu
