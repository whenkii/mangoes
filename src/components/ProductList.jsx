import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {RiShoppingBasketLine,RiInformationLine} from 'react-icons/ri'
import {productContext} from '../contexts/mangoesContext'
import banginapalli_prod from '../images/banginapalli_prod.jpeg';
import mallika_prod from '../images/mallika_prod.jpeg';
import neelam_prod from '../images/neelam_prod.jpeg';
import all_prod from '../images/all_prod.png';
// import { ToastContainer } from 'react-toastify';

export default function ProductList() {
const [productsState,productAction,,productCountReducer] = useContext(productContext);
const productNames = {Alphanso:["ఆల్పాన్సా/ఖాదర్","अल्फांसो","அல்பான்சோ","ಅಲ್ಫ್ನಸೋ"],
                      Banginapalli:["బంగినపల్లి/బేనీషా","बादाम","பங்கினப்பள்ளி","ಬಂಗಿನಾಂಪಲ್ಲಿ"],
                      Mallika:["మల్లికా","मल्लिका","மல்லிகா","ಮಲ್ಲಿಕಾ"],
                      Neelam:["నీలం","नीलम","நீலம்","ನೀಲಂ"],
                      Kalepadu:["కాలేపాడు","कालेपाडु","காலேபாடு","ನೀಲಂ"],
                      ImamPasand:["ఇమామ్ పసంద్","इमाम पसंद","இமாம் பஸ்சந்த்","ಇಮಾಮ ಪಸಂದ್"]};
const productColors = ["danger","warning","info","dark"];
// const imageName = require('../images/banginapalli_prod.jpeg');
const isProductExistsInCart = (props) => productsState.filter(a => a.ID === props && a.QTY > 0);
    return (
        <MainContainer className="container" 
        // style={{marginTop:"10rem",borderTop:"white 0.1rem solid" }}
        >
            <div className="heading text-center">Pick your Mangoes</div>
            <div className="d-flex justify-content-center mt-2">
                <div className="d-flex align-items-center justify-content-center flex-wrap">
                    {productsState.length > 0 &&
                    productsState.filter(a => ["Banginapalli","Neelam","Mallika","Alphanso"].includes(a.NAME)).map((item,i) => 
                    <div className="d-flex" key={i}>
                    <div className="d-flex flex-column text-center">
                            {/* <div className="prodName">{item.NAME}</div> */}
                        <ProdContainer className="d-flex flex-column bg-white mt-0">
                                <Link to={`/aboutProduct/${item.NAME}`} className="text-decoration-none" >
                                    <RiInformationLine className="about"/> 
                                </Link>
                                <div className="price">S${item.PRICE}</div>
                                <div className="d-flex ">
                                    {item.NAME === 'Banginapalli' &&
                                    <div className="d-flex card-image m-auto">
                                        <img className="align-self-center prod-image" src={banginapalli_prod} alt="Logo" /> 
                                    </div>
                                    }
                                   {item.NAME === 'Mallika' &&
                                        <div className="d-flex card-image m-auto">
                                            <img className="align-self-center prod-image" src={mallika_prod} alt="Logo" /> 
                                        </div>
                                    }
                                    {item.NAME === 'Neelam' &&
                                        <div className="d-flex card-image m-auto">
                                            <img className="align-self-center prod-image" src={neelam_prod} alt="Logo" /> 
                                        </div>
                                    }
                                    { (item.NAME !== 'Banginapalli' && item.NAME !== 'Mallika' && item.NAME !== 'Neelam') &&
                                        <div className="d-flex card-image m-auto">
                                            <img className="align-self-center prod-image" src={all_prod} alt="Logo" /> 
                                        </div>
                                    }
                                <div className="d-flex flex-column justify-content-center border-left m-auto">
                                        {[item.NAME].concat(productNames[item.NAME].sort(() => (Math.random() > .5) ? 1 : -1)).map((item,i) => 
                                        <div key={i} className={`prod-name-list ml-3 mt-1 text-${productColors[i]}`}>{item}</div>
                                        )
                                        }
                                </div>

                                </div>
                                <div className="mt-1">
                                {/* <div className="price text-right mr-1 mb-1">S${item.PRICE}</div> */}
                                <div className="CartAddtions">
                                    <button className="btn text-success" onClick={() => productAction({type:"ADD",prodid:item.ID})}>+</button>
                                    <button className="btn text-danger"onClick={() => productAction({type:"REMOVE",prodid:item.ID})}>-</button>
                                </div>
                                {/* <div className="text-white"> */}
                                    {isProductExistsInCart(item.ID).length > 0 &&
                                        <div className="cartValues" style={{backgroundColor:"var(--bsRed)",color:"white"}}>{productCountReducer(item.ID)}</div> }
                                        <div className="innerBasket">
                                            <div className="innerBasket1" style={{color:"var(--amazonChime)"}} >
                                                <RiShoppingBasketLine className="basketSize" style={{transform: isProductExistsInCart(item.ID).length > 0 ? "rotate(0deg) scaleX(1)":null}}/>
                                            </div>
                                        </div>
                                {/* </div> */}
                                </div>
                        </ProdContainer>
                    </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </MainContainer>
    )
}
const MainContainer = styled.div` 
width: 100%;
height:100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
margin-top:7rem;
margin-bottom:7rem;
.priceCartDetails{
    background:whitesmoke;
}
.price{
    position:absolute;
    top:5%;
    left:10%;
    color:var(--bsRed);
}
.heading{
    font-size:3rem;
    font-family: 'Brush Script MT', cursive;
    color:white;
    // background:linear-gradient(to left,orange,orange);
}
.prodName{
    font-weight:bold;
    font-style:italic;
    color:white;
    font-family: 'Open Sans', sans-serif;
    font-size:1rem;
    text-align:center;
}
// removing Container for small screens
@media (max-width: 798px) {
    padding:0;
    margin-top:6rem;
    .heading{
        font-size:2rem;
    }
    .prodName{
        font-size:0.9rem;
    }
}
`
const ProdContainer = styled.div`
font-weight:bold;
border-radius:3rem;
display:flex;
position:relative;
justify-content:center;
overflow:hidden;
width:20rem;
height:20rem;
border:0.5px solid;
margin: 1rem 1rem 1.1rem 1.5rem;
.card-image {
    text-align:left;
    margin-left:1rem;
}
.prod-image{
    height: 10rem;
    width: 8rem;
}
.prod-name-list {
    font-size:1rem;
}
.innerBasket{
    position:absolute;
    bottom:1%;
    right:5%;
    font-size:3.2rem;
}
.basketSize{
    font-size:3rem;
    transition:all 0.5s;
    transform:rotate(180deg) scaleX(-1);
}
.cartValues {
    position:absolute;
    right:6%;
    bottom:16%;
    width:1.4rem;
    height:1.4rem;
    border-radius:50%;
    background:#5bccf6 ;
    color:white; 
    font-size:0.9rem;
    font-weight:bold;
    text-align:center;
    z-index:9;
}
.CartAddtions{
    position:absolute;
    bottom:1%;
    left:10%;
    font-size:4rem;
}
.btn{
    border-radius:1rem;
    font-size:1.8rem;
    width:3rem;
    font-weight:bold;
    margin:0 1rem 0 0;
    padding:0.25rem;
    :focus{
        box-shadow: none;
    }
}
.about{
    position:absolute;
    top:6%;
    right:5%;
    font-size:2rem;
    color:var(--amzonChime);
}
transition:0.7s all;
:hover{
    padding-bottom:2rem;
}
@media (max-width: 798px ) and (max-width: 820px ) {
    width:14rem;
    height:12rem;
    border-radius:2rem;
    .prod-image{
        height: 5rem;
        width: 4rem;
    }
    .prod-name-list {
        font-size:0.8rem;
    }
    .innerBasket{
        bottom:0;
        right:5%;
        font-size:2.3rem;
    }
    .basketSize{
        font-size:2rem;
    }
    .CartAddtions{
        bottom:0;
        left:8%;
        font-size:2rem;
    }
    .cartValues{
        bottom:11.5%;
        right:4%;
        width:1.1rem;
        height:1.1rem;
        font-size:0.7rem;
   }
  .btn{
    border-radius:1rem;
    font-size:1.5rem;
    width:2.5rem;
    font-weight:bold;
    margin:0 0 0.1rem 0;
   }
// @media (max-width: 390px) {
//     width:10rem;
//     height:9rem;
//     border-radius:2rem;
//     margin: 0.5rem 0.5rem 1rem 1.2rem;
//     .prod-image{
//         height: 4rem;
//         width: 4rem;
//     }
//     .price{
//         font-size:0.7rem;
//     }
//     .btn{
//         margin:2.5rem 0.5rem 0 0;
//         font-size:1rem;
//         width:1.5rem;
//         padding:0;
//         border-radius:0.5rem;
//         :focus{
//             border-shadow:none;
//         }
//     }
//     .CartAddtions{
//         bottom:0;
//         left:12%;
//         font-size:4rem;
//     }
//     .innerBasket{
//         bottom:6%;
//         right:5%;
//     }
//     .basketSize{
//         font-size:1.5rem;
//     }
//     .cartValues{
//         bottom:18%;
//         width:0.9rem;
//         height:0.9rem;
//         font-size:0.6rem;
//     }
//     .about{
//         font-size:1.7rem;
//     }
//   }
`