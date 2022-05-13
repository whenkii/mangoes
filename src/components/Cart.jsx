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
const cartReduce = inCartItems.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0);
const cartReducePrice = inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0);
const cartReduceOfferPrice = inCartItems.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0);
var deliveryCharges = (productCountAll < 5 && shipMode === "delivery" ? (location === "Other" ? 6 : 4) : 0);
const currency ="SGD";
// const cartReduce = inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0);

    return (
        <CartContainer className="container">
                
                {isCartEmpty ? 
                <>
                <h1 className="cart-emptyheading m-auto font-italic my-1"> MyCart </h1>
                <h2 className="text-danger text-center my-4 headers"> Cart is empty</h2> 
                </>
                :
                <div className="cartBottom">
                    
                    <div className="cartTotal">
                        <div className="text-center">
                        {/* <h1 className="cart text-center font-italic my-1 text-dark"> MyCart  */}
                        <h1 className="cart-heading m-auto font-italic my-1"> MyCart  
                            {/* <FontAwesomeIcon className="mx-1 text-warning" icon={faShoppingCart}/>  */}
                        </h1>
                        </div>
                            <div className="d-flex justify-content-between font-weight-bold mt-2">
                                <div className="cartSummaryHeaders">{`Total`}</div>
                                <div className="cartSummaryHeaders ">{`$${inCartItems.reduce((prev,{OFFERPRICE,QTY}) => prev+OFFERPRICE*QTY,0)}`}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="cartSummaryHeaders">Delivery</div>
                                <div className="cartSummaryHeaders"> {productCountAll < 5 && shipMode === "delivery" ? (location === "Other" ? "$6" : "$4") : "Free" }</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="cartSummaryHeaders small mb-1 text-success">Savings</div>
                                <div className="cartSummaryHeaders text-success small"> ${cartReducePrice - cartReduceOfferPrice}</div>
                            </div>
                        

                        <div className="d-flex justify-content-center font-weight-bold mt-2 cartSummaryHeaders">
                                {/* <div className="text-danger">{`Total: `}</div> */}
                                <div className="total">{`$${cartReduceOfferPrice + deliveryCharges}`}</div>
                                <small className="align-self-end ml-2 mb-1 font-weight-bold">{currency}</small>
                        </div>
                    </div>
                <div className="itemsContainer">   
                {cartReduce === 0 ? null 
                  :
                    <div className="itemsHeading row">
                        <div className="col-3 headers">NAME</div>
                        <div className="col headers">PRICE</div>    
                        <div className="col headers">QTY</div>    
                        <div className="col-3 headers">Total</div> 
                        {/* <div className="col headers"></div>  */}
                    </div>
                }
                {inCartItems.map(({ID,NAME,OFFERPRICE,QTY,PRICE}) => 
                    <div key={ID}className="card-body text-center p-2 mt-1">
                        <div className="row ">
                            <div className="cart-values col-3 font-weight-bold p-0">{NAME}</div>
                            <div className="cart-values col text-danger font-weight-bold">
                            <span className="priceValue" style={{color:"var(--bsRed)",textDecorationColor:"var(--amzonChime)",textDecoration:OFFERPRICE ? "line-through":"none"}}>S${PRICE}</span> 
                            {`$${OFFERPRICE}`}</div>
                            <div className="cart-values col">{QTY}</div>
                            <div className="cart-values col text-danger font-weight-bold">${QTY*OFFERPRICE}</div>                
                        </div>
                        <div className="d-flex cart-update-container col-1 align-items-center justify-content-center ml-4">
                                <span className="cart-btn btn btn-danger" onClick={() => productAction({type:"REMOVE",prodid:ID})}>-</span>
                                {/* <span className="cart-delete" onClick={() => productAction({type:"DELETE",prodid:ID})}>
                                    <FontAwesomeIcon className="trashbin text-warning font-weight-bold" icon={faTrashAlt}/></span> */}
                                <span className="cart-btn btn btn-success" onClick={() => productAction({type:"ADD",prodid:ID})}>+</span>
                            </div>
                    </div>
                )
                }
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
width:75%;
border-radius:20px;
.cart-values{
    color:var(--bsRed);
    // align-self: center !important;

}
.cart-btn {
    font-size:1rem;
    padding:0.1rem 0.4rem;
    margin:0.2rem;
}
.cart-heading{
    font-family: 'Courier New', monospace;
    font-weight:bold;
    // border-bottom: 3px solid white; 
    color:white;
    width:11rem;
    border-radius:1rem; 
}
.cart-emptyheading{
    font-family: 'Courier New', monospace;
    font-weight:bold;
    // border-bottom: 3px solid var(--amzonChime); 
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
.itemsContainer{
    margin-top:0.2rem;
    // border:0.1rem solid var(--amzonChime);
    border-radius:1rem;
    padding:1rem;
    text-align:center;
}
.itemsHeading{
    background:var(--amzonChime);
    color:white;
    border-radius:20px;
    padding:0.4rem;
}
.headers {
    font-weight:bold;
    // color:var(--bsDark);
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
    padding:0.5rem;
    font-size:1rem;
    background:var(--amzonChime);
    color:white;
    border-radius:20px;
    // border-bottom: 2px solid var(--amzonChime);
    box-shadow: 0rem 0.2rem var(--amzonChime);
}
.total{
    font-size:150%;
    }
.priceValue{
    font-size:0.6rem;
    margin-right:0.2rem;
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
@media (max-width: 798px) {
width:90%;
.cartSummaryHeaders{
    font-size:0.7rem;
    font-weight:bold;
  }
.headers {
            font-size:0.6rem;
        }
.cart-values{
            font-size:0.6rem !important;
                }
}
`