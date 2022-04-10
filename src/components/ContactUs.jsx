import React from 'react'
// import {accountsContext} from '../contexts/accountsContext'
import styled from 'styled-components'
import * as fasIcons from 'react-icons/fa'

export default function ContactUs() {
  return (
    <Maincontainer className="container card">
        <div className="card-header">CONTACTUS</div>
       
            <div className="text-center mt-2">
                    <div className="d-flex justify-content-center mt-1 row"> 
                        <p className="col text-success"> <fasIcons.FaWhatsapp className="whatsapp" /> WhatsApp  </p>
                        <p className="col text-danger" > (+65) 81601289 </p> 
                    </div>

                    <div className="d-flex justify-content-center mt-1 row"> 
                        <p className="col text-dark font-weight-bold"> EMAIL</p>
                        <p className="col text-danger" > help@gardenroots.com </p> 
                    </div>
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