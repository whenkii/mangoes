import React,{useContext} from 'react'
import {productContext} from '../contexts/products'
import {Link} from 'react-router-dom'
import praveenimg from '../images/Praveen.jpeg'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    // faShoppingCart,
        faRupeeSign
} from '@fortawesome/free-solid-svg-icons';

// const Cartreducer = cart.reduce((accum,cart) => accum + cart.PRICE)

export default function Navbar() {
    const [cart,,productsLoading,isCartEmpty]=useContext(productContext);
    // const [cartEmpty,setCart]
    return (
        <Navbarpage>
            <div className="navbar1 fixed-top">
                <div className="row">
                    <Link className="col-4" to="/"> 
                        <Brandimg src={praveenimg} />
                    </Link>
                    <div className="col-8 align-self-center">
                            <Link className="btn btn-success m-1" to="/">HOME</Link>
                            <Link className="btn btn-success m-2" to="/products">PRODUCTS</Link>
                            <Link className="btn btn-success m-2" to="/orders">ORDERS</Link>
                    </div> 
                    </div>
                    {!productsLoading ?
                    <Link to="/cart">
                        <CartContainer className={`ml-auto d-flex align-items-center ${isCartEmpty ? 'btn-success':'btn-danger'} `}>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                        <div className="mr-3">{`MyCart(${(cart.filter(a => parseInt(a.QTY,10) > 0)).length})`}</div>
                        <div><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{cart.filter(({QTY}) => QTY > 0).reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0)}</div>
                        </CartContainer>
                    </Link>
                    
                :null}
                <div className="d-flex justify-content-center m-1">
                    <Link to="/signin"> <div className="btn btn-danger ml-auto">Login/Signup</div> </Link>
                </div>
            </div>
        </Navbarpage>
    )
}

const Navbarpage = styled.div`
.navbar1{
        background-color: white;
        border-bottom: 0.05rem solid green;}
.btn {
        width:10rem;
}
.navlinks{
        margin-left:25rem;
        width:100%;
}
.cartsize{
        font-size:110%;
        text-decoration:none;
}
`

const CartContainer = styled.button`
width:11rem;
padding:0.4rem;
color:white;
border-radius:0.5rem;
position:absolute;
bottom:0.1rem;   
right:1rem;
transition:0.5s all;
:hover{
    box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,0.3);
}`

export const Brandimg = styled.img`
width:15rem;
height:10rem;
border:none;
`