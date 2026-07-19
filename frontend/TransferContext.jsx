import { useContext,createContext,useState } from "react";

//create
export const TransferContext=createContext("")

//provider
export const transferProvider=({children})=>{
         
    const [isTransferVerify,setIsTransferVerify]=useState()

    return(
        <TransferContext.Provider value={}>

        </TransferContext.Provider>
    )
}