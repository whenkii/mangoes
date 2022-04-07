import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
// import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import qrcode from '../images/Venky_QRCODE.jpg'
import { ToastContainer, toast } from 'react-toastify';

export default function Payment() {
var history = useHistory();
const [,productAction]=useContext(productContext);
// const [accountInfo] = useContext(accountsContext);
const bankDetails = ["DBS Bank","Account# 0746022818","Suntech City"];
const [orderForm,setOrderForm] = useState({address1:"",address2:"",postalcode:"",mobile:"",paymentMode:""});

const funOnChange = (e) => {
    setOrderForm({...orderForm,[e.target.name]:e.target.value})
}

const createOrder = (e) => {
    e.preventDefault();

    if (orderForm.paymentMode) {
    productAction({type:"CLEAR"});
    history.push("/")
    }
    else {
        productAction({type:"BLANK_PAYEMENT_MODE"});
    }
    // history.push("/orderconfirmation");
    // var tempFormFields = [...formFields];
    // tempFormFields.forEach  ( a => {
    //     const idx = formFields.findIndex( b => a.name === b.name);
    //     tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
    // })
  }

  return (
    <Maincontainer className="container">
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
            {orderForm.paymentMode === "qrcode" ?
                <img className="navImage m-auto" src={qrcode} alt="Logo" /> 
             :
             <>
              { orderForm.paymentMode === "bank" &&
                <div className="card-body">
                    {bankDetails.map((item,i) => 
                    <p className="addressLines" key={i}>{item}</p>
                    )}
                </div> 
               }
             </>
            }
            </div>

            <div className="d-flex justify-content-center">
            <div className="btn btn-sized-md back-btn" onClick={() => history.goBack()}>BACK</div>
            <div className="btn proceed-btn" onClick={createOrder}>COMPLETE ORDER</div>
            {/* <div className="btn btn-warning cart-nav-btns m-1" onClick={createOrder}>PAY LATER </div> */}
        </div>
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:7rem;
padding:2rem;
border-radius:1rem;
color:white;
.card-header{
    background:var(--amzonChime);
    text-align:center;
    color:white;
    font-weight:bold;
    border-radius:1rem;
}
.form-check-label{
    color:var(--bsRed);
}
.form-check{
    margin:0.5rem;
}
.addressLines{
    color:var(--amzonChime);
    margin:0;
}
.btn{
    margin:0 0 1rem 0;
    width:50%;
}
.navImage{
    height: 14rem;
    width:  16rem;
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
@media (max-width:798px){
    .form-check-label{
        font-size:0.8rem;
    }
}
`
