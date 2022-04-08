import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { GetApiData } from './ApiCalls';
import {accountsContext} from '../contexts/accountsContext'
import * as fiIcons from 'react-icons/fi'

export default function SignIn() {
    const history = useHistory();
    const [accountInfo,accountAction] = useContext(accountsContext);

    const [formFields,setFormFields] = useState([{name:"Email",type:"text",value:"",required:"Y"},
                                                 {name:"Password",type:"text",value:"",required:"Y"}]);

const funOnChange = (e) =>
{
    const tempformAttributes = [...formFields];
    const attr= [e.target.name];
    const attrName = attr[0];
    const idx = tempformAttributes.findIndex( a => a.name === attrName);
    tempformAttributes[idx] = {...tempformAttributes[idx],value: e.target.value,errors:""};
    setFormFields([...tempformAttributes]);
    }

    const handleSignout = () => {
        accountAction({type:"SIGNOUT",value:accountInfo.name});
        history.push("/");
    }

    const submitSignInForm = (e) => {
        e.preventDefault();
        var tempFormFields = [...formFields];
        tempFormFields.forEach  ( a => {
            const idx = formFields.findIndex( b => a.name === b.name);
            tempFormFields[idx] = {...tempFormFields[idx],errors:tempFormFields[idx].required === "Y" && !tempFormFields[idx].value ? `${tempFormFields[idx].name} is Required` :"" }
        })

        setFormFields([...tempFormFields]);

        const username = formFields[formFields.findIndex( a => a.name === "Email")].value;
        const password = formFields[formFields.findIndex( a => a.name === "Password")].value;
        const sql = `select case when password = '${password}' then 1 else 0 end sqlResult,firstname,lastname,email,type from users where email='${username}'`;

        if ( formFields.filter ( a => a.errors !== "").length !== 0 ) {
            accountAction({type:"FAILED",value:accountInfo.name});
        }

        if ( formFields.filter ( a => a.errors !== "").length === 0 ) {

        GetApiData(sql)
        .then((res) => {
            // console.log(res)
            if (res[0] === "ERROR"){
                // alert("Couldn't do the user athentication. Please try again after sometime");  
                // toast.error("Login failed")  
                accountAction({type:"ERROR"});
            }
            else if ( res.length === 0 )  {
            accountAction({type:"USER_MISSING",value:accountInfo.name});
            history.push("/signup") 
            }
            else {
                if ( res[0].SQLRESULT === 1 ) {
                     accountAction({type:"SIGNIN",value:{firstname:res[0].FIRSTNAME,lastname:res[0].LASTNAME,email:res[0].EMAIL,type:res[0].TYPE,isLoggedIn:true}})
            // toast.success("Loggin Successful");
                    history.push("/") 
                }
                else {
                    accountAction({type:"MISMATCH",value:accountInfo.name});
                }
            }
        }
        )
        .catch ( (e) => {
            accountAction({type:"OTHER",mess:e});
        }
        )
        // This case is already handled in error check. If fields are null then it doesnt reach this point
        // else 
        // {
        //     alert("username/password are madatory")
        // }
        }
        }
    return (
        <SigninContainer className="container">
            {!accountInfo.isLoggedIn ?
            <div>
                <div className="d-flex">
                    <Link to="/login" className="login">Login</Link>
                </div>
                
                <form onSubmit={submitSignInForm}>
                    
                    <div className="d-flex justify-content-center">
                        
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
                    </div>

                    <div className="text-right mb-3 text-danger font-weight-bold small" >Forgot password?</div>
                    <div className="d-flex flex-column justify-content-center">
                        <button className="btn btn-signin btn-inline-block m-auto" type="submit">Signin</button>
                        <div className="text-center mt-4 mb-0 text-secondary font-weight-bold small" >Don't have an account yet?</div>
                        <Link className="m-auto pt-2" to="/signup"><div className="text-center btn btn-danger btn-inline-block" type="submit">SignUp</div></Link>
                    </div>
                </form>
            </div>
            :
            <div>
                  
                        <p className="text-center font-weight-bold text-danger">{`${accountInfo.firstname} ${accountInfo.lastname}`} 
                        {accountInfo.type === "admin" &&
                            <Link to="/admin" className="settings"><fiIcons.FiSettings className="settings-icon"/></Link>
                        }
                    </p>
                    
                    <div className="d-flex justify-content-center mb-4">
                        <div className="btn btn-signout text-weight font-weight-bold" onClick={handleSignout}> Signout </div>
                    </div>
                <div className="d-flex justify-content-center">

                    <Link to="/address" className="btn" style={{background:"var(--amzonChime)"}}> Address </Link>
                    <Link to="/orders" className="btn" style={{background:"var(--amzonChime)"}}> My Orders </Link>
                    {/* <Link to="/feedback" className="btn btn-info"> Feedback </Link> */}

                </div>
            </div>
            }
        </SigninContainer>
    )
}


const SigninContainer= styled.div`
width:30rem;
background-color:white;
border-radius:5%;
font-style:italic;
margin-top:6rem;
padding:2rem;
.settings{
    font-size:2rem;
    margin-left:2rem;
}
.settings-icon{
    color:var(--amzonChime);
    font-weight:bold;
}
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
@media (max-width:798px){
    width:20rem;
    .form-control{
        width:15rem;
    } 
}
`