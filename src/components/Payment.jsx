import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import qrcode from '../images/Venkat_Paynow.jpeg'
import * as fasIcons from 'react-icons/fa'
import { toast } from 'react-toastify';

export default function Payment() {
var history = useHistory();
// const [productsState,productAction]=useContext(productContext);
const [productsState,productAction,,,productCountAll,deliveryState]=useContext(productContext);
const {shipMode,location} = deliveryState[0];
const inCartItems = productsState.filter(a => a.QTY > 0);
const [accountInfo] = useContext(accountsContext);
const bankDetails = ["GardenRoots Pte Ltd","OCBC Account# : 712177963001"];
const [orderForm,setOrderForm] = useState({address1:"",address2:"",postalcode:"",mobile:"",paymentMode:""});

const funOnChange = (e) => {
    setOrderForm({...orderForm,[e.target.name]:e.target.value})
}

const createOrder = (e) => {
    e.preventDefault();

    if (!accountInfo.isLoggedIn) {
        toast.error(`Login to complete the Order`); 
        history.push("/account")
     }
    else {
        if (orderForm.paymentMode) {
        productAction({type:"CREATE_ORDER",accountInfo:accountInfo});
        history.push("/")
        }
        else {
            productAction({type:"BLANK_PAYEMENT_MODE"});
        }
    }
  }

  return (
    <Maincontainer className="container">
        <div className="cartTotal text-center text-danger font-weight-bold mt-2">
            <span className="ml-auto" style={{color:"var(--amzonChime)"}}>Total:</span> 
            <span>{` $${inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0) + (productCountAll < 5 && shipMode === "delivery" ? (location === "Other" ? 6 : 4) : 0)}`}</span>
        </div>
        <div className="card-header">PAYEMNT</div>
        <div className="d-flex justify-content-center form-check"> 
                <div className="form-check">               
                    <input className="form-check-input" type="radio" value="qrcode" name="paymentMode" 
                        checked={orderForm.paymentMode === "qrcode"} onChange={funOnChange} />
                    <label className="form-check-label" htmlFor="qrcode">PayNow QRCODE</label>
                </div>

                <div className="form-check">               
                    <input className="form-check-input" type="radio" value="bank" name="paymentMode" 
                        checked={orderForm.paymentMode === "bank"} onChange={funOnChange} />
                    <label className="form-check-label" htmlFor="bank">Bank Account</label>
                </div>

                <div className="form-check">               
                    <input className="form-check-input" type="radio" value="later" name="paymentMode" 
                        checked={orderForm.paymentMode === "later"} onChange={funOnChange} />
                    <label className="form-check-label" htmlFor="later">PayLater</label>
                </div>
        </div>

       
            <div className="text-center">
                {orderForm.paymentMode === "qrcode" &&
                    <>
                        <p className="text-danger font-weight-bold mb-0"> UEN : 201713208M </p>
                        <p className="text-danger font-weight-bold m-0"> PayNow <span>: 81601289</span></p>
                        <p className="font-weight-bold m-0 mb-2" style={{color:"var(--amzonChime)"}}> GARDEN ROOTS PTE. LTD</p>
                        <img className="navImage m-auto" src={qrcode} alt="Logo" /> 
                        
                    </>
                }
             
              { orderForm.paymentMode === "bank" &&
                <div className="card-body">
                    {bankDetails.map((item,i) => 

                        <p className="addressLines" key={i}>{item}</p>
                    )}
                    <p className="form-check-label"> SWIFT CODE <span className="text-danger" >: 201713208M </span></p>
                </div> 
               }

               { orderForm.paymentMode === "later" &&
                    <p className="form-check-label"> 
                        <span className="text-success"> WhatsApp </span>
                        <fasIcons.FaWhatsapp className="whatsapp" /> Payment confirmation to <span className="text-danger" > (+65) 81601289 </span> 
                    </p>
               }

            </div>

            <div className="d-flex justify-content-center mt-2">
                <div className="btn btn-sm back-btn" onClick={() => history.goBack()}>BACK</div>
                <div className="btn proceed-btn btn-sm" onClick={createOrder}>COMPLETE</div>
           </div>
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:7rem;
padding:3rem;
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
    width:50%;
}
.navImage{
    height: 14rem;
    width:  16rem;
    margin:1rem;
}
.back-btn{
    background:var(--bsYellow);
    color:black;
    text-align:center;
    margin-right:2rem;
}
.proceed-btn{
    background:var(--amzonChime);
    color:white;
    text-align:center;
    margin-left:2rem;
}
.whatsapp{
    color:var(--bsGreen);
    font-size:2rem;
}
@media (max-width:798px){
    .form-check-label{
        font-size:0.8rem;
    }
}
`
