import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
// import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import { ToastContainer,toast} from 'react-toastify';
import * as fasIcons from 'react-icons/fa'

export default function Checkout() {
var history = useHistory();
const [,,,,,deliveryState,deliveryAction,,,,,,configState]=useContext(productContext);
const {shipMode,location,address} = deliveryState[0];

const getDBValue = (props) => {
    return JSON.parse(configState[0].val.filter( a => a.NAME === props)[0].JSON_STRING).value
}

const initSelfForm = getDBValue("SELFFORM");
const initFormFields = getDBValue("ADDRESSFORM"); 
const selfAddress = getDBValue("SELF_LOCATIONS"); 
const areas = selfAddress.map( a => a.name );

const [selfForm,setSelfForm] = useState(initSelfForm);
const [formFields,setFormFields] = useState(initFormFields);

const funOnChange = (props) => {

    if (deliveryState[0].shipMode !== props){
        deliveryAction({type:"ADDRESS",location:""});    
    }
    deliveryAction({type:"SHIPMENT_MODE",shipMode:props});
}

// const [location, setlocation] = useState("Punggol");
const onClickLocation = (props) => {
    deliveryAction({type:"ADDRESS",location: (location === props ? "":props),address: address })
    // console.log(address)
}

const funOnChangeForm = (e) =>
{
 // Do validations only when shipMode is Delivery
    if ( shipMode !== "self") {
        const tempformAttributes = [...formFields];
        const attr= [e.target.name];
        const attrName = attr[0];
        var idx = tempformAttributes.findIndex( a => a.name === attrName);
        tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
        setFormFields([...tempformAttributes]);
        if ( attrName === "Location") {
            var addressDetails = tempformAttributes.map( a => a.value)
            deliveryAction({type:"ADDRESS",location:tempformAttributes[idx].value,address:addressDetails})
        }
        }
    }

const funOnChangeFormSelf = (e) =>
    {
     // Do valdations only when shipMode is Delivery 
            const tempformAttributes = [...selfForm];
            const attr= [e.target.name];
            const attrName = attr[0];
            var idx = tempformAttributes.findIndex( a => a.name === attrName);
            tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
            setSelfForm([...tempformAttributes]);
            // if ( attrName === "Location") {
            var addressDetails = tempformAttributes.map( a => a.value)
            deliveryAction({type:"ADDRESS",
            // location:tempformAttributes[idx].value,
            address:addressDetails})
            // }
            // console.log(deliveryState)
           
        }

const handleClick = (e) => {
    // e.preventDefault();
    // Do form validations only when shipmode is Delivery or no Self collection
    // console.log(deliveryState[0].address)
    if ( shipMode === "self") {

        var tempSelfFormFields = [...selfForm];
        tempSelfFormFields.forEach  ( a => {
           const idx = selfForm.findIndex( b => a.name === b.name);
           let errors = "";
           if ( tempSelfFormFields[idx].required === "Y" && !tempSelfFormFields[idx].value) {
           errors =  `${tempSelfFormFields[idx].name} is Required`;
           }
           else if ( tempSelfFormFields[idx].value.length < tempSelfFormFields[idx].minLength) {
            errors =  `${tempSelfFormFields[idx].name} value is invalid`;
            }
           

           tempSelfFormFields[idx] = {...tempSelfFormFields[idx],errors: errors}
       })
       setSelfForm (tempSelfFormFields)
    }
    else {
    var tempFormFields = [...formFields];
    tempFormFields.forEach  ( a => {
        const idx = formFields.findIndex( b => a.name === b.name);
        let errors = "";
        if ( tempFormFields[idx].required === "Y" && !tempFormFields[idx].value) {
        errors =  `${tempFormFields[idx].name} is Required`;
        }
        else if ( tempFormFields[idx].value.length < tempFormFields[idx].minLength) {
         errors =  `${tempFormFields[idx].name} value is invalid`;
        }
        tempFormFields[idx] = {...tempFormFields[idx],errors:errors}
    })
    setFormFields([...tempFormFields]);
     }
      // Check location and address is populated for self collection
    if ( shipMode === "self" ) {

        // console.log(deliveryState[0])

        // console.log(tempSelfFormFields.filter ( a => a.errors !== "").length)

        if ( tempSelfFormFields.filter ( a => a.errors !== "").length !== 0 ){
            toast.error ("Errors in the form");
        }
        
        else {

         if ( location === "" || address === "" || !location) {
                toast.error ("Choose Location");
         }
         else {
            history.push("/payment");
         }
        }
    }
    else {
        if ( tempFormFields.filter ( a => a.errors !== "").length === 0) {
             history.push("/payment") 
        }
        else {
            toast.error ("Errors in the form");
        }
     }
    }  
  return (
    <Maincontainer className="container">
        <ToastContainer position="bottom-center" autoClose="1000"/>
        {configState[0].val.state !== "INIT" &&
        <>
            <div className="card-header">Delivery</div>
            <div className="d-flex justify-content-center form-check"> 
                    <div className="form-check">               
                        <input className="form-check-input" type="radio" value="self" name="shipMode" 
                            checked={shipMode === "self"} onChange={ () => funOnChange("self")} />
                        <label className="form-check-label" htmlFor="self">Self-Pickup</label>
                    </div>

                    <div className="form-check">               
                        <input className="form-check-input" type="radio" value="delivery" name="shipMode" 
                            checked={shipMode === "delivery"} onChange={ () => funOnChange("delivery")} />
                        <label className="form-check-label" htmlFor="delivery">Delivery</label>
                    </div>
            </div>

        {(shipMode === "delivery" && shipMode) &&
            <div className="delivery">
              <div className="card-header">Address</div>
               <div className="card-body">
                    {/* <form> */}
                    <div className="d-flex justify-content-center">         
                        <div>
                            {formFields.map ((item,i) =>
                                <div className="form-group" key={i}>
                                 {item.type === 'list' ?
                                    <div className="d-flex row">
                                        <label className="col-4 label align-self-center mr-1 text-left" htmlFor="Location">Location</label>
                                        <div className=" col d-flex row flex-column">       
                                            <select className="col form-control" name="Location" onChange={funOnChangeForm}>
                                                {item.listValues.map ((item,i) =>
                                                    <option className="list" key={i} value={item}>{item}</option>
                                                )}
                                            </select>
                                            <small className="col text-danger align-self-center">{item.errors}</small>
                                        </div>
                                    </div>
                                :
                                    <div className="row">
                                        <label className="col-3 label align-self-center text-left" htmlFor={item.name}>{item.name}</label>
                                        <div className="col d-flex flex-column">
                                            <input type={item.type} className="form-control" name={item.name}  placeholder={item.placeholder} value={item.value} onChange={funOnChangeForm}/>
                                            <small className="text-danger align-self-center">{item.errors}</small>
                                        </div>
                                    </div>
                                 }
                               </div>  
                            )
                            }
                        </div>
                    </div>
                {/* </form> */}
                </div>
            </div>
        }

        { shipMode === "self" &&
        <div className="selfSection">
            {/* <div className="card-body"> */}
            <div className="d-flex justify-content-center">
            <div>
                    {selfForm.map ( (item,i) => 
                    <div className="form-group" key={i}>
                    <div className="row">
                        <label className="label align-self-center col-3" htmlFor={item.name}>{item.name}</label>
                        <div className="d-flex col flex-column">
                            <input type={item.type} className="form-control" name={item.name}  placeholder={item.placeholder} value={item.value} onChange={funOnChangeFormSelf}/>
                            <small className="text-danger">{item.errors}</small>
                        </div>
                    </div>
                    </div>
                    )}
            </div>
            </div>
            
            <div className="card-header mt-3">Choose pickup location</div>
            <div className="font-weight-bold mt-3">
                <div className="d-flex justify-content-center flex-wrap" >
                    {areas.map((item,i) =>
                        <button className="btn btn-sized-sm m-1 p-1 btn-secondary text-white font-weight-bold" 
                                style={{background: (deliveryState[0].location === item ? "var(--amzonChime)":null)}}  key={i} 
                                onClick={() => onClickLocation(item)}>
                        {item}
                        </button>
                    )}
               </div>
            </div>
            {/* {console.log(location,selfAddress.filter( a => a.name === location)[0].details)} */}
            { location &&
                <div className="m-auto">
                    <div className="card-body text-center address-details ">
                        {location && selfAddress.filter( a => a.name === location)[0].details.map((item,i) =>  
                                <p className={`addressLines ${i === 0 ? "text-danger" :null}`} key={i}>{item}</p>
                        )}
                    </div>     
                </div>

            }
        </div>
        }

        <div className="d-flex justify-content-center mt-2">

            <div className={`btn btn-sm back-btn`} onClick={() => history.goBack()}>BACK <fasIcons.FaBackward className="icons" /> </div>
            <div className={`btn btn-sm proceed-btn`} onClick={handleClick}>PAYMENT <fasIcons.FaForward className="icons" /> </div>
        </div>
    </>
    }
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:1rem;
// padding-bottom:2rem;
// border-radius:2rem;
// width:22rem;
color:white;
.heading{
    padding:0.5rem;
    background:var(--amzonChime);
    text-align:center;
    color:white;
    font-weight:bold;
    border-radius:1rem;
}
.card{
    width:75%;
    margin:auto;
    margin-top:0 !important;
    border-radius:1rem;
}
.card-header{
    padding:0.5rem;
    background:var(--amzonChime);
    text-align:center;
    font-weight:bold;
    border-radius:1rem;
}
.card-body{
    font-size:0.8rem;
    margin:1rem;
}
.address-details{
    border-radius:1rem;
    border:solid 0.1rem var(--amzonChime);
    
}
.form-check-label{
    color:var(--bsRed);
}
.label{
    color:var(--amzonChime);
    font-size:1rem;
}
.form-control{
    width:70%;
}
.form-check{
    margin:0.2rem;
}
.form-check-input{
    font-size:3rem;
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
.back-btn{
    background:var(--bsRed);
    color:white;
    text-align:center;
    margin-right:1rem;
}
.proceed-btn{
    background:var(--amzonChime);
    color:white;
    text-align:center;
    margin-left:2rem;
}
.icons{
    font-size:1.4rem;
    margin-left:1rem;
}
.paymentOptions{
    margin-top:1rem;
    border:0.1rem solid var(--amzonChime);
    border-radius:1rem;
    padding:0.2rem;
}
.locationHeader{
    margin-top:1rem;
    color:var(--bsRed);
    font-weight:bold;
    font-size:0.9rem;
    text-align:center;
}
.selfSection{
    // margin-bottom:2rem;
    // width:75%;
    margin:auto;
}

@media (max-width:798px){
    .delivery{
        font-size:1rem;
    }
    .card-header{
        padding:0.4rem;
        font-size:0.8rem;
    }
    .selfSection{
        margin-bottom:2rem;
        // width:60%;
        margin:auto;
    }
    .form-check-label{
        font-size:0.7rem;
    }
    .label{
        font-size:0.7rem;
    }
    .form-control{
        width:75%;
        padding:0.2rem;
    }
    .icons{
        font-size:0.5rem;
        margin-left:0.4rem;
    }
    .btn {
        font-size:0.5rem;
        padding:0.4rem;
        width:10rem;
    }
}
`
