import React,{createContext,useReducer} from 'react'
import { ToastContainer,toast } from 'react-toastify';

export const accountsContext = createContext(); 

const userInfo = {firstname:"",lastname:"",email:"",isLoggedIn:false};

const accountReducer = (state,action) => {
    var {type,value} = action;
    switch (type) {
        case "SIGNIN" :
            toast.success("Login Successful")  
            return {...value};
        case "SIGNOUT" :
            toast.success("Logout Successful")  
            return {accountInfo:userInfo};
        case "MISMATCH" :
            toast.error("Username/Password mismatch")  
            return {accountInfo:userInfo};
        case "USER_MISSING" :
            toast.info("User not exists. Pls Signup")  
            return {accountInfo:userInfo};
        case "FAILED" :
            toast.error("Login failed")  
            return {accountInfo:userInfo};
        case "ERROR" :
            toast.error("Login Error!")  
            return {accountInfo:userInfo};
        default :
            return {accountInfo:userInfo};
    }
} 

export function AccountsProvider(props) {
const [accountInfo,accountAction] = useReducer(accountReducer,false);
    return (
        <>
        <accountsContext.Provider value={[accountInfo,accountAction]}>
            {props.children}
        </accountsContext.Provider>
        <ToastContainer position="top-center" autoClose="1000"/>
        </>
    )
}
