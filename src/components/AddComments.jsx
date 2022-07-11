import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {productContext} from '../contexts/mangoesContext'
import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import { ToastContainer,toast} from 'react-toastify';
import * as fasIcons from 'react-icons/fa'
import { GetApiDataUpdate } from '../components/ApiCalls';

export default function AddComments(props) {
    const orderId = props.match.params.id;
var history = useHistory();
const [,,,,,,,,,,,,configState]=useContext(productContext);
const [accountInfo] = useContext(accountsContext);

const getDBValue = (props) => {
    return JSON.parse(configState[0].val.filter( a => a.NAME === props)[0].JSON_STRING).value
}

const initSelfForm = getDBValue("COMMENTFORM");
const [selfForm,setSelfForm] = useState(initSelfForm);

const funOnChangeFormSelf = (e) =>
    {
     // Do valdations only when shipMode is Delivery 
            const tempformAttributes = [...selfForm];
            const attr= [e.target.name];
            const attrName = attr[0];
            var idx = tempformAttributes.findIndex( a => a.name === attrName);
            tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
            setSelfForm([...tempformAttributes]);
        }
const handleSubmit = (props) => {

    const price = selfForm[selfForm.findIndex( a => a.name === "PRICE")].value;
    const comments = selfForm[selfForm.findIndex( a => a.name === "Comments")].value;
    const sql = `update orders set actualprice='${price}',comments='${comments}',payment_upd_by='${accountInfo.email}' where id=${orderId}`;

    GetApiDataUpdate(sql)
    .then((res) => {
        // console.log(res)
        if (res > 0 ){
            toast.success("Comments Updated");
            history.goBack();
        }
        else {
            toast.error( `Error !!!`) ;
        }
        }
        )
    .catch ( (e) => {
            alert(e)
            })
        }
  return (
    <Maincontainer className="container">
        <ToastContainer position="bottom-center" autoClose="1000"/>
        {configState[0].val.state !== "INIT" &&
        <>
            <div className="d-flex justify-content-center mb-4">
                <div className="text-center text-white w-50 m-2 bg-danger"> ORDERID : {orderId}</div>
            </div>
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
    </>
    }
    <div className="d-flex justify-content-center mt-2">
        <div className={`btn btn-sm back-btn`} onClick={() => history.goBack()}>BACK <fasIcons.FaBackward className="icons" /> </div>
        <div className={`btn btn-sm proceed-btn`} onClick={handleSubmit}>SUMBIT <fasIcons.FaForward className="icons" /> </div>
    </div>
    </Maincontainer>
  )
}

const Maincontainer = styled.div`
margin-top: 6rem;
padding:2rem;
width:75%;
background:white;
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
