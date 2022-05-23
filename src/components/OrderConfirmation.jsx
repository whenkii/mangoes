import React,{useContext,useEffect,useState} from 'react'
import {productContext} from '../contexts/mangoesContext'
// import {Link} from 'react-router-dom'
import styled from 'styled-components'
import * as faIcons from 'react-icons/fa'
import {AllSpinners} from './Spinners';
import DisplayTableData from './DisplayTableData'
import { ToastContainer,toast } from 'react-toastify';
import { GetApiData } from '../components/ApiCalls';
// import mango from '../images/mango.svg'
// import { ToastContainer, toast } from 'react-toastify';

export default function OrderConfirmation(props) {
const [,,,,,,,,,,,deliveryCharges,configState] = useContext(productContext);
const paymentDetails = configState[0].val ? JSON.parse(configState[0].val.filter( a => a.NAME === "PAYMENTINFO")[0].JSON_STRING).value:null;
const {whatsappNo} = paymentDetails ? paymentDetails :123;
const delDate = configState[0].val ? JSON.parse(configState[0].val.filter( a => a.NAME === "DEL_DATE")[0].JSON_STRING).value:null;
const [state, setState] = useState([])
const stateReducer = state.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0) + deliveryCharges;

const query = `select NAME,OFFERPRICE,QTY,status,OFFERPRICE*QTY Total,paymode payment_mode,(case when del_mode='delivery' then address else Decode(location,'Punggol','Blk - 679A,S-821679,Mob: 81601289','Tampines','Tampines West MRT,520929,Mob:98346177','Upper Changi','Desi Mart Pte Ltd,#01-67,20 The Glades,Mob: 98346177') end) address,del_mode delivery,a.ts order_time from orders a,products b,deliveries c where a.prodid=b.id and a.id=c.order_id and a.id=${props.match.params.id}`;
useEffect( () => {
    const timer = setTimeout(() =>
    GetApiData(query)
    .then((res) => {
        // console.log(res)
        if (res[0] === "ERROR"){
            toast.error("Error while getting order details");    
        }
        else if ( res.length === 0 )  {
            toast.error("No Data found");
        }
        else if ( res.length > 0 ) {
                setState(res);
                toast.success("Order has been successfully created");
            }
        }
    )
    .catch ( (e) => {
        toast.error(e);
    })
     , 2000);
     return () => {
        clearTimeout(timer);
      };

    },[query])
    return (
        <>
        { state && state.length > 0 ?
        <MainContainer className="container">
            <ToastContainer position="top-center" autoClose="1000"/>
            <faIcons.FaPrayingHands className="icons"/>
            <div className="justify-content-center">
                <p className="align-self-start pt-2">Thank you for your Order : <span className="text-danger" >GR-{props.match.params.id}</span> </p>
                <p className="align-self-start p-1">Next Delivery : <span className="text-danger" >{delDate}</span> </p>
                <p className="align-self-start p-1">Contact - <span className="text-danger" >{whatsappNo}</span> for any further queries</p>
            </div>
            <div className="text-danger text-center">Order Summary  </div>
                <DisplayTableData state={state} comp="ORDER_CONFIRMATION" bgClr="dark" />

                <div className="d-flex justify-content-center font-weight-bold mt-2 cartSummaryHeaders">
                    <div className="">{`Delivery Charges`}  <span className="text-danger">${deliveryCharges} </span> </div>
                    {/* <small className="align-self-end ml-2 mb-1 font-weight-bold">{currency}</small> */}
                </div>
                <div className="total">{` Total - `} <span className="text-danger">${stateReducer} </span></div>
        </MainContainer>
        : <AllSpinners />
        }
    </>
    )
}


const MainContainer = styled.div`
background-color:white;
font-style:italic;
margin-top:10rem;
padding:2rem;
text-align:center;
font-weight:bold;
border-radius:50px;
.icons{
    font-size:6rem;
    color:orange;
    margin:1rem;
}
.total{
    font-size:150
}
.handshake-icon{
    font-size:6rem;
    color:orange;
    padding-bottom:2rem;
}
.navImage{
    height:2rem;
}
.cartSummaryHeaders{
    font-weight:bold;
    margin-left:1rem;
   }
@media (max-width: 820px ) {
    align:center;
}
.align-self-start{
    font-size:0.6rem;
}

`
