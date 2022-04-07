import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import mango from '../images/mango.svg'

export default function NotFound() {
    const history = useHistory();
    return (
        
            <NotfoundHome className="d-flex flex-column align-items-center justify-content-center container">
                <img className="navImage mx-2" src={mango} alt="Logo" /> 
                <h1 className="text-white">Oops....</h1> 
                <h1 className="text-danger">Page Not Found</h1> 

            <div className="d-flex">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>

            </NotfoundHome>

    )
}

const NotfoundHome = styled.div`
height:100vh;
width:100%;
font-family: 'Open Sans', sans-serif;
font-style:italic;
.navImage{
    height: 6rem;
    width:  6rem;
}
`
