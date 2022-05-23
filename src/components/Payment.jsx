import React,{useState,useContext,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
import {accountsContext} from '../contexts/accountsContext'
import { GetApiData } from '../components/ApiCalls';
import styled from 'styled-components'
import qrcode from '../images/Venkat_Paynow.jpeg'
import * as fasIcons from 'react-icons/fa'
import { ToastContainer,toast } from 'react-toastify';
import {AllSpinners} from './Spinners';
// import {config} from '../components/reactConfig'
// import * as biIcons from 'react-icons/bi' 

export default function Payment() {
var history = useHistory();
// const [productsState,productAction]=useContext(productContext);
const [productsState,productAction,,,productCountAll,deliveryState,deliveryAction,,,,,deliveryCharges,configState,currency]=useContext(productContext);
const {shipMode} = deliveryState[0];
const inCartItems = productsState.filter(a => a.QTY > 0);
const [accountInfo] = useContext(accountsContext);
const [orderForm,setOrderForm] = useState({address1:"",address2:"",postalcode:"",mobile:"",paymentMode:""});
const [orderId,setOrderID] = useState(null);
const [isLoading,setIsLoading]= useState(true);
const [status,setStatus]= useState();
const currencySymb = currency === "SGD" ? "$" : "";

const paymentDetails = JSON.parse(configState[0].val.filter( a => a.NAME === "PAYMENTINFO")[0].JSON_STRING).value;
const {companyName,uniquePayID,bankDetails,whatsappNo,bankIfscSwiftCodeType,swiftIfscCodeValue,payemntOptions} = paymentDetails


const funOnChange = (e) => {
    setOrderForm({...orderForm,[e.target.name]:e.target.value})
}

// const [orderCreated,setOrderCreated] = useState(false)
const createOrder = (e) => {
    e.preventDefault();

    // if (!accountInfo.isLoggedIn) {
    //     toast.error(`Login to complete the Order`); 
    //     history.push("/account")
    //  }
    // else {
        if (orderForm.paymentMode) {
        
        productAction({type:"CREATE_ORDER",accountInfo:accountInfo,orderid:orderId,deliveryDetails:{...deliveryState[0],paymentMode:orderForm.paymentMode,deliveryCharges:deliveryCharges}});
        productAction({type:"CLEAR"});
        deliveryAction({type:"CLEAR"});
        history.push(`/orderconfirmation/${orderId}`)
        }
        else {
            productAction({type:"BLANK_PAYEMENT_MODE"});
        }
    // }
  }

const query = `select orders_seq.nextval seqid from dual`;

    useEffect(() => {
        GetApiData(query,"Payment")
        .then((result) => {
        setIsLoading(false);
    //Set state once data is returned from AXIOS
       if (result[0] === "ERROR")
       {
        toast.error( `Error !!!`)  
        setStatus("ERROR");
       }
        setOrderID(result[0].SEQID)
                         })
        .catch((e) => {
                    //    alert( `Error\n ` + e);
                       setStatus("ERROR");
                       setIsLoading(false);
                       toast.error( `Error\n ` + e)  
                        })
    }, [query])
  //Unmount
  useEffect(() => () => {}, []) 
  return (
    <Maincontainer className="container">
        <ToastContainer position="top-center" autoClose="1000"/>
        {status === "ERROR" ?
                <div className="d-flex justify-content-center mt-3">
                    <div className="btn btn-sm back-btn" onClick={() => history.goBack()}>BACK <fasIcons.FaBackward className="icons" /> </div> 
                </div>
        :
        <>
        {!isLoading ?
            <>
                <div className="text-center text-danger font-weight-bold">
                    <span className="ml-auto" style={{color:"var(--amzonChime)"}}>Total:</span> 
                    <span>{` ${currencySymb}${inCartItems.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0) + (productCountAll < 5 && shipMode === "delivery" ? deliveryCharges : 0)}`}</span>
                </div>
                <div className="card-header mt-1">PAYEMNT</div>
                {/* <div className="text-center mt-1 text-danger"> <span className="text-dark font-weight-bold">ORDERID </span> : <span className="font-weight-bold">GR-{orderId}</span></div> */}
                <div className="text-center mt-1 text-dark"> Tracking Number <span className=" text-danger font-weight-bold">GR-{orderId} </span></div>
                <div className="text-center text-danger"> <small>Please mention above tracking No# while making payment</small></div>
                <div className="d-flex justify-content-center paymentOptions"> 
                    {payemntOptions.map ((item,i) => 
                        <div className="form-check" key={i}>               
                            <input className="form-check-input" type="radio" value={item.value} name="paymentMode" 
                                checked={orderForm.paymentMode === item.value} onChange={funOnChange} />
                            <label className="form-check-label" htmlFor={item.value}>{item.type}</label>
                        </div>
                    )}
                        

                        {/* <div className="form-check">               
                            <input className="form-check-input" type="radio" value="bank" name="paymentMode" 
                                checked={orderForm.paymentMode === "bank"} onChange={funOnChange} />
                            <label className="form-check-label" htmlFor="bank">Bank A/C</label>
                        </div>

                        <div className="form-check">               
                            <input className="form-check-input" type="radio" value="later" name="paymentMode" 
                                checked={orderForm.paymentMode === "later"} onChange={funOnChange} />
                            <label className="form-check-label" htmlFor="later">PayLater</label>
                        </div> */}
                </div>

                <div className="text-center mt-4">
                        {orderForm.paymentMode === "qrcode" &&
                            <>
                                <p className="text-danger font-weight-bold mb-0"> {uniquePayID} </p>
                                {/* <p className="text-danger font-weight-bold m-0"> PayNow <span>: 81601289</span></p> */}
                                <p className="font-weight-bold m-0 mb-2" style={{color:"var(--amzonChime)"}}> {companyName}</p>
                                <img className="navImage m-auto" src={qrcode} alt="Logo" /> 
                                
                            </>
                        }
                    
                    { orderForm.paymentMode === "bank" &&
                        <div className="card-body">
                            {bankDetails.map((item,i) => 

                                <p className="addressLines" key={i}>{item}</p>
                            )}
                            <p className="form-check-label"> {bankIfscSwiftCodeType} <span className="text-danger" >{swiftIfscCodeValue} </span></p>
                        </div> 
                    }

                    {
                           
                           <p className="form-check-label"> 
                                <a href={`https://wa.me/${whatsappNo}`}>
                                    <span className=" whatsapptext text-success"> <fasIcons.FaWhatsapp className="whatsapp" /> WhatsApp </span>
                                </a>
                                Payment confirmation to <span className=" whatsapptext text-danger" > {whatsappNo} </span> 
                            </p>
                    }

                </div>

                <div className="d-flex justify-content-center mt-3">
                        <div className="btn btn-sm back-btn" onClick={() => history.goBack()}>BACK <fasIcons.FaBackward className="icons" /> </div> 
                        <div className="btn btn-sm proceed-btn" onClick={createOrder}>CONFIRM ORDER <fasIcons.FaForward className="icons" /> 
                        </div>
                </div>
            </>
             :  <AllSpinners props="all"/>
        }
        </>
        }
        
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:7rem;
padding:1rem;
border-radius:1rem;
color:white;
.card-header{
    padding:0.4rem;
    background:var(--amzonChime);
    text-align:center;
    color:white;
    font-weight:bold;
    border-radius:1rem;
}
.paymentOptions{
    margin-top:1rem;
    border:0.1rem solid var(--amzonChime);
    border-radius:1rem;
    padding:0.2rem;
}
.form-check-label{
    color:var(--amzonChime);
    font-weight:bold;
}
.form-check{
    margin:0.5rem;
}
.addressLines{
    color:var(--amzonChime);
    margin:0;
    font-weight:bold;
}
.btn{
    margin:0 0 1rem 0;
    width:12rem;
}
.navImage{
    height: 14rem;
    width:  16rem;
    margin:1rem;
}
.back-btn{
    background:var(--bsDark);
    color:white;
    text-align:center;
    margin-right:1rem;
}
.proceed-btn{
    background:var(--bsGreen);
    color:white;
    text-align:center;
    margin-left:2rem;
}
.whatsapptext{
    font-size:0.8rem;
}
.whatsapp{
    color:var(--bsGreen);
    font-size:2rem;
}
.icons{
    font-size:1.5rem;
    margin-left:1rem;
}
@media (max-width:798px){
    .form-check-label{
        font-size:0.8rem;
    }
    .icons{
        font-size:1.2rem;
        margin-left:0.8rem;
    }
    .btn{
        font-size:0.7rem;
        padding:0.4rem;
        width:10rem;
    }
    .paymentOptions{
        font-size:0.5rem;
    }
}
`
