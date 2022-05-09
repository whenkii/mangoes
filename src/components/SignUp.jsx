import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'
// import mango from '../images/mango.svg'
import axios from 'axios'
// import {config} from './reactConfig'
// import { GetApiData } from './ApiCalls';
// import {AllSpinners} from './Spinners'
import { ToastContainer, toast } from 'react-toastify';
import {config} from '../components/reactConfig'

export default function SignUp() {

    const history = useHistory();
    // const  [submitForm,setSubmitForm] = useState(false);

    const [formFields,setFormFields] = useState([{name:"FirstName",type:"text",value:"",required:"Y"},
                                                 {name:"LastName",type:"text",value:"",required:"Y"},
                                                 {name:"Email",type:"text",value:"",required:"Y"},
                                                 {name:"Mobile",type:"text",value:"",required:"Y"},
                                                 {name:"Password",type:"password",value:"",required:"Y"},
                                                 {name:"Confirm Password",type:"password",value:"",required:"Y"}
                                                ]);

    const funOnChange = (e) =>
{
    const tempformAttributes = [...formFields];
    const attr= [e.target.name];
    const attrName = attr[0];
    const idx = tempformAttributes.findIndex( a => a.name === attrName);
    tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
    setFormFields([...tempformAttributes]);
    }

    const submitSignUpForm = (e) => {
        e.preventDefault();
        var tempFormFields = [...formFields];
        tempFormFields.forEach  ( a => {
            const idx = formFields.findIndex( b => a.name === b.name);
            tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
        })

        setFormFields([...tempFormFields]);

    if (formFields.filter ( a => a.errors !== "").length === 0 )
    {

        const firstname = formFields[formFields.findIndex( a => a.name === "FirstName")].value;
        const lastname  = formFields[formFields.findIndex( a => a.name === "LastName")].value;
        const email  = formFields[formFields.findIndex( a => a.name === "Email")].value;
        const mobile  = formFields[formFields.findIndex( a => a.name === "Mobile")].value;
        const password  = formFields[formFields.findIndex( a => a.name === "Password")].value;

       const newState = [{p_in:{FIRSTNAME:firstname,LASTNAME:lastname,EMAIL:email,MOBILE:mobile,PASSWORD:password}}]
       const finalState = { scriptName:"PKG_ACCOUNTS.CREATE_ACCOUNT",recName : "PKG_ACCOUNTS.ACCOUNT_REC",binds:newState}

       axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/execProcDynamic`,finalState)
    //    axios.post(`${config.restAPIserver}:${config.restAPIHost}/api/createAccount`,{fileName:"SignUP form",
    //                vars:{p_firstname:firstname,p_lastname:lastname,p_email:email,p_password:password}})
            .then (({data}) => {
                // console.log(data)
                
                if ( data === "OK" ) {
                    // alert("Account created successfully");
                    toast.success("Account created successfully")  
                    // history.push("/");
                }
                else  {
                    if ( data === "User already exists") {
                        // alert(data + ". SignIn");
                        toast.warning(data + ". SignIn")  
                        history.push("/account");
                    }
                    else {
                    alert(data);
                    }
                }
            })
            .catch((e) => {
            console.log("SQL in GetApiData"+e);
            alert("Couldn't get data from Database")
            // if error, return 0 rows
            return [];
            });
        }

    }
            
            return (
                <SigninContainer className="container">
                    <ToastContainer />
                    <div className="d-flex">
                        <Link to="/account" className="login">Signup</Link>
                        {/* <Link to="/Signup" className="m-auto text-dark font-weight-bold">SIGNUP</Link> */}
                    </div>
                    <form onSubmit={submitSignUpForm}>    
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
    
                        <div className="d-flex flex-column justify-content-center mb-3">
                            <button className="btn btn-warning btn-inline-block m-auto" type="submit" >SignUp</button>
                        </div>
                    <Link className="m-auto pt-2" to="/account"><div className="text-center mt-2 mb-0 text-success font-weight-bold small" >Already have an account?</div></Link>
                    </form>
                </SigninContainer>
            )
        }
        
        
const SigninContainer= styled.div`
width:30rem;
background-color:white;
border-radius:1rem;
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
    padding:0 1rem 0 1rem;
    border-radius:1rem; 
    margin:auto;
    margin-bottom:2rem;
}
.label{
    color: var(--amxonChine); 
    font-weight:bold;
}
@media (max-width:798px){
    width:21rem;
    .form-control{
        width:11rem;
    } 
}
`