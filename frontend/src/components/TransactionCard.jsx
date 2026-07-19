import React from 'react'
import { MoveUp , MoveDown,Phone} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function TransactionCard() {
  const navigate=useNavigate()
  function handleTransfer() {
    navigate("/transfer")
  }
  return (
    <div className='transaction-container'>
    <div className='transfer-icon'>
        <div onClick={handleTransfer}><MoveUp /></div>
        <span>CBE transfer</span>
        <div className='vertical-line'></div>
    </div>
    <div className='recieve-icon'>
      <div className=''> <MoveDown /> </div>
      <span>Receive</span>

    </div>
    </div>
  )
}

export default TransactionCard