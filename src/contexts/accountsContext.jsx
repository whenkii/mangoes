import React,{createContext,useReducer,useState} from 'react'
import { ToastContainer,toast } from 'react-toastify';

export const accountsContext = createContext(); 

const userInfo = {firstname:"",lastname:"",email:"",type:"",isLoggedIn:false,loginType:""};

const accountReducer = (state,action) => {
    var {type,value,mess} = action;
    switch (type) {
        case "SIGNIN" :
            toast.success("Login Successful")  
            return {...value};
        case "GUEST" :
            toast.success("Logged in as a Guest")  
            return {...value,loginType:"GUEST",isLoggedIn:true};
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
        case "CLEAR" :
            // toast.error("Login Error!")  
            return {accountInfo:userInfo};
        case "OTHER" :
        toast.error(mess)  
        return {accountInfo:userInfo};
        default :
            return {accountInfo:userInfo};
    }
} 

export function AccountsProvider(props) {
const [accountInfo,accountAction] = useReducer(accountReducer,false);
const [forceRender,setRender] = useState(false)
    return (
        <>
        <accountsContext.Provider value={[accountInfo,accountAction,forceRender,setRender]}>
            {props.children}
        </accountsContext.Provider>
        <ToastContainer position="top-center" autoClose="1000"/>
        </>
    )
}
