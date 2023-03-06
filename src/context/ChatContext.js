import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
export const ChatContext=createContext()

// console.log(currentUser.uid)
export const ChatContextProvider=({children})=>{
    
    const {currentUser}= useContext(AuthContext)

    
    const INITIAL_STATE={
        user:{},
        chatId:"null",
    }

    const chatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uid ? currentUser.uid+action.payload.uid : action.payload.uid+currentUser.uid,
                    
                }

                
                default:
                    return state;
        }
    };
    


    // console.log(currentUser.uid)
    
    
    const [state,dispatch]=useReducer(chatReducer,INITIAL_STATE);
    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>
    )
}