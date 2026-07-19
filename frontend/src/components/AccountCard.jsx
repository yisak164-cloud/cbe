import React, { useState } from 'react'
import "../styles/AccountCard.css"
import Logo from "../../public/images/image.png"
import { Copy, Eye, EyeOff } from "lucide-react"
function AccountCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false)
    return (
        <div className='account-card'>
            <div className='logo-motto'>
                <img src={Logo} width={60} height={60}></img>
                <div className='motto'>
                    <span>Commercial Bank of Ethiopia</span>
                    <span>The bank you can always rely on!</span>
                </div>
            </div>
            <div className='balance'>
                {isBalanceVisible ? <>
                    <pre>1000.000 ETB</pre>
                    <Eye onClick={() => setIsBalanceVisible(false)} />
                </> : <>
                    <pre>***  *** ETB</pre>
                    <EyeOff onClick={() => setIsBalanceVisible(true)} />
                </>}
            </div>
            <div className='account'>
                <span>Wadiah Staff</span>
                {isBalanceVisible ? <span>10005353844728</span> :
                    <span>1*********4728</span>}
                <Copy />
            </div>
        </div>
    )
}
export default AccountCard
