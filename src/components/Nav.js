import React,{useContext,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {productContext} from '../contexts/mangoesContext'
// import {accountsContext} from '../contexts/accountsContext'
import {RiShoppingBasketLine} from 'react-icons/ri'
import * as fasIcons from 'react-icons/fa'
// import * as GiIcons from 'react-icons/gi'
// import mango from '../images/mango.svg'
// import gardenroots_logo from '../images/gardenroots_logo.jpg'
// import OutSideClickHandler from 'react-outside-click-handler'

export default function Nav() {
// const [accountInfo] = useContext(accountsContext);
const [productsState] = useContext(productContext);
const cartReducer = productsState.reduce((prev,curr) => prev + curr.QTY,0) ;
// const cartReducer = useState()
// console.log(productsState)
    return (
        <>
        <MainContainer >
            <div className="header d-flex align-items-center  justify-content-around mb-2">
                    <Link to="/" className="menu-items"> <fasIcons.FaHome className="menu-icons"/></Link>
                    {/* <Link to="/products"  className="menu-items"><GiIcons.GiPlantWatering/></Link> */}
                    {/* <Link to="/orders"  className="menu-items"><fasIcons.FaDollarSign className="menu-icons"/></Link> */}
                    <Link to="/contactus"  className="menu-items"><fasIcons.FaPhone className="menu-icons"/></Link>
                    <Link to="/account" className="menu-items"><fasIcons.FaUser className="menu-icons"/> 
                    {/* {accountInfo.isLoggedIn ? "My Account" : "Signin"} */}
                    </Link>
                    {/* <Link to="/graphs"  className="menu-items"><fasIcons.FaInfo className="menu-icons"/></Link>  */}
                    <Link to="/cart"> 
                     <div className="basket">
                    <div className="cartValues " style={{backgroundColor:cartReducer > 0 ? null:"var(--bsRed)"}}>{cartReducer}</div>
                    <RiShoppingBasketLine className="menu-items innerBasket " /> 
                </div>
            </Link>
            </div>

   
                {/* <div className="navfooter d-flex justify-content-center m-auto text-white">
                        <div className="">GardenRoots Pte Ltd</div>
                </div> */}

        </MainContainer>
        </>
    )
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                alert("You clicked outside of me!");
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}

const MainContainer = styled.div`
position:fixed;
width:100%;
height:4.5rem;
background-color:var(--amzonChime);
top:0;
z-index:999;
position:fixed;
border-bottom: 0.1rem solid white;
box-shadow: 0 0 0.5rem 0.15rem rgba(0,0,0,0.25);
.header {
    height:4rem;
}
.menu-items{
    padding:0.5rem;
    color:white;
    border-radius:50%;
    :hover{
        background:white;
        color:var(--bsDark);
           }
   :focus{
    background:white;
    color:var(--amazonChime);
    .menu-icons{
         font-size:1.8rem;
       }
    }
}
.menu-icons{
    font-size:1.8rem; 
}
.side{
    z-index:999;
    position:absolute;
    left:2%;
    bottom:25%;
    color:var(--bsLightDark) ;
    font-size:3rem; 
}
.navbar{
    position:bottom;
    height:3.5rem;
    background:var(--amzonChime);
    top:5%;
    width:100vw;
    font-family: 'Brush Script MT', cursive;
}
.navfooter{
    z-index:-1;
    position:fixed;
    bottom:0;
    border-top:0.2rem solid white;
    padding:1rem;
    background:var(--amzonChime);
    border-radius:1rem;
    font-size:1rem;
    left: 0;
    right: 0;
}
.heading{
    color:white;
    font-size:3.5rem;
    font-weight:bold;
}
.navImage{
    height: 10rem;
    width: 10rem;
}
.basket{
    position:relative;
    right:5%;
    bottom:0;
    poadding:1rem;
    color:var(--bsLightDark) ;
    font-size:3rem;    
}
.innerBasket{
    font-size:3.3rem;    
    color: white;
}
.cartValues {
    position:absolute;
    bottom:2.3rem;
    right:0.5rem;
    border-radius:50%;
    width:1.2rem;
    height:1.2rem;
    font-size:0.8rem;
    background:var(--bsRed);
    color:white; 
    font-weight:bold;
    text-align:center;
}
.username{
    position:absolute;
    right:1rem;
    font-weight:bold;
}
@media (max-width: 798px) {
.side{
        font-size:2rem; 
    }
.heading{
        font-size:2.5rem;
    }
    .basket {
        right:1rem;
        bottom:20%;
        font-size:2.2rem;
    }
    .cartValues{
        bottom:2.2rem;
        right:0.5rem;;
        width:1.2rem;
        height:1.2rem;
        font-size:0.8rem;
    }
// @media (max-width: 390px) {
//     .menu-icons{
//         font-size:1.5rem; 
//     }
//     .side{
//         bottom:28%;
//         font-size:2rem; 
//     }
//     .prodName{
//     font-size:1.7rem;
//     }
//     .navbar{
//         top:18%;
//         width:100vw;
//         font-family: 'Brush Script MT', cursive;
//     }
//     .heading{
//         font-size:2.5rem;
//     }
//     .navImage{
//         height: 2.5rem;
//         width: 2.5rem;
//     }
//     .innerBasket{
//         font-size:3.2rem;    
//         color: white;
//     }
//   }
`

// const Links = styled(Link)`
// text-align:left !important;
// width:10rem;
// margin:1rem;
// padding:0.2rem;
// color:white;
// text-align:center;
// border-radius:0.5rem;
// text-transform: capitalize;
// text-decoration:none !important;
// transition:0.3s;
// .icons {
//     color:var(--bsYellow);
//     text-transform: capitalize;
//     margin : 0.25rem 1rem 0.65rem 0.5rem !important;
//     font-size:120% !important;
// }
// :hover{
//     background:white;
//     color:var(--bsDark);
// }
// :focus{
//     background:white;
//     color:var(--bsRed);
// }
// @media (max-width: 768px) {
// font-size:0.8rem;
// margin : 0.25rem 0.5rem 0.65rem 0.5rem !important;
// .icons {
//         font-size:1rem !important;
//     }
// }
// `