import React,{createContext,useReducer,useEffect} from 'react'
import axios from 'axios'
import {accountsContext} from './accountsContext'
import {config} from '../components/reactConfig'
import { ToastContainer,toast } from 'react-toastify';
import {config} from '../components/reactConfig'
import {accountsContext} from '../contexts/accountsContext'
// import {GetProducts} from '../components/ApiCalls'

export const productContext = createContext();


// let isProductLoaded = false;

let products = [];

// let orderByAttr;                
// const propComparator = (propName) => (a, b) => {
//     if (orderByAttr === propName) {
//         return a[propName] === b[propName] ? 0 : a[propName] > b[propName] ? 1 : -1;
//     }
//     else {
//     orderByAttr = propName;
//     return a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;
//     }
// };


const isLoadingReducer = (state,action) => {
    return action;
}

const [accountInfo] = useContext(accountsContext);

const cartReducer = (state,action) => {
    var tempState     = [...state];
    var {type,prodid} = action;
    var idx           = tempState.findIndex( a => a.ID === prodid);
    switch (type) {
        case "INITIALIZE":
            tempState = [...action.rows];   
            products = [...action.rows];
            // isLoadingActions(true);
        return [...tempState];
        case "ADD" :
            tempState[idx] = {...tempState[idx],QTY:parseInt(tempState[idx].QTY,10)+1,INCART:"Y"};
            return [...tempState];
        case "REMOVE":
                var QTYVar = parseInt(tempState[idx].QTY,10) > 0 ? parseInt(tempState[idx].QTY,10)-1 : parseInt(tempState[idx].QTY,10);
                tempState[idx] = {...tempState[idx],QTY:QTYVar,INCART: QTYVar > 0 ? "Y":"N"};
                return [...tempState];
        case "DELETE":  
                tempState[idx] = {...tempState[idx],QTY:0,INCART:"N"};
                return [...tempState];

        case "CREATE_ORDER":
            //Extract necessary attributes from Cart/State
            let newState = state.map(i => ({EMAIL:accountInfo.email,PRODID:parseInt(i.ID,10),QTY:parseInt(i.QTY,10),PRICE:parseInt(i.PRICE,10)}));
            //Get products that are in cart only
            newState = newState.filter(a => a.QTY > 0);

            //Call Proc to save the order details in DB
            axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/executeProc_log_order`,newState)
                .then(({data,status}) => {
                    if ( status && status !== 200 ) {
                        // alert("Order creation failed error code - " + status);

                        toast.error("Order creation failed error code - " + status)
                    }
                    else {
                        // alert("Order has been successfully created");
                        toast.success("Order has been successfully created")
                    }
                            })
                .catch((e) => {
                        // console.log(e);
                        toast.error(`Failed to create Order. Contact Support`); 
                    })
            return products; 

        case "CLEAR":
            toast.error(`Cart Cleared`); 
            return [...products];
        // case "ORDER":
        //    tempState.sort(propComparator(action.attr));
        //     return [...tempState];
        default :
            return state;
    }
} 

export function ProductsProvider(props) {
const [cart,productAction] = useReducer(cartReducer,products);
const [productsLoading,isLoadingActions] = useReducer(isLoadingReducer,true);
let isCartEmpty = cart.filter(a => a.QTY > 0).reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0) === 0 ? true : false;
useEffect(() => {
    axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/products`)
    .then(({data}) => {
            let {rows} = data;
            productAction({type:'INITIALIZE',rows:rows});
            isLoadingActions(false);
                     })
    .catch((e) => {
                    console.log(e);
                    })
}, [])
    return (
        <>
        <ToastContainer position="top-center" autoClose="1000"/>
        <productContext.Provider value={[cart,productAction,productsLoading,isCartEmpty,isLoadingActions]}>
            {props.children}
        </productContext.Provider>
        </>
    )
}
