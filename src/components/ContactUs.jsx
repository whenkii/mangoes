import React from 'react'
import {useHistory} from 'react-router-dom'
// import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import * as fasIcons from 'react-icons/fa'

export default function ContactUs() {
    var history = useHistory();
  return (
    <Maincontainer className="container card">
         <h4 className="text-dark text-center font-weight-bold">Garden Roots Pte Ltd</h4>
        <div className="card-header">CONTACTUS</div>
       
            <div className="text-center mt-2 mb-4">
                    <div className="d-flex justify-content-center mt-1 row"> 
                        <p className="col text-success font-weight-bold"> <fasIcons.FaWhatsapp className="whatsapp" /> WhatsApp  </p>
                        <p className="col text-danger" > (+65) 81601289 </p> 
                    </div>

                    <div className="d-flex justify-content-center mt-1 row"> 
                        <p className="col text-dark font-weight-bold"> EMAIL</p>
                        <p className="col text-danger" > help@gardenroots.com </p> 
                    </div>
            </div>

            <div className="btn btn-sm back-btn m-auto" onClick={() => history.push("/")}> HOME </div> 

    </Maincontainer>
  )
}

const Maincontainer = styled.div`
background:white;
margin-top:7rem;
padding:3rem;
border-radius:1rem;
color:white;
font-family: 'Courier New', monospace;
font-weight:bold;
.card-header{
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
    width:25%;
    font-weight:bold;
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
.whatsapp{
    color:var(--bsGreen);
    font-size:2rem;
}
@media (max-width:798px){
    .form-check-label{
        font-size:0.8rem;
    }
    .card-header{
        padding:0.3rem;
        font-size:0.8rem
    }
}
`
