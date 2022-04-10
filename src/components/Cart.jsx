import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Checkout from './Checkout'
import {productContext} from '../contexts/mangoesContext'

export default function Cart() {
// const history = useHistory();
const [productsState,productAction,,,productCountAll,deliveryState]=useContext(productContext);
const {shipMode,location} = deliveryState[0];
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
                    <div className="text-center font-weight-bold mt-4 row">
                        <div className="col-4 headers">NAME</div>
                        <div className="col headers">PRICE</div>    
                        <div className="col headers">QTY</div>    
                        <div className="col headers">Total</div> 
                        <div className="col headers"></div> 
                    </div>
                }
                {inCartItems.map(({ID,NAME,PRICE,QTY}) => 
                    <div key={ID}className="card-body text-left">
                        <div className="row ">
                            <div className="cart-values col-4 font-weight-bold">{NAME}</div>
                            <div className="cart-values col text-danger font-weight-bold">{`$${PRICE}`}</div>
                            <div className="cart-values col">{QTY}</div>
                            <div className="cart-values col text-danger font-weight-bold">${QTY*PRICE}</div>                
                            <div className="d-flex cart-update-container col-1 align-items-center justify-content-center">
                                <span className="cart-btn btn btn-danger" onClick={() => productAction({type:"REMOVE",prodid:ID})}>-</span>
                                {/* <span className="cart-delete" onClick={() => productAction({type:"DELETE",prodid:ID})}>
                                    <FontAwesomeIcon className="trashbin text-warning font-weight-bold" icon={faTrashAlt}/></span> */}
                                <span className="cart-btn btn btn-success" onClick={() => productAction({type:"ADD",prodid:ID})}>+</span>
                            </div>
                        </div>
                    </div>
                )
                }
                {isCartEmpty ? 
                <h2 className="text-danger text-center my-4 headers"> Cart is empty</h2> 
                :
                <div className="cartBottom">
                    <div className="cartTotal">
                        <div className="d-flex justify-content-between font-weight-bold mt-2">
                            <div className="cartSummaryHeaders">{`Total`}</div>
                            <div className="cartSummaryHeaders text-danger ">{`$${inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0)}`}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="cartSummaryHeaders mb-1">Delivery</div>
                            <div className="cartSummaryHeaders text-danger"> {productCountAll < 5 && shipMode === "delivery" ? (location === "Other" ? "$6" : "$4") : "FREE" }</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center font-weight-bold mt-2 cartSummaryHeaders">
                            {/* <div className="text-danger">{`Total: `}</div> */}
                            <div className="text-danger">{`$${inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0) + (productCountAll < 5 && shipMode === "delivery" ? (location === "Other" ? 6 : 4) : 0)}`}</div>
                    </div>
                    {/* <div className="d-flex justify-content-center">
                        <div className="btn btn-danger cart-nav-btns" onClick={() => productAction({type:"CLEAR"})}>Clear Cart</div>
                        <div className="btn btn-success cart-nav-btns" onClick={ () => history.push("/")}>Continue Shopping</div>
                    </div> */}
                    <Checkout />
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
padding:2rem;
.cart-values{
    color:var(--bsRed);
    align-self: center !important;

}
.cart-btn {
    font-size:1rem;
    padding:0.1rem 0.4rem;
    margin:0.2rem;
}
.cart-heading{
    // background-color:var(--amzonChime);
    border-bottom: 3px solid var(--bsDark); 
    color:var(--amzonChime);
    width:11rem;
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
    color:var(--bsDark);
}
.card-header{
    font-weight:bold;
}
.col{
    text-align:center;
}
.cart-update-container{
    padding:0;
    margin:0;
}
.cartTotal{
    font-size:1rem;
    border-bottom: 2px solid var(--amzonChime);
}
.cart-nav-btns {
    font-weight:bold;
    margin:0.5rem;
}
.cartSummaryHeaders{
    font-weight:bold;
    margin-left:1rem;
}
@media (max-width: 798px) {
    .cart{
        font-size:1.8rem;    
    }
    .cart-heading{
        width:9rem;
        border-radius:1rem; 
        font-size:1.8rem;
    }
    .headers {
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
    .cartSummaryHeaders{
        font-size:0.9rem;
        font-weight:bold;
    }
    .cart-btn {
        font-size:0.7rem;
    }
    .cart-nav-btns {
        font-size:0.6rem;
    }
}
// @media (max-width: 390px) {
//     .cart{
//         font-size:1.5rem;    
//     }
//     .headers {
//         font-size:0.8rem;
//     }
//     .cart-values{
//         font-size:0.75rem !important;
//     }
//     .cart-btn {
//         font-size:0.8rem;
//         padding:0.1rem 0.3rem;
//     }
//     .cart-delete{
//         font-size:1rem;
//         padding:0.2rem;
//     }
//     .cart-nav-btns {
//         font-size:0.5rem;
//     }
// }
`