import React from 'react'
import {useHistory} from 'react-router-dom'
import Mallika from '../images/mallika-about.jpeg'
import styled from 'styled-components'

export default function ProductInfo() {
    const history = useHistory();
    return (
        <ProductContainer>
            <div className="card mb-3 container">
            {/* <img className="card-img-top" src="..." alt="Card image cap" ></img> */}
            <div className="card-body">
                <div className="card-title text-center">BANGINAPALLI</div>
                <p className="card-text">Banganapalle mangoes (also known as Benishan) is a mango variety produced in Banganapalle of Kurnool district in the Indian state of Andhra Pradesh. It alone occupies 70% percent of total mango cultivable area of the state and was first introduced by the Farmers of Banaganapalli.
                 </p>
            </div>
            <img className="m-auto card-img-bottom navImage" src={Mallika} alt={`Prod pic  + ${Mallika}`} ></img>
            </div>
            <div className="text-center">
                <div className="btn btn-warning btn-sized-normal" onClick={() => history.goBack()}>EXIT</div>
            </div>
    </ProductContainer>
    )
}


const ProductContainer = styled.div`
margin-top:8rem;
margin-bottom:8rem;
.card-title{
    color:orange;
    font-size:2rem;
    font-style:italic;
    font-weight:banginapalli;
    font-weight:bold;
}
.navImage{
    height:30rem;
    width: 30rem;
}
@media (max-width: 768px) {
    .navImage{
        height:20rem;
        width: 20rem;
    }
}`
