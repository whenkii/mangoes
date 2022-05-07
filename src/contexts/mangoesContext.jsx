import React,{createContext,useReducer,useEffect,useState} from 'react'
// import axios from 'axios'
import { GetApiData } from '../components/ApiCalls';
// import {config} from '../components/reactConfig'
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import {config} from '../components/reactConfig'


let products = []
let inItDelivery = {shipMode:"",address:"",location:""}

var productsInit; 

export const productContext = createContext();


const CartReducerFun = (state,action) => {
    var tempState     = [...state];
    var {type,prodid,accountInfo} = action;
    var {deliveryDetails} = action;
    var idx           = tempState.findIndex( a => a.ID === prodid);
    switch (type) {
        case "INIT" :
            tempState = [...action.state];
            tempState = tempState.map( a => ({...a,QTY:0,inCart:false}))
            products = [...tempState];
            productsInit = [...tempState]
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
                return [...tempState];
                }
                else if (QTYVar === 0) {
                    toast.warning(`This item is not in the Cart`)
                    return state;
                }
                break;
        case "DELETE":  
                tempState[idx] = {...tempState[idx],QTY:0,INCART:"N"};
                return [...tempState];
        case "BLANK_PAYEMENT_MODE":  
        toast.error("Choose Payment mode")
        return [...tempState];
        case "CREATE_ORDER":
            tempState = [...state]
            //Extract necessary attributes from Cart/State
            // console.log(deliveryDetails)
            let newState = state.map(i => 
                ({EMAIL:accountInfo.email,PRODID:parseInt(i.ID,10),QTY:parseInt(i.QTY,10),PRICE:parseInt(i.OFFERPRICE,10),
                  DELMODE:deliveryDetails.shipMode,
                  ADDRESS:String(deliveryDetails.address),
                  LOCATION:deliveryDetails.location,DELIVERYCHARGES:deliveryDetails.charge,
                  PAYMENTMODE:deliveryDetails.paymentMode
                }));
            //Get products that are in cart only
            newState = newState.filter(a => a.QTY > 0);
            // console.log(newState)
            // console.log(deliveryDetails)

            //Call Proc to save the order details in DB
            if (!deliveryDetails.DELMODE) {
            axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/executeProc_log_order`,newState)
                .then(({data,status}) => {
                    if ( status && status !== 200 ) {
                        // alert("Order creation failed error code - " + status);
                        toast.error("Order creation failed")
                    }
                    else {
                        toast.success("Order has been successfully created");
                        // console.log(tempState);
                        tempState = [...productsInit]
                        // console.log(tempState);
                        //  console.log(tempState);
                    }
                            })
                .catch((e) => {
                        // console.log(e);
                        toast.error(`Order creation failed`); 
                        tempState = [...state]
                    })
                }
                else {
                    toast.error(`Choose Delivery mode`); 
                }
            // console.log(tempState)
            return [...tempState]; 
        case "CLEAR":
            // toast.success("Cart has been cleared")
            return [...products];
        default :
            return state;
    }
} 

const deliveryReducer = (state,action) => {
    var tempState     = [...state];
    var {shipMode,location,address} = action;

    if (action.type === "SHIPMENT_MODE") {
    tempState[0].shipMode = shipMode;
    }
    else if (action.type === "ADDRESS") {
        tempState[0].location = location;
        tempState[0].address = address;
    }
    else if ( action.type === "CLEAR") {
        return [...inItDelivery]
    }
    return [...tempState]
   
} 

export function ProductsProvider(props) {
// const [accountInfo] = useContext(accountsContext);
const [productsState,productAction] = useReducer(CartReducerFun,[{ID:1,NAME:"INIT",PRICE:"34",OFFERPRICE:32,UNITS:"5Kg",INSTOCK:"Y",INCART:false,QTY:0,}]);
const [deliveryState,deliveryAction] = useReducer(deliveryReducer,[inItDelivery]);
const cartReducer = 1;
const productCountReducer = (props) => productsState.filter(a => a.ID === props && a.QTY > 0).reduce((prev,curr) => prev + curr.QTY,0);
const productCountAll = productsState.reduce((prev,curr) => prev + curr.QTY,0);
const [orderCreated,setOrderCreated] = useState(false)

useEffect( () => {
    GetApiData("select a.NAME,a.ID,UNITS,PRICE,OFFERPRICE,CASE WHEN INSTOCK='Y' and STOCK - ORDERED <= 1 THEN 'N' ELSE  INSTOCK END INSTOCK from products a left outer join stock b on ( a.NAME=b.name)")
    .then((res) => {
        // console.log(res)
        if (res[0] === "ERROR"){
            alert("Error while getting products details");    
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
        <ToastContainer position="top-center" autoClose="1000"/>
        <productContext.Provider value={[productsState,productAction,cartReducer,productCountReducer,productCountAll,deliveryState,deliveryAction,orderCreated,setOrderCreated]}>
            {props.children}
        </productContext.Provider>
        </>
    )
}
