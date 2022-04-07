import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import { ToastContainer,toast } from 'react-toastify';

const address = ["#13-443, Blk 929","Tampines Street 91","520929"]


export default function Checkout() {
var history = useHistory();
// const [productAction]=useContext(productContext);
// const [accountInfo] = useContext(accountsContext);
const [orderForm,setOrderForm] = useState({address1:"",address2:"",postalcode:"",mobile:"",shipMode:"self"});
// const [orderFormErrors,setOrderFormErrors] = useState({address1:"",address2:"",postalcode:"",mobile:"",shipMode:""});

const [formFields,setFormFields] = useState([{name:"Unit",type:"text",placeholder:"Unit No",value:"",required:"Y"},
                                             {name:"Blk/Building Name",type:"text",placeholder:"Ex:929",value:"",required:"Y"},
                                             {name:"Street ",type:"text",placeholder:"Ex: Tampines Street 91",value:"",required:"Y"},
                                             {name:"PostalCode",type:"text",placeholder:"Ex: 520202",value:"",required:"Y"},
                                             {name:"Mobile",type:"text",placeholder:"Mobile",value:"",required:"Y"}]);

const funOnChange = (e) => {
    setOrderForm({...orderForm,[e.target.name]:e.target.value})
}

const funOnChangeForm = (e) =>
{
    const tempformAttributes = [...formFields];
    const attr= [e.target.name];
    const attrName = attr[0];
    const idx = tempformAttributes.findIndex( a => a.name === attrName);
    tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
    setFormFields([...tempformAttributes]);
    }

const handleClick = (e) => {
    e.preventDefault();
    var tempFormFields = [...formFields];
    tempFormFields.forEach  ( a => {
        const idx = formFields.findIndex( b => a.name === b.name);
        tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
    })

    setFormFields([...tempFormFields]);

    if ( formFields.filter ( a => a.errors !== "").length === 0 || orderForm.shipMode === "self") {
        // if ( orderForm.shipMode ) {
        //     toast.warning("Choose Delivery mode")
        // }
        // else {
        history.push("/payment") 
            // }
        }
 }

// const createOrder = () => { 
    
//     const temporderFormErrors = orderFormErrors;

//         Object.keys(orderForm).forEach (e => 
//             {
//                 temporderFormErrors[e] = orderForm[e].length > 0 ? "": e + " is Mandatory attribute";
//                 setOrderFormErrors(temporderFormErrors);
//             })

//             var errors = Object.keys(orderFormErrors).filter(a => a !== "shipMode")
//             .map(function(key) {
//                 return orderFormErrors[key];
//             });
//     console.log( errors.filter( a => a))
                    
//     if  ( errors.filter( a => a).length === 0 || orderForm.shipMode === "self") 
//     {

//             if ( accountInfo.email && accountInfo.isLoggedIn ) {
//                         productAction({type:"CREATE_ORDER",accountInfo:accountInfo})
//                         productAction({type:"CLEAR"})
//                         // if ( isCartEmpty ) { 
//                             history.push("/orderconfirmation") 
//                         // }
//                         }
//             else {
//                 alert("User not logged in. Pls login/Signup")
//                 history.push("/Signin")
//             }
//     }
//     else {
//         alert("Please fill mandatory attributes")
//        }
// }

  return (
    <Maincontainer className="container">
        <ToastContainer position="top-center" autoClose="1000"/>
        <div className="card-header">Delivery</div>
        <div className="d-flex justify-content-center form-check"> 
                <div className="form-check">               
                    <input className="form-check-input" type="radio" value="self" name="shipMode" 
                        checked={orderForm.shipMode === "self"} onChange={funOnChange} />
                    <label className="form-check-label" htmlFor="self">Self-Pickup</label>
                </div>

                <div className="form-check">               
                    <input className="form-check-input" type="radio" value="delivery" name="shipMode" 
                        checked={orderForm.shipMode === "delivery"} onChange={funOnChange} />
                    <label className="form-check-label" htmlFor="delivery">Delivery</label>
                </div>
        </div>

        {orderForm.shipMode === "delivery" &&
        <div>
            <div className="card-header">Address</div>
            <div className="card-body text-dark">
                <form>
                    <div className="d-flex justify-content-center">         
                        <div className="d-flex flex-column" >
                            {formFields.map ((item,i) =>
                                <div className="form-group" key={i}>
                                    <label className="label" htmlFor={item.name}>{item.name}</label>
                                    <input type={item.type} className="form-control" name={item.name}  placeholder={item.placeholder} value={item.value} onChange={funOnChangeForm}/>
                                    {item.errors &&
                                    <small className="text-danger">{item.errors}</small>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        }

        { orderForm.shipMode === "self" &&
            <div className="card-body">
                {address.map((item,i) => 
                <p className="addressLines" key={i}>{item}</p>
                )}
            </div> 
        }

        <div className="d-flex justify-content-center">
            <div className="btn btn-sized-md back-btn" onClick={() => history.goBack()}>BACK</div>
            <div className="btn btn-sized-md proceed-btn" onClick={handleClick}>PAYMENT</div>
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
`
