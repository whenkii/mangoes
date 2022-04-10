import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
// import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import { ToastContainer,toast} from 'react-toastify';

const selfAddress = {Punggol:["Venkat Vona", "Blk - 679A","Punggol","S-821679","Mobile: 81601289"],
                     Tampines:["Venky", "Blk - 929","Tampines","S-520929","Mobile: 98346177"],
                     Sengkang:["Mohan Reddy", "Blk - 313","Sengkang","S-528313","Mobile: 98346177"]}
const areas = ["Tampines", "Sengkang","Punggol"]

export default function Checkout() {
var history = useHistory();
const [,,,,,deliveryState,deliveryAction]=useContext(productContext);
const {shipMode,location,address} = deliveryState[0];

const initFormFields = [{name:"Blk",type:"text",placeholder:"Ex:929",value:"",required:"Y"},
                        {name:"Unit",type:"text",placeholder:"Ex: #13-234",value:"",required:"Y"},
                        {name:"Street ",type:"text",placeholder:"Ex: Tampines Street 22",value:"",required:"Y"},
                        {name:"PostalCode",type:"text",placeholder:"Ex: 520202",value:"",required:"Y"},
                        {name:"Mobile",type:"text",placeholder:"Mobile",value:"",required:"Y"},
                        {name:"Location",type:"list",placeholder:"Location",value:"",listValues:["","Tampines", "Sengkang","Punggol","Bedok","Simei","Other"],required:"Y"}];


const [formFields,setFormFields] = useState(initFormFields);
const funOnChange = (props) => {
    deliveryAction({type:"SHIPMENT_MODE",shipMode:props});
}

// const [location, setlocation] = useState("Punggol");
const onClickLocation = (props) => {
    deliveryAction({type:"ADDRESS",location: (location === props ? "":props),address:selfAddress[props]})
}

const funOnChangeForm = (e) =>
{
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

const handleClick = (e) => {
    e.preventDefault();
    var tempFormFields = [...formFields];
    tempFormFields.forEach  ( a => {
        const idx = formFields.findIndex( b => a.name === b.name);
        tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
    })

    setFormFields([...tempFormFields]);
    // console.log(formFields.filter ( a => a.errors !== ""),formFields.filter ( a => a.errors !== "").length)
    // console.log(deliveryState)
    if ( shipMode === "self" ) {

        if ( !location || !address) {
            toast.error ("Choose Location");
        }
        else {
            history.push("/payment");
        }
    }
    else {
        if ( formFields.filter ( a => a.errors !== "").length === 0) {
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

        {shipMode === "delivery" &&
        <div>
            <div className="card-header">Address</div>
            <div className="card-body">
                <form>
                    <div className="d-flex justify-content-center">         
                        <div>
                            {formFields.map ((item,i) =>
                                <div className="form-group" key={i}>
                                 {item.type === 'list' ?
                                    <div className="d-flex row">
                                        <label className="col label align-self-center mr-1 text-left" htmlFor="Location">Location</label>
                                        <div className="d-flex row flex-column">       
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
                                        <label className="col label align-self-center mr-1 text-left" htmlFor={item.name}>{item.name}</label>
                                        <div className="d-flex row flex-column">
                                            <input type={item.type} className="col form-control w-75" name={item.name}  placeholder={item.placeholder} value={item.value} onChange={funOnChangeForm}/>
                                            <small className="col text-danger align-self-center">{item.errors}</small>
                                        </div>
                                    </div>
                                 }
                               </div>  
                            )
                            }
                             </div>
                        </div>
                </form>
            </div>
        </div>
        }

        { shipMode === "self" &&
            <div className="d-flex flex-wrap flex-row">
            {areas.map((item,i) =>
                <button className="btn btn-sized-sm m-1 p-1 btn-secondary text-white" style={{background: (deliveryState[0].location === item ? "var(--amzonChime)":null)}} key={i} onClick={() => onClickLocation(item)}>{item}</button>
            )}
              <div className="card">
                 {/* <div className="card-header">{location}</div> */}
                 {/* {console.log(location)} */}
                 <div className="card-body text-center">
                     {/* {console.log("location",location)} */}
                     {location && location !== "Other" && selfAddress[location]  && selfAddress[location].map((item,i) =>  
                    <p className={`addressLines ${item === "Mobile" ? "text-danger" :null}`} key={i}>{item}</p>
                     )}
                 </div>     
             </div>
            </div>
        }

        <div className="d-flex justify-content-center mt-4">
            {/* <div className="btn btn-sized-md back-btn" onClick={() => history.goBack()}>BACK</div> */}
            <div className="btn btn-sized-md proceed-btn" onClick={handleClick}>PAYMENT</div>
        </div>
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:1rem;
// padding-bottom:2rem;
// border-radius:1rem;
width:22rem;
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
}
.form-check-label{
    color:var(--bsRed);
}
.label{
    color:var(--amzonChime);
}
.form-check{
    margin:0.5rem;
}
.form-check-input{
    font-size:3rem;
}
.addressLines{
    color:var(--amzonChime);
    margin:0;
    font-weight:bold;
}
.back-btn{
    background:var(--bsRed);
    color:white;
    text-align:center;
    margin-right:2rem;
}
.proceed-btn{
    background:var(--amzonChime);
    color:white;
    text-align:center;
    margin-left:2rem;
}
// .list{
//     width:20rem;;
// }
@media (max-width:798px){
    .card-header{
        padding:0.4rem;
        font-size:0.8rem;
    }
    .form-check-label{
        font-size:0.7rem;
    }

}
`
