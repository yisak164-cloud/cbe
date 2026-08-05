
import React, { useState } from 'react'
import { ChevronLeft, CreditCard, Delete, Check, Plus, Lock, Banknote, QrCode } from 'lucide-react'
import '../styles/Transfer.css'
import { NavLink } from 'react-router-dom'
import { api } from '../services/axios'
function Transfer() {
    const [activeTab, setActiveTab] = useState('other')
    const [receiverAccount, setReceiverAccount] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [amount, setAmount] = useState("")
    const [receiverName, setReceiverName] = useState("")
    const user = JSON.parse(localStorage.getItem("user"))
    const [pin, setPin] = useState("")
    const [pinConfirm, setPinConfirm] = useState(false)
    //handleing the pressed button at the input
    const handlePinPress = (digit) => {
        if (pin.length < 4) {
            setPin(pin + digit)
        }
    }
    const handlePinDelete = () => {
        setPin(pin.slice(0, -1))
    }
const handlePinConfirm = async () => {
    if (pin.length !== 4) {
        alert("Enter a 4 digit PIN");
        return;
    }

    try {
        const response = await api.post(
            "/transactions",
            { receiverAccount, amount, pin },
            { responseType: "blob" }
        );

        const pdfBlob = new Blob([response.data], {
            type: "application/pdf"
        });

        const downloadUrl = window.URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "transaction-receipt.pdf";
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        setPinConfirm(false);
        setPin("");
        setReceiverAccount("");
        setAmount("");

        alert("Transfer successful!");

    } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
    }
};

    const handleContinue = async () => {
        const cbeRegex = /^\d{13}$/;
        if (!cbeRegex.test(receiverAccount)) {
            alert("invalid account number")
            return
        }
        if (Number(amount) <= 0) {
            alert("amount can not be negative or zero")
            return
        }
        // send data to backend
        try {
            setLoading(true)
            const response = await api.get(`/confirmAccount/${receiverAccount}`)
            setLoading(false)
            setOpenModal(true)
            setReceiverName(response.data.accountHolder)
        } catch (error) {
            setError("account not found :" + receiverAccount)
            setLoading(false)
        }

    }
    return (
        <div className="transfer-container">
            <div className='transfer-form'>

                {/* Header */}
                <div className="transfer-header">
                    <button className="back-btn">
                        <NavLink to={"/home"}>
                            <ChevronLeft size={22} />
                        </NavLink>
                    </button>
                    <h2>CBE Transfer</h2>
                </div>

                {/* Tab Switch */}
                <div className="tab-switch">
                    <button
                        className={`tab-btn `}
                        onClick={() => setActiveTab('other')}
                    >

                    </button>
                    <button
                        className={`tab-btn `}
                        onClick={() => setActiveTab('own')}
                    >

                    </button>
                </div>

                {/* From Account Card */}
                <div className="from-account-card">
                    <div>
                        <p className="from-label">From Account</p>
                        <p className="from-name">Wadiah Staff Sa - 1********8657</p>
                        <p className="from-balance">•••••• 👁</p>
                    </div>
                    <div className="change-btn">
                        <span>▼</span>
                        <p>Change</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="input-group">
                    {error && <span>{error}</span>}
                    <div className="input-wrapper">
                        <CreditCard className="input-icon" />
                        <input type="text"
                            onChange={(e) => setReceiverAccount(e.target.value)}
                            value={receiverAccount}
                            placeholder="Account Number*" />
                        <QrCode className="input-icon-right" />
                    </div>

                    <div className="input-wrapper">
                        <Banknote className="input-icon" size={20} />
                        <input type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="Amount*" />
                    </div>
                </div>

                {/* Add Remark */}
                <div className="remark">
                    <Plus size={16} />
                    <span>Add remark</span>
                    <input type="text" placeholder='*default MB transfer' className='remark-default' />
                </div>

                {/* Continue Button */}
                <button className="continue-btn"
                    disabled={loading}
                    onClick={handleContinue}>{loading ? (<>loading...</>) : <>Continue</>}</button>



            </div>

            {
                openModal && <div className='modal-overlay' onClick={() => setOpenModal(false)}>
                    <div className='modal' onClick={(e)=>e.stopPropagation()}>
                        <h1>Please confirm</h1>
                        <div className='account-user-info'>
                            <span>From</span>
                            <div>
                                <span>{user.fullName}</span>
                                <span>1000********
                                    {user.account[9]}
                                    {user.account[10]}
                                    {user.account[11]}
                                    {user.account[12]}
                                </span>
                            </div>
                        </div>
                        <div className='account-user-info'>
                            <span>To</span>
                            <div>
                                <span>{receiverName}</span>
                                <span>
                                    1000********
                                    {receiverAccount[9]}
                                    {receiverAccount[10]}
                                    {receiverAccount[11]}
                                    {receiverAccount[12]}
                                </span>
                            </div>
                        </div>
                        <div className='total'>
                            <span>Total Amount</span>
                            <span>{amount}<sub>ETB</sub></span>

                        </div>
                        <div className='confirm-btn-container'>
                            <button onClick={() => setOpenModal(false)}>Cancel</button>
                            <button onClick={() => {
                                setOpenModal(false)
                                setPinConfirm(true)
                            }}>Confirm</button>
                        </div>

                    </div>

                </div>
            }

            {
                pinConfirm && (<div className='pin-overlay' onClick={()=> setPinConfirm(false)}>
                    <div className='pin-modal' onClick={(e)=>e.stopPropagation()}>
                        <h2>Enter your PIN to confirm</h2>
                        <Lock />
                        <input type="password" id="pin" maxLength={4} value={pin} readOnly />
                        <div className='pin-keypad'>
                            <button onClick={() => handlePinPress('1')}>1</button>
                            <button onClick={() => handlePinPress('2')}>2</button>
                            <button onClick={() => handlePinPress('3')}>3</button>
                            <button onClick={() => handlePinPress('4')}>4</button>
                            <button onClick={() => handlePinPress('5')}>5</button>
                            <button onClick={() => handlePinPress('6')}>6</button>
                            <button onClick={() => handlePinPress('7')}>7</button>
                            <button onClick={() => handlePinPress('8')}>8</button>
                            <button onClick={() => handlePinPress('9')}>9</button>
                            <button onClick={() => handlePinDelete()}><Delete /></button>
                            <button onClick={() => handlePinPress('0')}>0</button>
                            <button onClick={() => handlePinConfirm()}><Check /></button>
                        </div>
                        <button onClick={() => handlePinConfirm()} id='btn-transfer'>Transfer</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Transfer
