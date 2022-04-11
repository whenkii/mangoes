import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'
// import mango from '../images/mango.svg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {accountsContext} from '../contexts/accountsContext'
import {config} from '../components/reactConfig'
import * as fasIcons from 'react-icons/fa'

export default function Addproducts() {

    const history = useHistory();
    const [accountInfo] = useContext(accountsContext);
    const [formFields,setFormFields] = useState([{name:"name",type:"text",placeholder:"Name of Product",value:"",required:"Y"},
                                                {name:"units",type:"text",placeholder:"Ex: 3-3.2 kg",value:"",required:"Y"},
                                                {name:"price",type:"text",placeholder:"$39",value:"",required:"Y"},
                                                {name:"offerprice",type:"text",placeholder:"Ex: $36",value:"",required:"Y"},
                                                {name:"instock",type:"text",placeholder:"Y/N",value:"",required:"Y"}]);


    const funOnChange = (e) =>
{
    const tempformAttributes = [...formFields];
    const attr= [e.target.name];
    const attrName = attr[0];
    const idx = tempformAttributes.findIndex( a => a.name === attrName);
    tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
        setFormFields([...tempformAttributes]);
    }

    const submitForm = (e) => {
        e.preventDefault();
        var tempFormFields = [...formFields];
        tempFormFields.forEach  ( a => {
            const idx = formFields.findIndex( b => a.name === b.name);
            tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
        })

        setFormFields([...tempFormFields]);
        console.log(tempFormFields[tempFormFields.findIndex( a => a.name === "name")].value)
        const name = tempFormFields[tempFormFields.findIndex( a => a.name === "name")].value;
        const units  = tempFormFields[tempFormFields.findIndex( a => a.name === "units")].value;
        const price  = tempFormFields[tempFormFields.findIndex( a => a.name === "price")].value;
        const offerprice  = tempFormFields[tempFormFields.findIndex( a => a.name === "offerprice")].value;
        const instock  = tempFormFields[tempFormFields.findIndex( a => a.name === "instock")].value;

    if (tempFormFields.filter ( a => a.errors !== "").length === 0 )
    {
        
       axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/addproduct`,
            {fileName:"addproduct",vars:{p_name:name,p_units:units,p_price:price,p_offerprice:offerprice,p_inStock:instock}})
            .then (({data}) => {
                // console.log(data)
                
                if ( data === "OK" ) {
                    // alert("Account created successfully");
                    toast.success("Product added successfully");
                    history.push("/account");
                }
                else  {
                    // alert(data);
                    toast.warning(data);
                }
            })
            .catch((e) => {
            toast.error("Couldn't do the DB action");
            // if error, return 0 rows
            return [];
            });
        }

    }
            
            return (
               
                <>
                 {accountInfo.isLoggedIn &&
                <SigninContainer className="container">
              
                    <ToastContainer />     
                    <div className="d-flex">
                        <Link to="/account" className="login">ADD PRODUCT</Link>
                        {/* <Link to="/Signup" className="m-auto text-dark font-weight-bold">SIGNUP</Link> */}
                    </div>
                    <form onSubmit={submitForm}>    
                        <div className="d-flex flex-column" >
                            {formFields.map ((item,i) =>
                                <div className="form-group" key={i}>
                                    <label className="label" htmlFor={item.name}>{item.name}</label>
                                    <input type={item.type} className="form-control" name={item.name}  placeholder={item.name} value={item.value} onChange={funOnChange}/>
                                    {item.errors &&
                                    <small className="text-danger">{item.errors}</small>
                                    }
                                </div>
                            )}
                        </div>
    
                        <div className="d-flex justify-content-center mb-3">
                            <button className="btn btn-sm back-btn" type="submit" >ADD</button>
                            <div className="btn btn-sm back-btn" onClick={() => history.goBack()}>BACK <fasIcons.FaBackward className="icons" /> </div> 
                        </div>
                    </form>
                </SigninContainer>
            }
             </> 
            )
        }
        
        
const SigninContainer= styled.div`
width:30rem;
background-color:white;
border-radius:5%;
padding:2rem;
font-style:italic;
margin-top:6rem;
margin-bottom:10rem;
.navImage{
    height: 4rem;
    width:  4rem;
}
.btn  {width:10rem;}
.form-group {
    text-align:center;
}
.form-control{
    border:none;
    border-bottom:1px solid;
    border-radius:0;
    text-align:center;
    margin:auto;
}
.login{
    font-size:2rem;
    font-family: 'Brush Script MT', cursive;
    color: var(--amzonChime);
    // font-weight:bold;
    border-bottom: 3px solid var(--amzonChime); 
    margin:auto;
    margin-bottom:2rem;
}
.label{
    color: var(--amxonChine); 
    font-weight:bold;
}
.btn{
    margin:0 0 1rem 0;
    // width:5rem;
}
.back-btn{
    background:var(--bsYellow);
    color:black;
    text-align:center;
    margin-right:1rem;
}
.icons{
    font-size:1.5rem;
    margin-left:1rem;
}
@media (max-width:798px){
    width:21rem;
    .form-control{
        width:11rem;
    } 
}
`