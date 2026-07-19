import { useContext,createContext,useState, children } from "react";

//there is 3 step fiirset create context

//cretecontext use to share
const usercontext=createContext(null)

//step2 create context provider-it share data to other componnent

 export const UsercontextProvider=({children})=>{
  
  const[state,setState]=useState(()=>{
    const savedUser=localStorage.getItem("user")
    if(savedUser){
        return {user:JSON.parse(savedUser)}
    }
    return {user:null}
  })
//not to share setstate we use function
function updateUserState(data){
    setState(data)
}

    return <usercontext.Provider value={{state,updateUserState}}>
        {children} 
    </usercontext.Provider>
}

//create use context
export function useUsercontext(){
         const context=useContext(usercontext)
         if(!context){
            throw new Error("context error")
         }
return context

}