import React,{useState,useEffect} from 'react'
// import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import DisplayTableData from './DisplayTableData'
import * as GiIcons from 'react-icons/gi'


export function ListProducts() {

    const query = "select * from products";

    const [orderDetails,setOrderDetails]= useState([]);
    useEffect(() => {
        axios.get(`http://localhost:7000/dailycart/getSqlresult/${query}`)
        .then((result) => {
            let {data} = result;
            let {rows} = data;
            // console.log("rows",rows);
            setOrderDetails(rows);
                // console.log("meteData values",Object.values(data.metaData));
                         })
        .catch((e) => {
                       alert( `Couldn't get Orders\n ` + e);
                        })
    }, [])
    return (
        <div className="container">
            <ProdHeader className="text-center">
                <GiIcons.GiPlantWatering className="mr-4 mb-2"/>
                PRODUCTS
                <GiIcons.GiPlantWatering className="ml-4 mb-2"/>
                </ProdHeader>
            <DisplayTableData state={orderDetails}/>
        </div>
    )
}

const ProdHeader = styled.h1`
background:var(--csBlue);
color:white;
border-radius:0.25rem;
box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,0.3);
`