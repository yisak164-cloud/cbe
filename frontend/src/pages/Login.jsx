import React, { useState } from 'react'
import { Globe, Minus, LockKeyhole, Phone } from "lucide-react"
import "../styles/Login.css"
import Logo from "../../public/images/image.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { api } from '../services/axios'
import { useUsercontext } from '../context/UserContext'
function Login() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState("")
    const [pin, setPin] = useState("")
    const {state,updateUserState}=useUsercontext()
    async function handleSubmit() {
        // navigate("/home")
        const phoneRegex = /^(?:\+251|0)?(9|7)\d{8}$/;
        if (!phone || !pin) {
            alert("all fields are required")
            return
        }
        if (!phoneRegex.test(phone)) {
            alert("please use valid phone number")
            return
        }
        try {
            const response = await api.post("/login",
                { phone: phone, pin: pin, headers: { withCredentials: true } })
            localStorage.setItem("user", JSON.stringify({
                account: response.data.account,
                balance: response.data.balance,
                fullName: response.data.fullName
            }))
            updateUserState({user:{
                account: response.data.account,
                balance: response.data.balance,
                fullName: response.data.fullName
            }})
        
            navigate("/home")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='login-container'>
            <div className='lang'>
                <Globe />
                <button>EN</button>
            </div>

            <div className='welcom-container'>

                <div className='logo-container'>
                    <img src={Logo} width={60} height={60} ></img>
                </div>
                <h2>Commercial Bank Of Ethiopia</h2>
                <div className='welcome'>
                    <div className='line'></div>
                    <span>Welcome</span>
                </div>
                <div className='login-input'>
                    <Phone />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone'></input>
                </div>

                <div className='login-input'>
                    <LockKeyhole />
                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder='PIN'></input>
                </div>

                <div className='button-container'>
                    <button onClick={handleSubmit}>Login</button>
                </div>


            </div>


        </div>
    )
}

export default Login