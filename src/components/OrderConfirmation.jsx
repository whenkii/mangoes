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
const deliveryCharges = props.match.params.deliverycharges;
const [,,,,,,,,,,,,configState,currency] = useContext(productContext);
const paymentDetails = configState[0].val ? JSON.parse(configState[0].val.filter( a => a.NAME === "PAYMENTINFO")[0].JSON_STRING).value:null;
const {whatsappNo} = paymentDetails ? paymentDetails :123;
const delDate = configState[0].val ? JSON.parse(configState[0].val.filter( a => a.NAME === "DEL_DATE")[0].JSON_STRING).value:null;
const [state, setState] = useState([])
const stateReducer = state.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0) + parseInt(deliveryCharges,10);
const currencySymb = currency === "SGD" ? "$" : "";
const selctiveState = state.map(({PAYMENT,ADDRESS,DELIVERY:DELIVERYMODE}) => ({PAYMENT,ADDRESS,DELIVERYMODE}))[0];
const newState = state.map(({NAME,OFFERPRICE,QTY,TOTAL}) => ({NAME,OFFERPRICE,QTY,TOTAL}));
// console.log(selctiveState)

// const getDBValue = (props) => {
//     return JSON.parse(configState[0].val.filter( a => a.NAME === props)[0].JSON_STRING).value
// }

// const selfAddress = getDBValue("SELF_LOCATIONS"); 
// const newState =  state.length > 0 ? state.map(a => ({a,ADDRESS: a.DELIVERY === 'delivery' ? a.ADDRESS : selfAddress.filter(a => a.name === a.location).details})) :[];

// console.log(newState);

const query = `select NAME,OFFERPRICE,QTY,OFFERPRICE*QTY Total,paymode payment,(case when del_mode='delivery' then address else Decode(location,'Punggol','Venkat, Blk - 679A,S-821679,Mob: 81601289','Tampines','Venky, Near Tampines West MRT,520929,Mob:98346177','Pasir Ris','Mohan,Blk 574,Pasir Ris St 53,S-520574,Mobile: 90628025','Upper Changi','Naveen, Blk 718,03-06,Changi Green,486849,Mobile : 86482486','Woodlands','Srinivas Reddy,Blk 724, #03-502,Woodlands ave 6,730724,Mobile : 91003247') end) address,del_mode delivery from orders a,products b,deliveries c where a.prodid=b.id and a.id=c.order_id and a.id=${props.match.params.id}`;
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
            <div className="text-success text-center mb-1 font-weight-bold">Completed</div>
            <div class="progress mb-2">
                <div class="progress-bar progress-bar-striped w-100 bg-success" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <ToastContainer position="top-center" autoClose="1000"/>
            <faIcons.FaPrayingHands className="icons"/>
            <div className="justify-content-center">
                <p className="align-self-start pt-2">Thank you for your Order : <span className="text-danger" >GR-{props.match.params.id}</span> </p>
                <p className="align-self-start p-1">Next Delivery : <span className="text-danger" >{delDate}</span> </p>
                <p className="align-self-start p-1">Contact - <span className="text-danger" >{whatsappNo}</span> for any further queries</p>
            </div>
            <div className="text-danger text-center">Order Summary  </div>
                <DisplayTableData state={newState} comp="ORDER_CONFIRMATION" bgClr="dark" />
                <div className="border p-1 w-75 m-auto">
                {Object.keys(selctiveState).map((item,i) => 
                    <div className="d-flex justify-content-center" key={i}>
                        <div className="details col-2 text-danger p-2 align-self-center">{item} </div>
                        {/* <div className="col-1"> :</div> */}
                        <div className="details col m-1">{selctiveState[item]}</div>
                    </div>
                )}
                </div>
                <div className="d-flex justify-content-center font-weight-bold mt-2 cartSummaryHeaders">
                    <div className="">{`Delivery Charges`}  <span className="text-danger">${deliveryCharges} </span> </div>
                    {/* <small className="align-self-end ml-2 mb-1 font-weight-bold">{currency}</small> */}
                </div>
                <div className="total">{` Total - `} <span className="text-danger">{currencySymb}{stateReducer} </span></div>
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
.details{
    font-size:0.5rem;

}
`
