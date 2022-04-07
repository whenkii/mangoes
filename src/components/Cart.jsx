import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {productContext} from '../contexts/mangoesContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    // faShoppingCart,
        faRupeeSign,
        faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
// var history = useHistory();
const [productsState,productAction]=useContext(productContext);
// const [accountInfo] = useContext(accountsContext);
const inCartItems = productsState.filter(a => a.QTY > 0);
const isCartEmpty = inCartItems.length === 0 ? true : false;
const cartReduce = inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0);
// const createOrder = () => {
                    
//                 if ( accountInfo.email && accountInfo.isLoggedIn ) {
//                             productAction({type:"CREATE_ORDER",accountInfo:accountInfo})
//                             productAction({type:"CLEAR"})
//                             // if ( isCartEmpty ) { 
//                                 history.push("/orderconfirmation") 
//                             // }
//                             }
//                 else {
//                     alert("User not logged in. Pls login/Signup")
//                     history.push("/Signin")
//                 }
//                     }
                    
// productAction({type:"CREATE_ORDER"}
    return (
        <CartContainer className="container">
             
                <div className="text-center">
                    {/* <h1 className="cart text-center font-italic my-1 text-dark"> MyCart  */}
                    <h1 className="cart-heading m-auto font-italic my-1"> MyCart  
                        {/* <FontAwesomeIcon className="mx-1 text-warning" icon={faShoppingCart}/>  */}
                    </h1>
                </div>
                {cartReduce === 0 ? null :
                <div className="cart-field-headers text-center font-weight-bold mt-4 row">
                    <div className="col-4 headers">NAME</div>
                    <div className="col-lg-2 col-md-2 col-2 headers">PRICE</div>    
                    <div className="col-lg-1 col-md-1 col-1 headers">QTY</div>    
                    <div className="col-2 headers">Total</div> 
                    <div className="col-1 headers"></div> 
                </div>
                }
                {inCartItems.map(({ID,NAME,PRICE,QTY}) => 
                <div key={ID}className="card-body text-center">
                    <div className="row ">
                        <div className="cart-values col-4 font-weight-bold">{NAME}</div>
                        <div className="cart-values col-lg-2 col-md-2 col-2"><FontAwesomeIcon className="" icon={faRupeeSign}/>{`${PRICE}`}</div>
                        <div className="cart-values col-1">{QTY}</div>
                        <div className="cart-values col-2 text-danger font-weight-bold">
                            {/* <FontAwesomeIcon className="p-0 m-0" icon={faRupeeSign}/> */}
                            {QTY*PRICE}</div>                
                        <div className="d-flex flex-column cart-update-container col-2 align-items-center justify-content-center">
                            <span className="cart-btn btn btn-danger" onClick={() => productAction({type:"REMOVE",prodid:ID})}>-</span>
                            <span className="cart-delete" onClick={() => productAction({type:"DELETE",prodid:ID})}>
                                <FontAwesomeIcon className="trashbin text-warning font-weight-bold" icon={faTrashAlt}/></span>
                            <span className="cart-btn btn btn-success" onClick={() => productAction({type:"ADD",prodid:ID})}>+</span>
                        </div>
                    </div>
                </div>
                )
                }
                {isCartEmpty ? 
                <h2 className="text-danger text-center my-4 headers"> Cart is empty</h2> :
                <div>
                    <div className="cartTotal text-center text-danger font-weight-bold m-2">
                        <span className="ml-auto">Total:</span> 
                        <span><FontAwesomeIcon className="mx-1" icon={faRupeeSign}/>{inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0)}</span>
                    </div>

                    <div className="d-flex justify-content-around m-4">
                        <div className="btn btn-danger cart-nav-btns" onClick={() => productAction({type:"CLEAR"})}>Clear Cart</div>
                        <Link to="/"><div className="btn btn-warning cart-nav-btns">Continue Shopping</div></Link>
                        <Link to="/checkout">
                        <div className="btn btn-success cart-nav-btns"><FontAwesomeIcon className="mx-2" icon={faRupeeSign}/>Checkout</div>
                        </Link>
                    </div>
                </div>
                }

                {/* If Cart is empty include continue shopping */}

                {isCartEmpty ?
                    <div className="d-flex justify-content-center">
                    <Link to="/" className="text-center">
                        <div className="btn btn-success cart-nav-btns">Continue Shopping</div>
                    </Link>
                    </div>
                    : null
                 }

        </CartContainer>
    )
}

const CartContainer = styled.div`
background:white;
margin-top: 6rem;
// margin-left:1rem;
padding:2rem;
border-radius:1rem;
.cart-values{
    align-self: center !important;

}
.cart-btn {
    font-size:1rem;
    padding:0.1rem 0.4rem;
    margin:0.2rem;
}
.cart-heading{
    background-color:var(--amzonChime);
    color:white;
    width:13rem;
    border-radius:1rem; 
}
.card{
    transition: 0.5s all;
    margin-top:5rem !important;
    :hover{
    box-shadow:0 0 0.5rem #5bccf6;
     }
}
.headers {
    color:var(--bsLightRed);
}
.card-header{
    font-weight:bold;
}
.col{
    text-align:center;
}
.cart-delete{
    font-size:1.2rem;
    padding:0;
}
.trashbin{
    font-size:1.5rem;
}
.cart-update-container{
    padding:0;
    margin:0;
}
.cartTotal{
    font-size:160%;
    border-bottom: 2px solid var(--bsRed);
}
.cart-nav-btns {
    font-weight:bold;
}
@media (max-width: 798px) {
    .cart{
        font-size:1.8rem;    
    }
    .cart-heading{
        background-color:var(--amzonChime);
        color:white;
        width:12rem;
        border-radius:1rem; 
        font-size:1.8rem;
    }
    .headers {
        color:var(--bsLightRed);
        font-size:0.8rem;
    }
    .cart-values{
        font-size:0.75rem !important;
    }
    .cart-delete{
        font-size:1.2rem;
    }
    .trashbin{
        font-size:1.3rem;
    }
    .btn {
        font-size:10px;
    }
}
@media (max-width: 390px) {
    .cart{
        font-size:1.5rem;    
    }
    .headers {
        color:var(--bsLightRed);
        font-size:0.8rem;
    }
    .cart-values{
        font-size:0.75rem !important;
    }
    .cart-btn {
        font-size:0.8rem;
        padding:0.1rem 0.3rem;
    }
    .cart-delete{
        font-size:1rem;
        padding:0.2rem;
    }
    .cart-nav-btns {
        font-size:0.5rem;
    }
}
`