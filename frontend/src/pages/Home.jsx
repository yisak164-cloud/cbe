import React from 'react'
import Header from '../components/Header'
import AccountCard from '../components/AccountCard'
import "../styles/Home.css"
import Menu from '../components/Menu'
function Home() {
    return (
        <div className='home-container'>
            <Header></Header>
            <AccountCard></AccountCard>
            <Menu />
        </div>
    )
}

export default Home
