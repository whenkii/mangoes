import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import * as faIcons from 'react-icons/fa'
// import mango from '../images/mango.svg'
import { ToastContainer, toast } from 'react-toastify';

export default function OrderConfirmation() {
    const toastSucccess = () => {
        toast.success("Order has been successful")
    }
    toastSucccess();
    return (
        <MainContainer className="container">
            {toastSucccess}
            <ToastContainer />
            {/* <img className="navImage mx-2" src={mango} alt="Logo" />  */}
            <faIcons.FaHandshake className="handshake-icon align-self-start"/>
            <div className="justify-content-center">
                <p className="align-self-start p-2">Thank you for your Order</p>
                <Link to="/orders" className="p-2">Track your orders</Link> 
                {/* <img className="navImage mx-2" src={mango} alt="Logo" />  */}
            </div>
            <faIcons.FaPrayingHands className="icons"/>
        </MainContainer>
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
    margin:2rem;
}
.handshake-icon{
    font-size:6rem;
    color:orange;
    padding-bottom:2rem;
}
.navImage{
    height:2rem;

}
@media (max-width: 820px ) {
    align:center;
}

`
