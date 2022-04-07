import React,{createContext,useReducer,useEffect} from 'react'
import axios from 'axios'
import { GetApiData } from '../components/ApiCalls';
import {config} from '../components/reactConfig'
import { ToastContainer,toast } from 'react-toastify';

let products = []

export const productContext = createContext();


const CartReducerFun = (state,action) => {
    var tempState     = [...state];
    var {type,prodid,accountInfo} = action;
    var idx           = tempState.findIndex( a => a.ID === prodid);
    switch (type) {
        case "INIT" :
            tempState = [...action.state];
            tempState = tempState.map( a => ({...a,QTY:0,inCart:false}))
            products = [...tempState];
            return [...tempState];
        case "ADD" :
            tempState[idx] = {...tempState[idx],QTY:parseInt(tempState[idx].QTY ? tempState[idx].QTY : 0,10)+1,INCART:"Y"};
            toast.success("Item has been added to Cart")
            return [...tempState];
        case "REMOVE":
                var QTYVar =  parseInt(tempState[idx].QTY,10)
                if ( QTYVar > 0 )
                {
                QTYVar = parseInt(tempState[idx].QTY,10)-1;
                tempState[idx] = {...tempState[idx],QTY:QTYVar,INCART: QTYVar > 0 ? "Y":"N"};
                toast.warning("Item removed from Cart")
                }
                return [...tempState];
        case "DELETE":  
                tempState[idx] = {...tempState[idx],QTY:0,INCART:"N"};
                return [...tempState];
        case "BLANK_PAYEMENT_MODE":  
        toast.error("Choose Payment mode")
        return [...tempState];
        case "CREATE_ORDER":
            tempState = [...state]
            //Extract necessary attributes from Cart/State
            let newState = state.map(i => ({EMAIL:accountInfo.email,PRODID:parseInt(i.ID,10),QTY:parseInt(i.QTY,10),PRICE:parseInt(i.PRICE,10)}));
            //Get products that are in cart only
            newState = newState.filter(a => a.QTY > 0);

            //Call Proc to save the order details in DB
            axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/executeProc_log_order`,newState)
                .then(({data,status}) => {
                    if ( status && status !== 200 ) {
                        alert("Order creation failed error code - " + status);
                    }
                    else {
                        alert("Order has been successfully created");
                        tempState = [...products]
                    }
                            })
                .catch((e) => {
                        // console.log(e);
                        alert(`API call failed \n` + e); 
                        tempState = [...state]
                    })
            // console.log(tempState)
            return [...tempState]; 
        case "CLEAR":
            toast.success("Order created. Success!!!")
            return [...products];
        default :
            return state;
    }
} 

export function ProductsProvider(props) {
// const [accountInfo] = useContext(accountsContext);
const [productsState,productAction] = useReducer(CartReducerFun,[{ID:1,NAME:"Banginapalli",PRICE:"34",UNIT:"5Kg",BGCLR:"orange",PRICECLR:"var(--bsRed)",INCART:false,QTY:0,CARTBGCLR:"white",CARTCLR:"var(--bsRed)"}]);
const cartReducer = 1;
const productCountReducer = (props) => productsState.filter(a => a.ID === props && a.QTY > 0).reduce((prev,curr) => prev + curr.QTY,0);

useEffect( () => {
    GetApiData("select * from products")
    .then((res) => {
        // console.log(res)
        if (res[0] === "ERROR"){
            alert("Error while pulling the products from DB");    
        }
        else if ( res.length === 0 )  {
        alert("No Data found");
        }
        else if ( res.length > 0 ) {
            // console.log(res)
                // productAction({type:"INIT",state:res})
                productAction({type:"INIT",state:res})

            }
        }
    )
    .catch ( (e) => {
        alert(e)
    })
    },[])
    return (
        <>
        <productContext.Provider value={[productsState,productAction,cartReducer,productCountReducer]}>
            {props.children}
        </productContext.Provider>
        <ToastContainer position="top-center" autoClose="1000"/>
        </>
    )
}
