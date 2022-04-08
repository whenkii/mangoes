import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'

export default function SignIn() {
    const history = useHistory();
    return(
            <SigninContainer className="container" >
                <div className="d-flex justify-content-center">
                    <Link to="/addProduct" className="btn" style={{background:"var(--amzonChime)"}}> Add Product </Link>
                    <Link to="/orders" className="btn btn-dark">Show Products </Link>
                </div>

                <div className="d-flex justify-content-center">
                     <div className="btn btn-sized-md back-btn" onClick={() => history.goBack()}>BACK</div>
               </div>

            </SigninContainer>
    )
}


const SigninContainer= styled.div`
width:30rem;
background-color:white;
border-radius:1rem;
font-style:italic;
margin-top:6rem;
padding:2rem;
.btn  {width:10rem;}
.form-group {
    text-align:center;
}
.login{
    font-family: 'Brush Script MT', cursive;
    font-size:2rem;
    color: var(--amzonChime);
    font-weight:bold;
    border-bottom: 3px solid var(--bsDark); 
    margin:auto;
    margin-bottom:2rem;
}
.label{
    color: var(--amxonChine); 
    font-weight:bold;
}
.form-control{
    margin:auto;
    border:none;
    border-bottom:1px solid;
    border-radius:0;
    text-align:center;
    margin:auto;
}
.btn{
   color:white;
    margin: 1px;
}
.btn-signin{
    background:var(--amzonChime);
 }
.btn-signout {
    background:var(--bsRed);
}
.back-btn{
    background:var(--bsYellow);
    color:black;
    text-align:center;
    margin-right:2rem;
    margin-top:2rem;
}
@media (max-width:798px){
    width:20rem;
    .form-control{
        width:15rem;
    } 
}
`