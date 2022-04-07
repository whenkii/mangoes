import React,{useState,useContext} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
// import praveenimg from '../images/Praveen.jpeg'
import {userContext} from '../contexts/user'
import * as fasIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
// import { FaIcons } from '@fortawesome/free-solid-svg-icons'

export default function NavSideBar() {
    const loggedIn = useContext(userContext);
    const [showSideBar,setshowSideBar] = useState (false);
    return (
        <div>
        <MainNavBar>
                <div className="row">
                    <Link to="#" className="faBar text-white col-1 pt-4 text-center">
                                <fasIcons.FaBars className="faBar text-white" onClick={() => setshowSideBar(!showSideBar)}/>
                    </Link> 
                </div>
        </MainNavBar>    
        <Sidebar props={showSideBar}>
            <h1 className="NavHeader shadow"> 
            </h1>
                <div className="d-flex flex-column justify-content-center">
                    <Links to="/"> <fasIcons.FaHome className="icons"/>HOME</Links>
                    <Links to="/products"><GiIcons.GiPlantWatering className="icons"/>PRODUCTS</Links>
                    <Links to="/orders"><fasIcons.FaRupeeSign className="icons"/>ORDERS</Links>
                    <Links to="/contactus"><fasIcons.FaPhone className="icons"/>CONTACTUS</Links>
                    <Links to="/admin"><fasIcons.FaUser className="icons"/> {loggedIn ? "My Account" : "Login"}</Links>
                    <Links to="/graphs"><fasIcons.FaChartPie className="icons"/>Graphs</Links>
                </div>
        </Sidebar>
        </div>
    )
}

const MainNavBar = styled.div`
background:var(--csBlue);
height:130px;
width:100vw;
position:fixed;
.faBar {
    font-size:160%;
}
`

const Sidebar = styled.div `
background:var(--csBlue);
height:100vh;
width:200px;
position:fixed;
top:130px;
left : ${ ({props}) => props ? "0":"-100%"};
font-weight:bold;
`


const Links = styled(Link)`
text-align:left !important;
width:10rem;
margin:1rem;
padding:0.2rem;
color:white;
text-align:center;
border-radius:0.5rem;
text-decoration:none !important;
transition:0.3s;
.icons {
    margin : 0.25rem 1rem 0.65rem 0.5rem !important;
    font-size:120% !important;
}
:hover{
    background:white;
    color:var(--csBlue);
}
:focus{
    background:white;
    color:var(--csBlue);
}
`

// const Brandimg = styled.img`
// width:100%;
// height:8rem;
// border:none;
// `
